import pytest
from sqlmodel import SQLModel, create_engine, Session, StaticPool
from ..main import app
from ..db.config import get_session

test_engine = create_engine(
        "sqlite://",
        echo=False,
        poolclass=StaticPool,
        connect_args={'check_same_thread': False}
    )


@pytest.fixture(scope='session', autouse=True)
def init_test_db() -> None:
    """Initializes the database for the testing session"""
    SQLModel.metadata.create_all(test_engine)
    yield
    SQLModel.metadata.drop_all(test_engine)


@pytest.fixture(scope='function')
def get_test_session() -> Session:
    """Returns a Session with the test engine"""
    with Session(test_engine) as session:
        yield session


@pytest.fixture(scope="function", autouse=True)
def override_dependencies(test_session):
    """Overrides get_session with get_test_session for database queries"""
    app.dependency_overrides[get_session] = lambda: get_test_session
    yield
    app.dependency_overrides.clear()
