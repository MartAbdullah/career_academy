from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserOut
from services.auth_service import AuthService


class UserService:
    @staticmethod
    def create_user(db: Session, user_data: UserCreate) -> User:
        hashed_password = AuthService.get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            full_name=user_data.full_name,
            is_active=True
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> User:
        user = UserService.get_user_by_email(db, email)
        if not user:
            return False
        if not AuthService.verify_password(password, user.hashed_password):
            return False
        return user

    @staticmethod
    def get_all_users(db: Session) -> list:
        return db.query(User).all()

    @staticmethod
    def deactivate_user(db: Session, user_id: int) -> User:
        user = UserService.get_user_by_id(db, user_id)
        if user:
            user.is_active = False
            db.commit()
            db.refresh(user)
        return user

    @staticmethod
    def update_reset_token(db: Session, user_id: int, token: str) -> None:
        user = UserService.get_user_by_id(db, user_id)
        if user:
            user.reset_token = token
            db.commit()

    @staticmethod
    def get_user_by_reset_token(db: Session, token: str) -> User:
        return db.query(User).filter(User.reset_token == token).first()

    @staticmethod
    def update_password(db: Session, user_id: int, new_password: str) -> None:
        user = UserService.get_user_by_id(db, user_id)
        if user:
            user.hashed_password = AuthService.get_password_hash(new_password)
            user.reset_token = None
            db.commit()
