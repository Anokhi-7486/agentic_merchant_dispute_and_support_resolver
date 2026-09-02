import time
import base64
import logging
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db, init_db, EmotionRecord
from models.emotion_detector import get_detector
from audio.audio_engine import audio_engine

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="EmotionEcho API", description="Privacy-First Multimodal AI Emotional Digital Twin Backend")

@app.on_event("startup")
def on_startup():
    try:
        init_db()
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}. Running with ephemeral/mock database settings.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmotionPayload(BaseModel):
    emotion: str
    confidence: float
    metadata: dict = {}

class FramePayload(BaseModel):
    image: str  # Base64 encoded JPEG/PNG frame from the frontend webcam

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "detector_initialized": get_detector() is not None
    }

@app.post("/analyze-emotion")
async def analyze_emotion(payload: EmotionPayload, db: Session = Depends(get_db)):
    """Directly sets and logs an emotion state (e.g., from Car Keys simulation)."""
    try:
        record = EmotionRecord(
            emotion_label=payload.emotion,
            confidence=payload.confidence,
            metadata_json=payload.metadata
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        
        audio_params = audio_engine.get_parameters(payload.confidence)
        
        return {
            "status": "success",
            "id": record.id,
            "emotion": record.emotion_label,
            "confidence": record.confidence,
            "audio_config": audio_params
        }
    except Exception as e:
        logger.error(f"Error saving emotion: {e}")
        # Return fallback configuration even if database is offline
        audio_params = audio_engine.get_parameters(payload.confidence)
        return {
            "status": "fallback",
            "emotion": payload.emotion,
            "confidence": payload.confidence,
            "audio_config": audio_params,
            "error": str(e)
        }

@app.post("/analyze-frame")
async def analyze_frame(payload: FramePayload, db: Session = Depends(get_db)):
    """Decodes webcam frames and runs them through MediaPipe vision tasks."""
    detector = get_detector()
    if not detector:
        raise HTTPException(status_code=500, detail="Emotion detector is not available.")

    try:
        # 1. Parse base64 string
        header, encoded = payload.image.split(",", 1) if "," in payload.image else ("", payload.image)
        image_bytes = base64.b64decode(encoded)

        # 2. Convert to numpy array
        # Import cv2 locally to fail gracefully if system libraries are missing
        import cv2
        import numpy as np

        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return {"status": "error", "message": "Failed to decode image data"}

        # 3. Convert BGR to RGB (MediaPipe requirement)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # 4. Analyze frame (throttled internally to 2 FPS)
        result = detector.analyze_frame(img_rgb)

        if result is None:
            return {"status": "throttled"}

        # 5. Log telemetry to database
        try:
            record = EmotionRecord(
                emotion_label=result["emotion"],
                confidence=result["confidence"],
                metadata_json=result.get("blendshapes", {})
            )
            db.add(record)
            db.commit()
        except Exception as db_err:
            logger.error(f"Database logging failed: {db_err}")

        # 6. Generate responsive audio configuration
        audio_params = audio_engine.get_parameters(result["confidence"])

        return {
            "status": "success",
            "emotion": result["emotion"],
            "confidence": result["confidence"],
            "audio_config": audio_params,
            "is_mock": result.get("is_mock", False)
        }

    except Exception as e:
        logger.error(f"Error processing frame: {e}")
        return {"status": "error", "message": str(e)}
