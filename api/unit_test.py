import pytest
from pydantic import ValidationError
from .main import MiniLinkCreate


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
def test_invalid_protocols(data):
    with pytest.raises(ValidationError):
        MiniLinkCreate(**data)



@pytest.mark.parametrize("data", [{'url': url} for url in invalid_authorities])
def test_invalid_authorities(data):
    with pytest.raises(ValidationError):
        MiniLinkCreate(**data)


@pytest.mark.parametrize("data", [{'url': url} for url in invalid_domains])
def test_invalid_domains(data):
    with pytest.raises(ValidationError):
        MiniLinkCreate(**data)


@pytest.mark.parametrize("data", [{'url': url} for url in valid_protocols])
def test_valid_protocols(data):
    mini_link = MiniLinkCreate(**data)
    assert mini_link.url == data['url']


@pytest.mark.parametrize("data", [{'url': url} for url in valid_domains])
def test_valid_domains(data):
    mini_link = MiniLinkCreate(**data)
    assert mini_link.url == data['url']
