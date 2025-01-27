
from fastapi import FastAPI
from pydantic import BaseModel


class URL(BaseModel):
    url: str


app = FastAPI()


@app.post("/")
def minify_url(long_url: URL) -> dict[str, str]:
    return {}
