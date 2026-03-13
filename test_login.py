import requests
import json

# Test login endpoint
print('=== Testing Login Endpoint ===')
response = requests.post('http://localhost:8080/auth/login', 
    json={'email': 'john@mail.com', 'password': '12'},
    headers={'Content-Type': 'application/json'}
)
print(f'Status: {response.status_code}')
print(f'Response: {response.json()}')
print(f'Cookies: {dict(response.cookies)}')

# Check Set-Cookie header
for header, value in response.headers.items():
    if 'cookie' in header.lower():
        print(f'{header}: {value}')

# Test with cookie jar (simulating withCredentials)
print('\n=== Testing with Session (Cookie Jar) ===')
session = requests.Session()
response = session.post('http://localhost:8080/auth/login', 
    json={'email': 'john@mail.com', 'password': '12'},
    headers={'Content-Type': 'application/json'}
)
print(f'Login Status: {response.status_code}')
print(f'Login Response: {response.json()}')
print(f'Session Cookies: {dict(session.cookies)}')

# Now test /auth/me with the same session
print('\n=== Testing /auth/me with session ===')
response = session.get('http://localhost:8080/auth/me')
print(f'Auth Status: {response.status_code}')
try:
    print(f'Auth Response: {response.json()}')
except:
    print(f'Auth Response: {response.text}')
