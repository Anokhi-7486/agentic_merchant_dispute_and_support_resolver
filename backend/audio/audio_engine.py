import os

class AudioEngine:
    def __init__(self, sounds_dir="static/sounds"):
        self.sounds_dir = sounds_dir
        self.emotion_map = {
            "joy": "happy_ambient.mp3",
            "sadness": "melancholy_piano.mp3",
            "anger": "tense_synth.mp3",
            "fear": "dark_drone.mp3",
            "neutral": "calm_waves.mp3"
        }

    def get_sound_url(self, emotion):
        filename = self.emotion_map.get(emotion, self.emotion_map["neutral"])
        # In a real app, these would be served via static files
        return f"/static/sounds/{filename}"

    def get_parameters(self, emotion_score):
        """Returns audio parameters like cutoff, pitch, volume to morph the sound."""
        return {
            "volume": min(1.0, 0.5 + emotion_score * 0.5),
            "playbackRate": 1.0 + (emotion_score - 0.5) * 0.2
        }

audio_engine = AudioEngine()
