from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(2000))
    instructor = Column(String(255))
    price = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    class Config:
        from_attributes = True
