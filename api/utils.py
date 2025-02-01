import random
import string


def get_chars() -> list[str]:
    random.seed(42)
    chars = list(string.ascii_letters)
    random.shuffle(chars)
    return chars


def generate_alias(n: int) -> str:
    n = n + 52**2 - 1
    chars = get_chars()
    base = len(chars)
    alias = ''
    while n:
        n, rem = divmod(n, base)
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
