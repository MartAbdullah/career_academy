#!/usr/bin/env python
"""
Import Test Script
Tests all module imports to identify errors and exceptions
"""

import sys
import traceback
from pathlib import Path

# Get the backend directory
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

print("=" * 80)
print("IMPORT ANALYSIS TEST")
print("=" * 80)
print(f"\nBackend Directory: {backend_dir}")
print(f"Python Path: {sys.path[:3]}...\n")

# Test results tracking
results = {
    'success': [],
    'failed': [],
    'warnings': []
}

# Test 1: Database module
print("\n" + "=" * 80)
print("TEST 1: Database Module")
print("=" * 80)
try:
    from database import SessionLocal, Base, get_db, engine
    print("✓ Successfully imported: from database import SessionLocal, Base, get_db, engine")
    results['success'].append("database module")
except Exception as e:
    print(f"✗ FAILED to import database module")
    print(f"  Error: {type(e).__name__}: {e}")
    traceback.print_exc()
    results['failed'].append(("database module", str(e)))

# Test 2: Models
print("\n" + "=" * 80)
print("TEST 2: Models Module")
print("=" * 80)
try:
    from models import User, Course
    print("✓ Successfully imported: from models import User, Course")
    results['success'].append("models module")
except Exception as e:
    print(f"✗ FAILED to import models module")
    print(f"  Error: {type(e).__name__}: {e}")
    traceback.print_exc()
    results['failed'].append(("models module", str(e)))

# Test 3: Schemas
print("\n" + "=" * 80)
print("TEST 3: Schemas Module")
print("=" * 80)
try:
    from schemas import UserCreate, UserOut, LoginRequest, LoginResponse, CourseCreate, CourseOut, CourseUpdate
    print("✓ Successfully imported: from schemas import UserCreate, UserOut, LoginRequest, LoginResponse, CourseCreate, CourseOut, CourseUpdate")
    results['success'].append("schemas module")
except Exception as e:
    print(f"✗ FAILED to import schemas module")
    print(f"  Error: {type(e).__name__}: {e}")
    traceback.print_exc()
    results['failed'].append(("schemas module", str(e)))

# Test 4: Services
print("\n" + "=" * 80)
print("TEST 4: Services Module")
print("=" * 80)
try:
    from services import UserService, AuthService, CourseService
    print("✓ Successfully imported: from services import UserService, AuthService, CourseService")
    results['success'].append("services module")
except Exception as e:
    print(f"✗ FAILED to import services module")
    print(f"  Error: {type(e).__name__}: {e}")
    traceback.print_exc()
    results['failed'].append(("services module", str(e)))

# Test 5: Routers
print("\n" + "=" * 80)
print("TEST 5: Routers Module")
print("=" * 80)
try:
    from routers import auth_router, courses_router
    print("✓ Successfully imported: from routers import auth_router, courses_router")
    results['success'].append("routers module")
except Exception as e:
    print(f"✗ FAILED to import routers module")
    print(f"  Error: {type(e).__name__}: {e}")
    traceback.print_exc()
    results['failed'].append(("routers module", str(e)))

# Test 6: Main app
print("\n" + "=" * 80)
print("TEST 6: Main Application (main.py)")
print("=" * 80)
try:
    # We can't directly import main since it creates the app, but we can test the imports it does
    print("Testing imports used in main.py:")
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from database import engine, Base
    from models import User, Course
    from routers import auth_router, courses_router
    print("✓ All imports in main.py are valid")
    results['success'].append("main.py imports")
except Exception as e:
    print(f"✗ FAILED on main.py imports")
    print(f"  Error: {type(e).__name__}: {e}")
    traceback.print_exc()
    results['failed'].append(("main.py imports", str(e)))

# Summary
print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)
print(f"\nSuccessful Imports: {len(results['success'])}")
for item in results['success']:
    print(f"  ✓ {item}")

if results['failed']:
    print(f"\nFailed Imports: {len(results['failed'])}")
    for item, error in results['failed']:
        print(f"  ✗ {item}")
        print(f"     {error}")
else:
    print(f"\n✓ All imports successful! No errors found.")

if results['warnings']:
    print(f"\nWarnings: {len(results['warnings'])}")
    for item in results['warnings']:
        print(f"  ⚠ {item}")

print("\n" + "=" * 80)
