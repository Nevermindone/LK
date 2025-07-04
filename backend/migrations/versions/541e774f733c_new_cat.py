"""new cat

Revision ID: 541e774f733c
Revises: 15d8b4509f75
Create Date: 2025-06-27 18:25:01.041857

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '541e774f733c'
down_revision: Union[str, None] = '15d8b4509f75'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    op.bulk_insert(
        sa.table(
            "categories",
            sa.column("id", sa.Integer),
            sa.column("name", sa.String),
        ),
        [{"id": 1, "name": "Общая"}],
    )
    op.alter_column(
        "cases", "category_id",
        server_default="1"
    )



def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('cases', 'category_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
