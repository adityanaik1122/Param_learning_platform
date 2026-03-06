import requests
import json

print("Testing Backend Login Endpoint...")
print("=" * 50)

url = "http://localhost:8000/api/users/auth/login/"
data = {
    "email": "admin@test.com",
    "password": "admin123"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        print("\n✓ LOGIN SUCCESSFUL!")
        print("✓ Backend is working correctly")
        print("\nYou can now login from the frontend with:")
        print("  Email: admin@test.com")
        print("  Password: admin123")
    else:
        print("\n✗ LOGIN FAILED")
        print("Check the error message above")
        
except requests.exceptions.ConnectionError:
    print("\n✗ ERROR: Cannot connect to backend server")
    print("Make sure the Django server is running:")
    print("  cd backend")
    print("  python manage.py runserver")
except Exception as e:
    print(f"\n✗ ERROR: {str(e)}")
