from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    telephone: Optional[str] = None
    password: str
    address: Optional[str] = None

class UserOut(BaseModel):
    idusers: int
    name: str
    email: EmailStr
    telephone: Optional[str] = None
    address: Optional[str] = None

    class Config:
        from_attributes = True
