# app/core/config.py
from functools import lru_cache
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # --- БД ---
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "lk"
    POSTGRES_USER: str = "lk_user"
    POSTGRES_PASSWORD: str = "lk_pass"

    # --- API ---
    SECRET_KEY: str = "CHANGE_ME_TO_RANDOM_32_CHARS"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# один объект на приложение
@lru_cache
def get_settings() -> Settings:
    return Settings()

settings: Settings = get_settings()     # <- то, что ждут импорты
