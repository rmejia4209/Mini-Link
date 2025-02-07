from sqlmodel import SQLModel, Field
from datetime import datetime, timedelta


class UserSession(SQLModel, table=True):
    __tablename__ = 'user_sessions'
    id: str = Field(primary_key=True)


class MiniLink(SQLModel, table=True):
    __tablename__ = 'mini_links'
    id: int = Field(default=None, primary_key=True)
    url: str = Field(max_length=1024, nullable=False)
    alias: str = Field(min_length=3, max_length=10, nullable=False)
    expiration: datetime = Field(
        default_factory=lambda: datetime.utcnow() + timedelta(days=30),
        nullable=False
    )
    user_session_id: str = Field(foreign_key='user_sessions.id')


class MiniLinkVisits(SQLModel, table=True):
    __tablename__ = 'mini_link_visits'
    id: int = Field(default=None, primary_key=True)
    visit_date: datetime = Field(default=datetime.utcnow())
    mini_link_id: int = Field(foreign_key='mini_links.id')
