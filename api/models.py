from datetime import datetime
from pydantic import BaseModel, Field


url_pattern = (
    r"^https?:\/\/"
    r"[a-zA-Z0-9\-._~]+"
    r"(?:\.(com|org|net|io|edu|gov))"
    r"(\/|\?.*|\/.*)?$"
)


class MiniLinkCreate(BaseModel):
    url: str = Field(
        pattern=url_pattern,
        json_schema_extra={'example': "https://google.com"}
    )
    alias: str | None = Field(default=None, max_length=10)


class MiniLinkPublic(BaseModel):
    url: str
    alias: str
    expiration: datetime
    total_visits: int = Field(default=0)
    current_month_visits: int = Field(default=0)
    last_month_visits: int = Field(default=0)
