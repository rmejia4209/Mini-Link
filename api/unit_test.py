import pytest
import random
from pydantic import ValidationError
from .models import MiniLinkCreate
from .utils import generate_alias, get_id_from_alias


invalid_protocols = [
    'htp://google.com',  # http misspelled
    'ssh://google.com',  # invalid protocol
    'google.com',  # no protocol
    'http//google.com',  # missing :
    'https:/google.com',  # missing /
    r'https:\\google.com',  # back slashes in protocol
]

invalid_authorities = [
    'https:///google.com',  # extra slash in protocol
    'https://user:password@google.com',  # unaccepted authority
    'http://google/notallowed.com',  # slash in authority
    'http://google@notallowed.com',  # @ in authority not allowed
    'http://google?notallowed.com',  # ? in authority not allowed
    'http://google#notallowed.com'  # # in authority not allowed
]

invalid_domains = [
    'https://google.comm', 'https://wikipedia.fr', 'https://php.php',
    'https://snake.oi', 'https://oregonstate.osu', 'https://irs.goov'
]

valid_protocols = ['https://github.com', 'http://google.com']

valid_domains = [
    'https://google.com', 'https://wikipedia.org', 'https://php.net',
    'https://snake.io', 'https://oregonstate.edu', 'https://irs.gov'
]


@pytest.mark.parametrize("data", [{'url': url} for url in invalid_protocols])
def test_invalid_protocols(data) -> None:
    with pytest.raises(ValidationError):
        MiniLinkCreate(**data)


@pytest.mark.parametrize("data", [{'url': url} for url in invalid_authorities])
def test_invalid_authorities(data) -> None:
    with pytest.raises(ValidationError):
        MiniLinkCreate(**data)


@pytest.mark.parametrize("data", [{'url': url} for url in invalid_domains])
def test_invalid_domains(data) -> None:
    with pytest.raises(ValidationError):
        MiniLinkCreate(**data)


@pytest.mark.parametrize("data", [{'url': url} for url in valid_protocols])
def test_valid_protocols(data) -> None:
    mini_link = MiniLinkCreate(**data)
    assert mini_link.url == data['url']


@pytest.mark.parametrize("data", [{'url': url} for url in valid_domains])
def test_valid_domains(data) -> None:
    mini_link = MiniLinkCreate(**data)
    assert mini_link.url == data['url']


def test_one_to_one_alias_gen() -> None:
    rand_id = random.randint(52**2, 52**3-1)
    alias = generate_alias(rand_id)
    assert (rand_id) == get_id_from_alias(alias)
