from datetime import datetime, timedelta
from typing import Annotated
from fastapi import Depends
from sqlmodel import Session, select, desc, func, delete
from .config import SessionDep
from ..models import MiniLinkCreate, MiniLinkPublic
from .models import MiniLink, UserSession, MiniLinkVisits
from ..dependencies import UserSessionDep
from ..utils import generate_alias, generate_multiple_random_datetimes


def get_visits_in_time_frame(
    mini_link_id: int,
    session: SessionDep,
    start: datetime = datetime(2015, 3, 14),
    end: datetime = datetime.utcnow() + timedelta(days=1)
) -> int:
    query = select(func.count()).where(
        MiniLinkVisits.mini_link_id == mini_link_id,
        MiniLinkVisits.visit_date >= start,
        MiniLinkVisits.visit_date < end
    )
    return session.exec(query).one()


def aggregate_stats(
    mini_link: MiniLink, session: SessionDep
) -> MiniLinkPublic:
    now = datetime.utcnow()
    current_month_start = datetime(now.year, now.month, 1)
    if now.month > 1:
        last_month_start = datetime(now.year, now.month - 1, 1)
    else:
        last_month_start = datetime(now.year - 1, 12, 1)

    total_visits = get_visits_in_time_frame(mini_link.id, session)
    current_month_visits = get_visits_in_time_frame(
        mini_link.id, session, current_month_start
    )
    last_month_visits = get_visits_in_time_frame(
        mini_link.id, session, last_month_start, current_month_start
    )

    return MiniLinkPublic(
        url=mini_link.url,
        alias=mini_link.alias,
        expiration=mini_link.expiration,
        total_visits=total_visits,
        current_month_visits=current_month_visits,
        last_month_visits=last_month_visits
    )


def get_all_mini_links(
    user_session_id: UserSessionDep, session: SessionDep
) -> list[MiniLinkPublic]:
    query = select(MiniLink).where(MiniLink.user_session_id == user_session_id)
    mini_links = session.exec(query).all()
    return [aggregate_stats(mini_link, session) for mini_link in mini_links]


def get_mini_link_details(
    alias: str, user_session_id: UserSessionDep, session: SessionDep
) -> MiniLinkPublic | None:
    query = select(MiniLink).where(
        MiniLink.alias == alias, MiniLink.user_session_id == user_session_id
    )
    mini_link = session.exec(query).first()
    if mini_link:
        return aggregate_stats(mini_link, session)
    return mini_link


def get_mini_link(
    alias: str, user_session_id: UserSessionDep, session: SessionDep
) -> MiniLink | None:
    query = select(MiniLink).where(
        MiniLink.alias == alias, MiniLink.user_session_id == user_session_id
    )
    return session.exec(query).first()


def get_redirect_url(alias: str, session: SessionDep) -> str | None:
    query = select(MiniLink).where(MiniLink.alias == alias)
    mini_link = session.exec(query).first()
    if not mini_link:
        return
    session.add(MiniLinkVisits(mini_link_id=mini_link.id))
    session.add(mini_link)
    session.commit()
    session.refresh(mini_link)
    return mini_link.url


def delete_mini_link(
    alias: str, user_session_id: UserSessionDep, session: SessionDep
) -> MiniLink | None:
    mini_link = get_mini_link(alias, user_session_id, session)
    if mini_link:
        session.exec(
            delete(MiniLinkVisits).where(
                MiniLinkVisits.mini_link_id == mini_link.id
            )
        )

        session.delete(mini_link)
        session.commit()
    return mini_link


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


def add_or_verify_alias(
    mini_link: MiniLinkCreate, session: SessionDep,
) -> MiniLinkCreate | None:
    if mini_link.alias:
        match_found = bool(find_match(mini_link, session))
        return None if match_found else mini_link
    return add_alias(mini_link, session)


def verify_or_add_user_session(
    user_session_id: UserSessionDep, session: SessionDep
) -> None:
    query = select(UserSession).where(UserSession.id == user_session_id)
    if not session.exec(query).first():
        user_session_db = UserSession(id=user_session_id)
        session.add(user_session_db)
        session.commit()
        session.refresh(user_session_db)
    return


def add_mini_link(
    mini_link: Annotated[MiniLinkCreate | None, Depends(add_or_verify_alias)],
    user_session_id: UserSessionDep,
    session: SessionDep,
) -> MiniLink | None:
    if not mini_link:
        return mini_link
    verify_or_add_user_session(user_session_id, session)
    db_mini_link = MiniLink.model_validate({
        'url': mini_link.url,
        'alias': mini_link.alias,
        'user_session_id': user_session_id
    })
    session.add(db_mini_link)
    session.commit()
    session.refresh(db_mini_link)
    return db_mini_link


def add_random_visits(mini_link_id: int, session: SessionDep) -> None:
    rand_dates = generate_multiple_random_datetimes(100, 300)
    visits = []
    for rand_date in rand_dates:
        visits.append(
            MiniLinkVisits(visit_date=rand_date, mini_link_id=mini_link_id)
        )
    session.add_all(visits)
    session.commit()
    return


def add_demo_data(
    user_session_id: UserSessionDep, session: SessionDep
) -> list[MiniLinkPublic]:
    demo_data = [
        {'url': 'https://github.com/rmejia4209/Mini-Link'},
        {'url': 'https://www.linkedin.com/in/rigoberto-mejia/'},
        {'url': 'https://www.solesense.com/en/'}
    ]
    response_data = []
    for item in demo_data:
        db_mini_link = add_mini_link(
            add_or_verify_alias(MiniLinkCreate(**item), session),
            user_session_id,
            session
        )
        add_random_visits(db_mini_link.id, session)
        response_data.append(aggregate_stats(db_mini_link, session))
    return response_data


def get_monthly_visitors(
    alias: str, user_session_id: UserSessionDep, session: SessionDep
) -> dict[datetime, int]:
    query = select(MiniLink.id).where(
        MiniLink.alias == alias, MiniLink.user_session_id == user_session_id
    )
    mini_link_id = session.exec(query).first()

    now = datetime.now()
    start = datetime(year=now.year, month=now.month, day=1)
    end = datetime.now() + timedelta(days=1)
    visits = get_visits_in_time_frame(mini_link_id, session, start, end)
    stats = {start: visits}
    while visits and len(stats) < 12:
        end = start
        month, year = end.month - 1, end.year
        if month < 1:
            month = 12
            year -= 1
        start = datetime(year=year, month=month, day=1)
        stats[start] = get_visits_in_time_frame(
            mini_link_id, session, start, end
        )
    return stats
