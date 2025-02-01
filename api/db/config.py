import os
import dotenv
from typing import Annotated
from fastapi import Depends
from sqlmodel import create_engine, Session

dotenv.load_dotenv()
engine = create_engine(os.getenv('DB_URL'), echo=int(os.getenv('VERBOSE')))


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
