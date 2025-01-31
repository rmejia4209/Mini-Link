import random
import string
from fastapi import Depends
from typing import Annotated
from .db.queries import get_last_mini_link_id


def get_chars() -> list[str]:
    random.seed(42)
    chars = list(string.ascii_letters)
    random.shuffle(chars)
    return chars


def generate_alias(
    last_id: Annotated[int, Depends(get_last_mini_link_id)]
) -> str:
    last_id = 52**2-1 if not last_id else last_id
    val = last_id + 1
    chars = get_chars()
    base = len(chars)

    alias = ''
    while val:
        val, rem = divmod(val, base)
        alias += chars[rem]
    return alias


def get_id_from_alias(alias: str):
    chars = get_chars()
    base = len(chars)

    pos = len(alias) - 1
    n = 0
    while pos >= 0:
        n = n * base + chars.index(alias[pos])
        pos -= 1
    return n
