
from typing import Any, Annotated
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, Response
from uuid import uuid4
from .models import MiniLinkPublic
from .db.models import MiniLink
from .db.queries import (
    add_mini_link, get_mini_link_details, get_redirect_url, delete_mini_link
)

origins = ['http://localhost:5173']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/", response_model=MiniLinkPublic)
def minify_url(
    mini_link: Annotated[MiniLink, Depends(add_mini_link)]
) -> Any:
    if not mini_link:
        raise HTTPException(
            status_code=409, detail='Alias already in use. Please try another'
        )
    return mini_link


@app.get('/get-info/{alias}', response_model=MiniLinkPublic)
def get_mini_link_details(
    mini_link: Annotated[MiniLink, Depends(get_mini_link_details)]
) -> Any:
    if not mini_link:
        raise HTTPException(status_code=404, detail='Mini Link Not Found')
    return mini_link


@app.get("/{alias}")
def redirect(url: Annotated[str, Depends(get_redirect_url)]) -> Any:
    if not url:
        raise HTTPException(status_code=404, detail='Mini Link Not Found')
    return RedirectResponse(url=url, status_code=301)


@app.delete('/{alias}', status_code=204, response_class=Response)
def delete(mini_link: Annotated[MiniLink, Depends(delete_mini_link)]) -> None:
    if not mini_link:
        raise HTTPException(status_code=404, detail='Mini Link Not Found')
    return
