#!/usr/bin/env python3
"""
Initialize SQLite database with tables and test data
Run this once: python init_db.py
"""

from database import engine, Base, SessionLocal
from models import User, Course
from services.user_service import UserService
from schemas import UserCreate
import os

# Create all tables
print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("✓ Tables created")

# Add test user
db = SessionLocal()
try:
    # Check if test user already exists
    existing_user = db.query(User).filter(User.email == "john@mail.com").first()
    
    if not existing_user:
        print("Creating test user...")
        test_user = UserService.create_user(
            db,
            UserCreate(
                email="john@mail.com",
                password="12",
                full_name="John Doe"
            )
        )
        print(f"✓ Test user created: {test_user.email}")
    else:
        print(f"✓ Test user already exists: {existing_user.email}")
    
    # Add sample courses if they don't exist
    courses = [
        {"title": "Python Basics", "description": "Learn Python fundamentals"},
        {"title": "Web Development", "description": "Build modern web applications"},
        {"title": "Data Science", "description": "Master data science with Python"},
    ]
    
    for course_data in courses:
        existing_course = db.query(Course).filter(Course.title == course_data["title"]).first()
        if not existing_course:
            course = Course(**course_data)
            db.add(course)
            print(f"✓ Course added: {course_data['title']}")
    
    db.commit()
    print("\n✓ Database initialization complete!")
    
except Exception as e:
    db.rollback()
    print(f"✗ Error: {e}")
    raise
finally:
    db.close()
