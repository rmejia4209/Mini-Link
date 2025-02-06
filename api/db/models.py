from sqlmodel import SQLModel, Field
from datetime import datetime, timedelta


class UserSession(SQLModel, table=True):
    id: str = Field(primary_key=True)


class MiniLink(SQLModel, table=True):
    __tablename__ = 'mini_links'
    id: int = Field(default=None, primary_key=True)
    url: str = Field(max_length=1024, nullable=False)
    alias: str = Field(max_length=10, nullable=False)
    expiration: datetime = Field(
        default_factory=lambda: datetime.utcnow() + timedelta(days=30),
        nullable=False
    )
    visits: int = Field(default=0, nullable=False)
    #session_id: str = Field(foreign_key='user_sessions.id')
