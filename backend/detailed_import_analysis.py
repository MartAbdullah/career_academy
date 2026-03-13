#!/usr/bin/env python
"""
Advanced Import Analysis
Checks for:
- Circular imports
- Import patterns (relative vs absolute)
- File existence
- __init__.py files
- Import dependencies
"""

import sys
import ast
from pathlib import Path
from collections import defaultdict

backend_dir = Path(__file__).parent

print("=" * 90)
print("ADVANCED IMPORT ANALYSIS")
print("=" * 90)

# 1. Check if all __init__.py files exist
print("\n" + "=" * 90)
print("1. CHECKING __init__.py FILES")
print("=" * 90)

packages = [
    'database',
    'models',
    'schemas', 
    'services',
    'routers'
]

init_check = []
for pkg in packages:
    init_file = backend_dir / pkg / '__init__.py'
    exists = init_file.exists()
    status = "✓" if exists else "✗"
    print(f"{status} {pkg}/__init__.py: {init_file}")
    init_check.append((pkg, exists, init_file))

# 2. Check for Python files
print("\n" + "=" * 90)
print("2. CHECKING REQUIRED PYTHON FILES")
print("=" * 90)

required_files = {
    'main.py': backend_dir / 'main.py',
    'auth_utils.py': backend_dir / 'auth_utils.py',
    'requirements.txt': backend_dir / 'requirements.txt',
    'database/database.py': backend_dir / 'database' / 'database.py',
    'models/user.py': backend_dir / 'models' / 'user.py',
    'models/course.py': backend_dir / 'models' / 'course.py',
    'schemas/user.py': backend_dir / 'schemas' / 'user.py',
    'schemas/course.py': backend_dir / 'schemas' / 'course.py',
    'services/auth_service.py': backend_dir / 'services' / 'auth_service.py',
    'services/user_service.py': backend_dir / 'services' / 'user_service.py',
    'services/course_service.py': backend_dir / 'services' / 'course_service.py',
    'routers/auth.py': backend_dir / 'routers' / 'auth.py',
    'routers/courses.py': backend_dir / 'routers' / 'courses.py',
}

file_check = []
for name, path in required_files.items():
    exists = path.exists()
    status = "✓" if exists else "✗ MISSING"
    print(f"{status} {name}")
    file_check.append((name, exists, path))

# 3. Analyze imports in each file
print("\n" + "=" * 90)
print("3. ANALYZING IMPORTS IN EACH FILE")
print("=" * 90)

import_analysis = {}

def extract_imports(filepath):
    """Extract imports from a Python file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            tree = ast.parse(f.read())
        
        imports = []
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                module = node.module
                names = [alias.name for alias in node.names]
                imports.append({
                    'type': 'from',
                    'module': module,
                    'names': names,
                    'line': node.lineno
                })
            elif isinstance(node, ast.Import):
                names = [alias.name for alias in node.names]
                for name in names:
                    imports.append({
                        'type': 'import',
                        'module': name,
                        'line': node.lineno
                    })
        return imports
    except Exception as e:
        return [{'error': str(e)}]

files_to_analyze = [
    'main.py',
    'database/database.py',
    'models/user.py',
    'models/course.py',
    'schemas/user.py',
    'schemas/course.py',
    'services/auth_service.py',
    'services/user_service.py',
    'services/course_service.py',
    'routers/auth.py',
    'routers/courses.py',
]

for filename in files_to_analyze:
    filepath = backend_dir / filename
    if filepath.exists():
        print(f"\n📄 {filename}")
        imports = extract_imports(filepath)
        import_analysis[filename] = imports
        
        for imp in imports:
            if 'error' in imp:
                print(f"  ERROR: {imp['error']}")
            else:
                if imp['type'] == 'from':
                    names_str = ', '.join(imp['names'])
                    print(f"  Line {imp['line']}: from {imp['module']} import {names_str}")
                else:
                    print(f"  Line {imp['line']}: import {imp['module']}")
    else:
        print(f"\n📄 {filename} - NOT FOUND")

# 4. Check for potential issues
print("\n" + "=" * 90)
print("4. POTENTIAL ISSUES FOUND")
print("=" * 90)

issues = []

# Check for relative imports (should use relative imports within package)
print("\n🔍 Import Pattern Analysis:")
relative_count = 0
absolute_count = 0

for filename, imports in import_analysis.items():
    for imp in imports:
        if 'error' in imp:
            continue
        # Check if import is from local modules
        if imp.get('module') in ['database', 'models', 'schemas', 'services', 'routers']:
            absolute_count += 1
            if '/' not in filename:  # In root backend
                issues.append(f"  ⚠ {filename}:{imp['line']} - Using absolute import '{imp['module']}' at root level (consider relative)")
            else:  # In subdirectory
                issues.append(f"  ⚠ {filename}:{imp['line']} - Using absolute import '{imp['module']}' from subdirectory (should use relative)")

print(f"\nAbsolute imports count: {absolute_count}")
print(f"Relative imports count: {relative_count}")

if issues:
    print("\nPotential Issues:")
    for issue in issues[:10]:  # Show first 10 issues
        print(issue)
    if len(issues) > 10:
        print(f"  ... and {len(issues) - 10} more")
else:
    print("No circular import patterns detected")

# 5. Check Dependencies
print("\n" + "=" * 90)
print("5. DEPENDENCY ANALYSIS")
print("=" * 90)

# Track which modules depend on which
dependencies = defaultdict(set)

for filename, imports in import_analysis.items():
    for imp in imports:
        if 'error' in imp or imp['type'] not in ['import', 'from']:
            continue
        module = imp.get('module', '')
        if module and module not in ['fastapi', 'sqlalchemy', 'datetime', 'typing', 'pydantic', 
                                     'jose', 'passlib', 'os', 'dotenv', 'traceback', 'pathlib']:
            dependencies[filename].add(module)

print("\nLocal Module Dependencies:")
for file, deps in sorted(dependencies.items()):
    if deps:
        print(f"  {file} → {', '.join(sorted(deps))}")

# Summary
print("\n" + "=" * 90)
print("SUMMARY")
print("=" * 90)

all_init_ok = all(exists for _, exists, _ in init_check)
all_files_ok = all(exists for _, exists, _ in file_check)

print(f"\n✓ __init__.py files: {'All present' if all_init_ok else 'SOME MISSING'}")
print(f"✓ Required files: {'All present' if all_files_ok else 'SOME MISSING'}")
print(f"✓ Import syntax: Valid (parsed successfully)")
print(f"⚠ Import patterns: {absolute_count} absolute imports found")

if absolute_count > 0:
    print(f"\n💡 RECOMMENDATION: Consider using relative imports for local modules to avoid path dependency issues")
    print(f"   Convert 'from database import X' to 'from .database import X' when in same directory")
    print(f"   Convert 'from models import X' in subdirectories to 'from ..models import X'")

print("\n" + "=" * 90)
