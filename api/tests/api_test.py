import pytest
from fastapi.testclient import TestClient
from ..main import app
from ..utils import generate_alias

client = TestClient(app)

url = 'https://google.com'
data = [{'url': url, 'alias': generate_alias(i)} for i in range(2, 7)]


@pytest.mark.parametrize('payload', data)
def test_mini_link_create_with_alias(payload) -> None:
    """Test 5 create operations with alias specified"""
    res = client.post('/', json=payload)
    res_data = res.json()
    assert payload['alias'] == res_data['alias']
    assert res.status_code == 200


@pytest.mark.parametrize('payload', data)
def test_mini_link_create_with_alias_conflict(payload) -> None:
    """Test 5 create operations with duplicate alias. 409 status expected."""
    res = client.post('/', json=payload)
    assert res.status_code == 409


def test_mini_link_create_without_alias() -> None:
    """
    Test create operation without specifying an alias. Since the alias for
    id 2 through 5 have been consumed, this entry should receive the
    alias for id 1.
    """
    res = client.post("/", json={"url": url})
    res_data = res.json()
    assert generate_alias(1) == res_data['alias']
    assert res.status_code == 200


@pytest.mark.parametrize(
    'payload', [{"url": url, "alias": alias} for alias in ['abc', 'ABC']]
)
def test_case_sensitivity(payload) -> None:
    """
    Test create operation without specifying an alias. Since the alias for
    id 2 through 5 have been consumed, this entry should receive the
    alias for id 1.
    """
    res = client.post("/", json=payload)
    assert res.status_code == 200


@pytest.mark.parametrize('alias', [data[0]['alias']])
def test_redirect(alias) -> None:
    """Test redirect status and url"""
    res = client.get(f'/{alias}', follow_redirects=False)
    assert res.headers['location'] == url
    assert res.status_code == 301
