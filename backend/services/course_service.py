from sqlalchemy.orm import Session
from models import Course
from schemas import CourseCreate, CourseUpdate


class CourseService:
    @staticmethod
    def create_course(db: Session, course_data: CourseCreate) -> Course:
        db_course = Course(**course_data.dict())
        db.add(db_course)
        db.commit()
        db.refresh(db_course)
        return db_course

    @staticmethod
    def get_course_by_id(db: Session, course_id: int) -> Course:
        return db.query(Course).filter(Course.id == course_id).first()

    @staticmethod
    def get_all_courses(db: Session) -> list:
        return db.query(Course).all()

    @staticmethod
    def update_course(db: Session, course_id: int, course_data: CourseUpdate) -> Course:
        course = CourseService.get_course_by_id(db, course_id)
        if course:
            update_data = course_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(course, field, value)
            db.commit()
            db.refresh(course)
        return course

    @staticmethod
    def delete_course(db: Session, course_id: int) -> bool:
        course = CourseService.get_course_by_id(db, course_id)
        if course:
            db.delete(course)
            db.commit()
            return True
        return False

    @staticmethod
    def get_courses_by_instructor(db: Session, instructor: str) -> list:
        return db.query(Course).filter(Course.instructor == instructor).all()
