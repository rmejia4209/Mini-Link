from datetime import datetime, timedelta
import random
import string
import time


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


def gen_rand_datetime() -> datetime:
    """Returns a random datetime from 1 year ago to today"""
    now = datetime.utcnow()
    random.seed(time.time_ns())
    rand_date = datetime(
        now.year, random.randint(1, 12), random.randint(1, 28)
    )
    return rand_date if rand_date <= now else rand_date - timedelta(days=365)


def generate_multiple_random_datetimes(lo: int, hi: int) -> list[datetime]:
    random.seed(time.time_ns())
    return [gen_rand_datetime() for _ in range(random.randint(lo, hi))]
