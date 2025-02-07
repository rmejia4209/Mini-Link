import pytest
from fastapi.testclient import TestClient
from ..main import app
from ..utils import generate_alias

client_1 = TestClient(app)
client_2 = TestClient(app)

url = 'https://google.com'
data = [{'url': url, 'alias': generate_alias(i)} for i in range(2, 7)]


def test_is_on() -> None:
    res = client_1.get('/status')
    assert res.status_code == 204


@pytest.mark.parametrize('payload', data)
def test_mini_link_create_with_alias(payload) -> None:
    """Test 5 create operations with alias specified"""
    res = client_1.post('/', json=payload)
    res_data = res.json()
    assert payload['alias'] == res_data['alias']
    assert res.status_code == 200


@pytest.mark.parametrize('payload', data)
def test_mini_link_create_with_alias_conflict(payload) -> None:
    """Test 5 create operations with duplicate alias. 409 status expected."""
    res = client_1.post('/', json=payload)
    assert res.status_code == 409


def test_mini_link_create_without_alias() -> None:
    """
    Test create operation without specifying an alias. Since the alias for
    id 2 through 5 have been consumed, this entry should receive the
    alias for id 1.
    """
    res = client_1.post("/", json={"url": url})
    res_data = res.json()
    assert generate_alias(1) == res_data['alias']
    assert res.status_code == 200
    data.append({'url': url, 'alias': generate_alias(1)})


@pytest.mark.parametrize(
    'payload', [{"url": url, "alias": alias} for alias in ['abc', 'ABC']]
)
def test_case_sensitivity(payload) -> None:
    """Test the case sensitivity of the API."""
    res = client_1.post("/", json=payload)
    assert res.status_code == 200
    data.append(payload)


@pytest.mark.parametrize('alias', [data[i]['alias'] for i in range(len(data))])
def test_valid_redirect(alias) -> None:
    """Test redirect status and url"""
    res = client_1.get(f'/{alias}', follow_redirects=False)
    assert res.headers['location'] == url
    assert res.status_code == 301


def test_invalid_redirect() -> None:
    """Test redirect status for an alias that does not exist"""
    res = client_1.get(f'/{generate_alias(100)}', follow_redirects=False)
    assert res.status_code == 404


@pytest.mark.parametrize('alias', [data[i]['alias'] for i in range(len(data))])
def test_get_mini_link_info(alias) -> None:
    """Test the details returned by the get-info alias"""
    res = client_1.get(f'/get-info/{alias}')
    info = res.json()
    assert info['total_visits'] == 1


@pytest.mark.parametrize('alias', [data[i]['alias'] for i in range(len(data))])
def test_get_mini_links_on_different_session(alias) -> None:
    """
    Test the user session. The details should be inaccessible on a
    different session.
    """
    res = client_2.get(f'/get-info/{alias}')
    assert res.status_code == 404


@pytest.mark.parametrize('alias', [data[i]['alias'] for i in range(len(data))])
def test_delete_mini_links_on_different_session(alias) -> None:
    """Test deleting on a different session"""
    res = client_2.delete(f'/{alias}')
    assert res.status_code == 404


def test_get_all_mini_links() -> None:
    """Test getting all of the mini links on a session"""
    res = client_1.get('/get-all')
    aliases = [item['alias'] for item in res.json()]
    assert all(payload['alias'] in aliases for payload in data)
    assert res.status_code == 200


def test_get_all_mini_links_on_different_session() -> None:
    """Test getting all of the mini links on a different session"""
    res = client_2.get('/get-all')
    assert not res.json()  # response should be empty
    assert res.status_code == 200


@pytest.mark.parametrize('alias', [data[i]['alias'] for i in range(len(data))])
def test_delete_mini_links(alias) -> None:
    """Test the delete endpoint"""
    res = client_1.delete(f'/{alias}')
    assert res.status_code == 204
