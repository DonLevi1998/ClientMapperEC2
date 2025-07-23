from fastapi import FastAPI, Depends, HTTPException
import requests
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
URL_FRONTEND = os.getenv("URL_FRONTEND", "http://localhost:4200")
URL_AUTH_HASH = os.getenv("AUTH_HASH_URL", "http://auth-hash:5031/hash-password")
app.add_middleware(
    CORSMiddleware,
     allow_origins=[URL_FRONTEND],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Microservice auth-hash
    response = requests.post([URL_AUTH_HASH], json={"password": user.password})
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error hashing password")
    hashed_password = response.json()["hash"]

    # Create user with hash password
    user_data = user.dict()
    user_data["password"] = hashed_password
    new_user = models.User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
