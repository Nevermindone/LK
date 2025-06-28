from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..core.database import get_async_session
from ..models import Category
from ..schemas import CategoryRead

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[CategoryRead])
async def list_categories(
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(select(Category).order_by(Category.name))
    return result.scalars().all()
