from fastapi import FastAPI, Depends, HTTPException
import requests
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:4200")],
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

@app.put("/users/{user_id}", response_model=schemas.UserOut)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.idusers == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    for var, value in vars(user).items():
        if value is not None:
            # Si el campo es password, hashearlo antes de guardar
            if var == "password":
                response = requests.post(os.getenv("AUTH_HASH_URL", "http://auth-hash:5031/hash-password"), json={"password": value})
                if response.status_code != 200:
                    raise HTTPException(status_code=500, detail="Error hashing password")
                value = response.json()["hash"]
            setattr(db_user, var, value)
    db.commit()
    db.refresh(db_user)
    return db_user