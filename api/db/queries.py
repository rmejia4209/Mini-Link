import os
import dotenv
from typing import Annotated
from fastapi import Depends
from sqlmodel import create_engine, Session, select
from .models import MiniLinks

dotenv.load_dotenv()
engine = create_engine(os.getenv('DB_URL'), echo=True)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def get_mini_link_details(
    mini_link: str, session: SessionDep
) -> MiniLinks | None:
    query = select(MiniLinks).where(MiniLinks.alias == mini_link)
    return session.exec(query).first()
