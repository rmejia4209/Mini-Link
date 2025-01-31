import os
import dotenv
from typing import Annotated
from fastapi import Depends
from sqlmodel import create_engine, Session, select, desc
from .models import MiniLinks

dotenv.load_dotenv()
engine = create_engine(os.getenv('DB_URL'), echo=int(os.getenv('VERBOSE')))


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def get_mini_link_details(
    mini_link: str, session: SessionDep
) -> MiniLinks | None:
    query = select(MiniLinks).where(MiniLinks.alias == mini_link)
    return session.exec(query).first()


def get_last_mini_link_id(session: SessionDep) -> int | None:
    query = select(MiniLinks.id).order_by(desc(MiniLinks.id)).limit(1)
    return session.exec(query).all()
