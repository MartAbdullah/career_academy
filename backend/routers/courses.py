from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import CourseCreate, CourseOut, CourseUpdate
from services import CourseService

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("", response_model=list[CourseOut])
def get_courses(db: Session = Depends(get_db)):
    courses = CourseService.get_all_courses(db)
    return courses


@router.get("/{course_id}", response_model=CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = CourseService.get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.post("", response_model=CourseOut)
def create_course(course_data: CourseCreate, db: Session = Depends(get_db)):
    course = CourseService.create_course(db, course_data)
    return course


@router.put("/{course_id}", response_model=CourseOut)
def update_course(course_id: int, course_data: CourseUpdate, db: Session = Depends(get_db)):
    course = CourseService.update_course(db, course_id, course_data)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    success = CourseService.delete_course(db, course_id)
    if not success:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": "Course deleted successfully"}


@router.get("/instructor/{instructor}", response_model=list[CourseOut])
def get_courses_by_instructor(instructor: str, db: Session = Depends(get_db)):
    courses = CourseService.get_courses_by_instructor(db, instructor)
    return courses
