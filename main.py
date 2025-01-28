
from fastapi import FastAPI
from pydantic import BaseModel, Field


url_pattern = (
    r"^https?:\/\/"
    r"[a-zA-Z0-9\-._~]+"
    r"(?:\.(com|org|net|io|edu|gov))"
    r"(\/|\?.*|\/.*)?$"
)


class URL(BaseModel):
    url: str = Field(pattern=url_pattern, example="https://google.com")


app = FastAPI()


@app.post("/")
def minify_url(long_url: URL) -> dict[str, str]:
    return {}
