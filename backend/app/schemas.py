from pydantic import BaseModel
from datetime import datetime

class CategoryRead(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

class CaseCreate(BaseModel):
    title: str
    description: str = ""
    category_id: int

class CaseRead(CaseCreate):
    id: int
    created_at: datetime
    category: CategoryRead
    class Config:
        from_attributes = True