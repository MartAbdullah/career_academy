from fastapi import APIRouter, Depends, HTTPException, Response, Request, BackgroundTasks
from sqlalchemy.orm import Session
from database import get_db
from schemas import UserCreate, UserOut, LoginRequest, LoginResponse, ResetPasswordRequest
from services import UserService, AuthService
from services.mail_service import send_forgot_password_email
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOut)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = UserService.get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user = UserService.create_user(db, user_data)
    return user


@router.post("/login", response_model=LoginResponse)
def login(login_data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    # Authenticate user
    user = UserService.authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create access token
    access_token = AuthService.create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=60)
    )
    
    # Set HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # Change to True in production with HTTPS
        samesite="lax",
        max_age=3600  # 1 hour
    )
    
    return {
        "message": "Login successful",
        "user": user
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}


@router.post("/forgot-password")
async def forgot_password(request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    data = await request.json()
    email = data.get("email")
    
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
        
    user = UserService.get_user_by_email(db, email)
    
    if user:
        # Generate a real secure token
        token = AuthService.generate_reset_token()
        
        # Save token to user in database
        UserService.update_reset_token(db, user.id, token)
        
        # Send email in background
        background_tasks.add_task(send_forgot_password_email, email, token)
        
    return {"message": "If the email is registered, a reset link will be sent."}


@router.post("/reset-password")
async def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    # 1. Find the user associated with the token 
    user = UserService.get_user_by_reset_token(db, data.token)
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")

    # 2. Update the password and clear the token
    UserService.update_password(db, user.id, data.new_password)
    
    return {"message": "Your password has been reset successfully."}


@router.get("/me", response_model=UserOut)
def get_current_user(request: Request, db: Session = Depends(get_db)):
    # Extract token from HttpOnly cookie
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Decode token
    payload = AuthService.decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Get user ID from token
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Fetch user from database
    user = UserService.get_user_by_id(db, int(user_id))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user
