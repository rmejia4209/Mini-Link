from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)


# @pytest.mark.parametrize("data", [{'url': url} for url in invalid_protocols])
def test_trial() -> None:
    res = client.post("/", json={"url": "https://google.com"})
    print(res.json)
    assert res.status_code == 200
