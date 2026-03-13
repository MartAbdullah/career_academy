from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    instructor: Optional[str] = None
    price: float = 0.0


class CourseCreate(CourseBase):
    pass


class CourseOut(CourseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    instructor: Optional[str] = None
    price: Optional[float] = None
