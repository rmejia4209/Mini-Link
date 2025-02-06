from typing import Annotated
from uuid import uuid4
from fastapi import Depends, Request, Response


def get_user_session(req: Request, res: Response) -> str:
    session_id = req.cookies.get("session_id")
    if not session_id:
        session_id = str(uuid4())
        res.set_cookie("session_id", session_id)
        print(f'Making: {session_id}')
    else:
        print(session_id)
    return session_id


UserSessionDep = Annotated[str, Depends(get_user_session)]
