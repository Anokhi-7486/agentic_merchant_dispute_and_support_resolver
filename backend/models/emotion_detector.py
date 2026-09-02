import os
import time
import urllib.request
import logging
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_PATH = "face_landmarker.task"
MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"

def download_model_if_missing():
    """Downloads the MediaPipe Face Landmarker model if not present locally."""
    if not os.path.exists(MODEL_PATH):
        logger.info(f"Downloading {MODEL_PATH} from {MODEL_URL}...")
        try:
            # Simple progress log
            def progress(block_num, block_size, total_size):
                if total_size > 0:
                    percent = int(block_num * block_size * 100 / total_size)
                    if percent % 25 == 0:
                        logger.info(f"Downloading model: {percent}%")
            
            urllib.request.urlretrieve(MODEL_URL, MODEL_PATH, reporthook=progress)
            logger.info("Model download completed successfully.")
        except Exception as e:
            logger.error(f"Failed to download model file: {e}")

# Try importing MediaPipe vision tasks
try:
    import mediapipe as mp
    from mediapipe.tasks import python
    from mediapipe.tasks.python import vision
    MEDIAPIPE_AVAILABLE = True
except ImportError:
    logger.warning("MediaPipe not installed. EmotionDetector will run in Mock Mode.")
    MEDIAPIPE_AVAILABLE = False

class EmotionDetector:
    def __init__(self):
        self.mock_mode = True
        self.detector = None
        self.last_process_time = 0
        self.throttle_interval = 0.5  # Process at max 2 FPS (500ms throttle)

        if not MEDIAPIPE_AVAILABLE:
            logger.info("Running in Mock Mode due to missing mediapipe package.")
            return

        try:
            download_model_if_missing()
            if os.path.exists(MODEL_PATH):
                self.base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
                self.options = vision.FaceLandmarkerOptions(
                    base_options=self.base_options,
                    output_face_blendshapes=True,
                    output_facial_transformation_matrixes=True,
                    num_faces=1
                )
                self.detector = vision.FaceLandmarker.create_from_options(self.options)
                self.mock_mode = False
                logger.info("MediaPipe FaceLandmarker successfully initialized.")
            else:
                logger.warning("Model file missing after check. Running in Mock Mode.")
        except Exception as e:
            logger.error(f"Failed to initialize MediaPipe FaceLandmarker: {e}. Falling back to Mock Mode.")
            self.mock_mode = True

    def map_blendshapes_to_emotion(self, blendshapes):
        """Maps 52 MediaPipe face blendshapes to basic emotions using simple heuristics."""
        smile = (blendshapes.get("mouthSmileLeft", 0) + blendshapes.get("mouthSmileRight", 0)) / 2
        frown = (blendshapes.get("mouthFrownLeft", 0) + blendshapes.get("mouthFrownRight", 0)) / 2
        brow_down = (blendshapes.get("browDownLeft", 0) + blendshapes.get("browDownRight", 0)) / 2
        brow_up = blendshapes.get("browInnerUp", 0)
        eye_wide = (blendshapes.get("eyeWideLeft", 0) + blendshapes.get("eyeWideRight", 0)) / 2
        jaw_open = blendshapes.get("jawOpen", 0)

        scores = {
            "joy": smile,
            "sadness": frown * 0.7 + brow_up * 0.3,
            "anger": brow_down * 0.8 + (1.0 - smile) * 0.2,
            "fear": eye_wide * 0.6 + jaw_open * 0.4,
        }

        dominant_emotion = "neutral"
        max_score = 0.35  # Threshold to trigger emotion

        for emotion, score in scores.items():
            if score > max_score:
                max_score = score
                dominant_emotion = emotion

        return dominant_emotion, float(max_score)

    def analyze_frame(self, image_data):
        """Analyzes a frame of image data (numpy array) to detect face blendshapes and emotions."""
        current_time = time.time()
        if current_time - self.last_process_time < self.throttle_interval:
            return None  # Throttled

        self.last_process_time = current_time

        if self.mock_mode or self.detector is None:
            # Fallback/Mock Mode simulation
            emotions = ["neutral", "joy", "sadness", "anger", "fear"]
            mock_emotion = np.random.choice(emotions, p=[0.6, 0.1, 0.1, 0.1, 0.1])
            return {
                "emotion": mock_emotion,
                "confidence": 0.75,
                "is_mock": True,
                "timestamp": current_time
            }

        try:
            # Convert frame image_data to MediaPipe Image format
            # Assumes image_data is a 3-channel RGB numpy array (uint8)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_data)
            detection_result = self.detector.detect(mp_image)

            if not detection_result.face_blendshapes:
                return {"emotion": "neutral", "confidence": 0.5, "timestamp": current_time}

            blendshapes = {b.category_name: b.score for b in detection_result.face_blendshapes[0]}
            emotion, confidence = self.map_blendshapes_to_emotion(blendshapes)

            return {
                "emotion": emotion,
                "confidence": confidence,
                "blendshapes": blendshapes,
                "timestamp": current_time
            }
        except Exception as e:
            logger.error(f"Error during MediaPipe inference: {e}")
            return {"emotion": "neutral", "confidence": 0.5, "error": str(e), "timestamp": current_time}

# Singleton instance
_detector_instance = None

def get_detector():
    global _detector_instance
    if _detector_instance is None:
        _detector_instance = EmotionDetector()
    return _detector_instance
