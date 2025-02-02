from typing import Annotated
from fastapi import Depends
from sqlmodel import Session, select, desc
from .config import SessionDep
from ..models import MiniLinkCreate
from .models import MiniLink
from ..utils import generate_alias


def get_mini_link_details(alias: str, session: SessionDep) -> MiniLink | None:
    query = select(MiniLink).where(MiniLink.alias == alias)
    return session.exec(query).first()


def get_redirect_url(alias: str, session: SessionDep) -> str | None:
    query = select(MiniLink).where(MiniLink.alias == alias)
    mini_link = session.exec(query).first()
    if not mini_link:
        return
    mini_link.visits += 1
    session.add(mini_link)
    session.commit()
    session.refresh(mini_link)
    return mini_link.url


def find_match(mini_link: MiniLinkCreate, session: Session) -> int | None:
    query = select(MiniLink.id).where(MiniLink.alias == mini_link.alias)
    match = session.exec(query).first()
    return match if match else None


def add_alias(mini_link: MiniLinkCreate, session: Session) -> MiniLinkCreate:
    query = select(MiniLink.id).order_by(desc(MiniLink.id)).limit(1)
    _id = session.exec(query).all()
    _id = 1 if not _id else (_id[0] + 1)
    mini_link.alias = generate_alias(_id)
    match = find_match(mini_link, session)

    while match:
        mini_link.alias = generate_alias(match)
        match = find_match(mini_link, session)
    return mini_link


def add_or_verify(
    mini_link: MiniLinkCreate, session: SessionDep
) -> MiniLinkCreate | None:
    if mini_link.alias:
        match_found = bool(find_match(mini_link, session))
        return None if match_found else mini_link
    return add_alias(mini_link, session)


def add_mini_link(
    mini_link: Annotated[MiniLinkCreate | None, Depends(add_or_verify)],
    session: SessionDep
) -> MiniLink | None:
    if not mini_link:
        return mini_link
    db_mini_link = MiniLink.model_validate(mini_link)
    session.add(db_mini_link)
    session.commit()
    session.refresh(db_mini_link)
    return db_mini_link
