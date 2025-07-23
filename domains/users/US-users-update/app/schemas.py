from pydantic import BaseModel, EmailStr
from typing import Optional

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    telephone: Optional[str] = None
    password: Optional[str] = None
    address: Optional[str] = None

class UserOut(BaseModel):
    idusers: int
    name: str
    email: EmailStr
    telephone: Optional[str] = None
    address: Optional[str] = None

    class Config:
        from_attributes = True
