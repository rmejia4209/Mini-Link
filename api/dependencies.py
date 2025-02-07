from typing import Annotated
from uuid import uuid4
from fastapi import Depends, Request, Response


def get_user_session(req: Request, res: Response) -> str:
    session_id = req.cookies.get("session_id")
    if not session_id:
        session_id = str(uuid4())
        # TODO: Band aid solution - make the expiration rolling
        res.set_cookie("session_id", session_id, max_age=(60*60*24*365*10))
    return session_id


UserSessionDep = Annotated[str, Depends(get_user_session)]
