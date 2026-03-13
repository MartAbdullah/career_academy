# Career Academy - Full Stack Setup Guide

## 📋 Prerequisites

- Python 3.10+ (Backend)
- Node.js 16+ (Frontend)
- MySQL 5.7+ (Database)

## 🗄️ Database Setup

1. Start MySQL Server
2. Create the database:
   ```sql
   CREATE DATABASE career_academy;
   ```
3. Update `.env` file with your MySQL credentials

## 🔧 Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create Python virtual environment
```bash
python -m venv venv
```

### 3. Activate virtual environment
**Windows (PowerShell):**
```bash
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```bash
.\venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Configure environment variables
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```
DATABASE_URL=mysql://root:your_password@127.0.0.1:3306/career_academy
SECRET_KEY=your-very-secret-key-change-this-in-production
```

### 6. Run the backend server
```bash
python -m uvicorn main:app --reload
```

Backend will be available at: **http://localhost:8000**
API documentation: **http://localhost:8000/docs**

## 🎨 Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install npm dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env` with your API base URL:
```
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Run the frontend development server
```bash
npm run dev
```

Frontend will be available at: **http://localhost:5174**

## 📱 Application Features

### Frontend
- User Authentication (Login/Register)
- Course Browsing & Search
- Responsive Design with Tailwind CSS
- Protected Routes
- Modern UI with React Icons

### Backend API Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

#### Courses
- `GET /courses` - Get all courses
- `GET /courses/{course_id}` - Get course by ID
- `POST /courses` - Create new course
- `PUT /courses/{course_id}` - Update course
- `DELETE /courses/{course_id}` - Delete course
- `GET /courses/instructor/{instructor}` - Get courses by instructor

## 🔐 Security Notes

### Important for Production

1. **Change SECRET_KEY**: Update `SECRET_KEY` in `.env` with a secure random string
2. **Database Credentials**: Use strong passwords
3. **HTTPS**: Set `secure=True` in cookie settings when using HTTPS
4. **CORS**: Restrict `FRONTEND_URLS` to your actual domain in production
5. **Environment Variables**: Never commit `.env` file to version control

## 🗂️ Project Structure

### Backend
```
backend/
├── database/          # Database connection & configuration
├── models/           # SQLAlchemy ORM models
├── schemas/          # Pydantic request/response schemas
├── services/         # Business logic layer
├── routers/          # API route handlers
├── main.py           # FastAPI application entry point
├── auth_utils.py     # Additional auth utilities
├── requirements.txt  # Python dependencies
├── .env             # Environment variables (don't commit!)
├── .env.example      # Environment variables template
└── .gitignore        # Git ignore rules
```

### Frontend
```
frontend/
├── src/
│   ├── pages/        # Page components
│   ├── components/   # Reusable components
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main app component
│   └── index.css     # Global styles
├── public/           # Static assets
├── .env             # Environment variables (don't commit!)
├── .env.example      # Environment variables template
└── package.json      # NPM dependencies
```

## 📝 Development Workflow

1. Start MySQL Server
2. Activate backend virtual environment
3. Run backend: `python -m uvicorn main:app --reload`
4. In new terminal, run frontend: `npm run dev`
5. Open browser to http://localhost:5174

## 🐛 Troubleshooting

### Backend Port Already in Use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

### Frontend Port Already in Use
```bash
# Windows
netstat -ano | findstr :5174
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5174
kill -9 <PID>
```

### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database `career_academy` exists

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

## 👥 Contributing

When adding changes:
1. Never commit `.env` files
2. Update `requirements.txt` if adding Python packages
3. Update `package.json` if adding npm packages
4. Keep code organized in respective modules

---

**Created:** March 2026  
**Project:** Career Academy - Online Education Platform
