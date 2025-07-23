from pydantic import BaseModel, EmailStr
from typing import Optional

class UserOut(BaseModel):
    idusers: int
    name: str
    email: EmailStr
    telephone: Optional[str] = None
    address: Optional[str] = None

    class Config:
        from_attributes = True
