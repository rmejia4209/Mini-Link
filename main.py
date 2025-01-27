
from fastapi import FastAPI
from pydantic import BaseModel, Field


url_pattern = r'^https?:\/\/'


class URL(BaseModel):
    url: str = Field(pattern=url_pattern, example="https://google.com/search")


app = FastAPI()


@app.post("/")
def minify_url(long_url: URL) -> dict[str, str]:
    return {}
