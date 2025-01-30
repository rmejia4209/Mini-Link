
from typing import Any, Annotated
from fastapi import FastAPI, HTTPException, Depends
from api_models import MiniLinkCreate, MiniLinkPublic
from db import get_mini_link_details

app = FastAPI()


@app.post("/")
def minify_url(long_url: MiniLinkCreate) -> dict[str, str]:
    return {}


@app.get("/{mini_link}", response_model=MiniLinkPublic)
def trial_point(
    mini_link: Annotated[str, Depends(get_mini_link_details)]
) -> Any:
    if not mini_link:
        raise HTTPException(status_code=404, detail='Mini Link Not Fond')
    return mini_link
