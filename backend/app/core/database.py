from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)
from sqlalchemy.orm import DeclarativeBase

from .config import settings  # ← ваш Settings

# ─── подключение к Postgres ──────────────────────────────────
SQLALCHEMY_DATABASE_URL = (
    f"postgresql+asyncpg://{settings.POSTGRES_USER}:"
    f"{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:"
    f"{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=False)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


# ─── база моделей ────────────────────────────────────────────
class Base(DeclarativeBase):
    pass


# ─── dependency для FastAPI ──────────────────────────────────
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Отдаёт Session и корректно закрывает его после запроса."""
    async with async_session_maker() as session:
        yield session
