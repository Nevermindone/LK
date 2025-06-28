# backend/app/api/cases.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..core.database import get_async_session          # ← новое
from .. import models, schemas

router = APIRouter(prefix="/cases", tags=["cases"])


@router.get("/", response_model=list[schemas.CaseRead])
async def list_cases(db: AsyncSession = Depends(get_async_session)):
    res = await db.execute(
        select(models.Case).order_by(models.Case.created_at.desc())
    )
    return res.scalars().all()


@router.post("/", response_model=schemas.CaseRead, status_code=201)
async def create_case(case: schemas.CaseCreate, db: AsyncSession = Depends(get_async_session)):
    category = await db.get(models.Category, case.category_id)
    if not category:
        raise HTTPException(400, "Category not found")

    obj = models.Case(**case.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj


@router.post("/{case_id}/documents")
async def upload_documents(
    case_id: int,
    files: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_async_session)
):
    case = await db.get(models.Case, case_id)
    if not case:
        raise HTTPException(404, "Case not found")
    # TODO: сохранить файлы
    return {"ok": True, "uploaded": len(files)}
