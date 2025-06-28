# backend/app/api/cases.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from uuid import uuid4
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..core.database import get_async_session          # ← новое
from ..core.config import settings
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

    os.makedirs(settings.FILE_STORAGE_PATH, exist_ok=True)
    saved = 0
    for f in files:
        unique = f"{uuid4()}_{f.filename}"
        dest = os.path.join(settings.FILE_STORAGE_PATH, unique)
        with open(dest, "wb") as out:
            out.write(await f.read())

        doc = models.CaseDocument(
            case_id=case_id,
            filename=f.filename,
            path=dest,
        )
        db.add(doc)
        saved += 1

    await db.commit()
    return {"ok": True, "uploaded": saved}


@router.get("/{case_id}/documents", response_model=list[schemas.DocumentRead])
async def list_documents(case_id: int, db: AsyncSession = Depends(get_async_session)):
    case = await db.get(models.Case, case_id)
    if not case:
        raise HTTPException(404, "Case not found")
    res = await db.execute(
        select(models.CaseDocument).where(models.CaseDocument.case_id == case_id)
    )
    return res.scalars().all()


@router.get("/{case_id}/documents/{doc_id}")
async def download_document(
    case_id: int, doc_id: int, db: AsyncSession = Depends(get_async_session)
):
    doc = await db.get(models.CaseDocument, doc_id)
    if not doc or doc.case_id != case_id:
        raise HTTPException(404, "Document not found")
    return FileResponse(path=doc.path, filename=doc.filename)

