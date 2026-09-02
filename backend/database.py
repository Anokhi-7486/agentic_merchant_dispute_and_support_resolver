from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/emotion_echo")

Base = declarative_base()

class EmotionRecord(Base):
    __tablename__ = "emotion_records"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    emotion_label = Column(String)
    confidence = Column(Float)
    metadata_json = Column(JSON) # Store blendshapes, keystroke rhythm, etc.

# Setup engine and session
# In a real app, use async engine if using FastAPI async
from sqlalchemy import create_engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
