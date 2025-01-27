import requests
import unittest


class RegexUnitTest(unittest.TestCase):
    base_url: str = 'http://localhost:8000/'

    def get_mini_url(self, url: str) -> tuple[int, dict[str, str]]:

        res = requests.post(self.base_url, json={'url': url})
        return res.status_code

    def test_valid_url_protocols(self) -> None:
        urls = ['https://github.com', 'http://google.com']

        expected_status = 200
        for url in urls:
            with self.subTest(url=url):
                status = self.get_mini_url(url)
                self.assertEqual(expected_status, status)

    def test_invalid_url_protocols(self) -> None:
        urls = [
            'htp://google.com', 'ssh://google.com', 'google.com',
            'http//google.com', 'https:/google.com', r'https:\\google.com'
        ]
        expected_status = 422
        for url in urls:
            with self.subTest(url=url):
                status = self.get_mini_url(url)
                self.assertEqual(expected_status, status)


if __name__ == '__main__':
    unittest.main()
