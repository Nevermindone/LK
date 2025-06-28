"""add users table

Revision ID: 2f70c93b1d8c
Revises: e7d6a5b3d9bc
Create Date: 2025-07-01 00:00:00.000000
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column

from app.core.security import get_password_hash

# revision identifiers, used by Alembic.
revision: str = '2f70c93b1d8c'
down_revision: Union[str, None] = 'e7d6a5b3d9bc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('username', sa.String(length=50), nullable=False, unique=True),
        sa.Column('hashed_password', sa.String(length=200), nullable=False),
        sa.Column('is_active', sa.Boolean(), server_default='true', nullable=False),
        sa.Column('subscription_active', sa.Boolean(), server_default='true', nullable=False),
    )

    user_table = table(
        'users',
        column('username', sa.String),
        column('hashed_password', sa.String),
    )
    op.bulk_insert(
        user_table,
        [{
            'username': 'admin',
            'hashed_password': get_password_hash('admin'),
        }]
    )


def downgrade() -> None:
    op.drop_table('users')
