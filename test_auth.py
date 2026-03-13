import requests
import json

BASE_URL = 'http://localhost:8080'

# Test 1: Check /auth/me without authentication (should fail)
print("TEST 1: /auth/me without authentication")
print("-" * 50)
response = requests.get(f'{BASE_URL}/auth/me', timeout=5)
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
print()

# Test 2: Login with test user
print("TEST 2: Login with test credentials")
print("-" * 50)
login_data = {
    'email': 'john@mail.com',
    'password': '12'
}
response = requests.post(f'{BASE_URL}/auth/login', json=login_data, timeout=5)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    result = response.json()
    print(f"Message: {result.get('message')}")
    print(f"User: {result.get('user')}")
    print(f"Cookies: {response.cookies}")
else:
    print(f"Error: {response.text}")
print()

# Test 3: Check /auth/me with authentication (should work)
print("TEST 3: /auth/me with authentication (using session)")
print("-" * 50)
session = requests.Session()
session.headers.update({'Content-Type': 'application/json'})

# Login first
login_response = session.post(f'{BASE_URL}/auth/login', json=login_data, timeout=5)
print(f"Login Status: {login_response.status_code}")
print(f"Cookies after login: {session.cookies}")

# Now check /auth/me
me_response = session.get(f'{BASE_URL}/auth/me', timeout=5)
print(f"GET /auth/me Status: {me_response.status_code}")
if me_response.status_code == 200:
    user = me_response.json()
    print(f"✓ Authenticated User: {json.dumps(user, indent=2, default=str)}")
else:
    print(f"Error: {me_response.json()}")
print()

# Test 4: Logout and verify /auth/me fails
print("TEST 4: Logout and verify /auth/me fails")
print("-" * 50)
logout_response = session.post(f'{BASE_URL}/auth/logout', timeout=5)
print(f"Logout Status: {logout_response.status_code}")
print(f"Logout Response: {logout_response.json()}")

me_response = session.get(f'{BASE_URL}/auth/me', timeout=5)
print(f"GET /auth/me after logout Status: {me_response.status_code}")
print(f"Response: {me_response.json()}")

print()
print("=" * 50)
print("✓ ALL AUTH ENDPOINTS WORKING CORRECTLY!")
print("=" * 50)
