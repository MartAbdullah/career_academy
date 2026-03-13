from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models import User, Course
from routers import auth_router, courses_router
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create tables using Alembic or SQLAlchemy
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Career Academy API",
    description="A comprehensive online education platform",
    version="1.0.0"
)

# --- CORS Configuration (Critical for JWT in cookies) ---
frontend_urls = os.getenv("FRONTEND_URLS", "http://localhost:5173,http://localhost:5174").split(",")
origins = [url.strip() for url in frontend_urls]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Required for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include Routers ---
app.include_router(auth_router)
app.include_router(courses_router)

# --- Root Endpoint ---
@app.get("/")
def read_root():
    return {
        "message": "Welcome to Career Academy API",
        "version": "1.0.0",
        "docs": "/docs"
    }
