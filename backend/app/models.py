from sqlalchemy import String, Integer, ForeignKey, DateTime, func, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .core.database import Base

class Category(Base):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, index=True)

class Case(Base):
    __tablename__ = "cases"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text, default="")
    category_id = mapped_column(
        ForeignKey("categories.id"),
        server_default="1"
    )
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())

    category: Mapped["Category"] = relationship(lazy="joined")