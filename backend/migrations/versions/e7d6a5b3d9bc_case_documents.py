"""add case documents

Revision ID: e7d6a5b3d9bc
Revises: 541e774f733c
Create Date: 2025-06-30 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'e7d6a5b3d9bc'
down_revision: Union[str, None] = '541e774f733c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'case_documents',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('case_id', sa.Integer(), sa.ForeignKey('cases.id'), nullable=False),
        sa.Column('filename', sa.String(length=200), nullable=False),
        sa.Column('path', sa.String(length=300), nullable=False),
        sa.Column('uploaded_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('case_documents')
