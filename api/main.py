
from typing import Any, Annotated
from fastapi import FastAPI, HTTPException, Depends
from .models import MiniLinkPublic
from .db.models import MiniLink
from .db.queries import add_mini_link, get_mini_link_details

app = FastAPI()


@app.post("/", response_model=MiniLinkPublic)
def minify_url(
    mini_link: Annotated[MiniLink, Depends(add_mini_link)]
) -> Any:
    if not mini_link:
        raise HTTPException(
            status_code=409, detail='Alias already in use. Please try another'
        )
    return mini_link


@app.get("/{alias}", response_model=MiniLinkPublic)
def trial_point(
    mini_link: Annotated[MiniLink, Depends(get_mini_link_details)]
) -> Any:
    if not mini_link:
        raise HTTPException(status_code=404, detail='Mini Link Not Fond')
    return mini_link
