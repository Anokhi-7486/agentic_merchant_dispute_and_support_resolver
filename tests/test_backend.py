import sys
import os
import pytest
from fastapi.testclient import TestClient

# Add backend directory to system path for imports
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from main import app
from database import Base, engine, get_db

client = TestClient(app)

def test_health_check():
    """Verify that the health check endpoint returns 200 and indicates status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "detector_initialized" in data

def test_analyze_emotion():
    """Verify manual override emotion logging and response formats."""
    payload = {
        "emotion": "joy",
        "confidence": 0.9,
        "metadata": {"test_source": "pytest"}
    }
    response = client.post("/analyze-emotion", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["success", "fallback"]  # handles fallback database scenarios
    assert data["emotion"] == "joy"
    assert "audio_config" in data
    assert "volume" in data["audio_config"]

def test_analyze_frame_invalid():
    """Verify frame analysis handles malformed or invalid image payloads cleanly."""
    payload = {
        "image": "invalid_base64_string_here"
    }
    response = client.post("/analyze-frame", json=payload)
    # The endpoint catches base64 and cv2 errors and returns an error status
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "error"
