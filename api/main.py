
from typing import Any, Annotated
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, Response
from .models import MiniLinkPublic
from .db.models import MiniLink
from .db.queries import (
    add_mini_link, get_all_mini_links, get_mini_link_details, get_redirect_url,
    delete_mini_link, add_demo_data
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


@app.get('/status',  status_code=204, response_class=Response)
def check_status() -> None:
    return


@app.get('/get-all', response_model=list[MiniLinkPublic])
def api_get_all_mini_links(
    mini_links: Annotated[list[MiniLinkPublic], Depends(get_all_mini_links)]
) -> Any:
    return mini_links


@app.get('/get-demo-data', response_model=list[MiniLinkPublic])
def load_demo_data(
    mini_links: Annotated[list[MiniLinkPublic], Depends(add_demo_data)]
) -> Any:
    print(mini_links)
    return mini_links


@app.get('/get-info/{alias}', response_model=MiniLinkPublic)
def api_get_mini_link_details(
    mini_link: Annotated[MiniLinkPublic | None, Depends(get_mini_link_details)]
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
