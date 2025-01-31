import requests
import unittest


class RegexUnitTest(unittest.TestCase):
    base_url: str = 'http://localhost:8000/'

    def get_mini_url(self, url: str) -> int:
        """
        Returns the API's response status code for a post request with
        the given URL.
        """
        res = requests.post(self.base_url, json={'url': url})
        return res.status_code

    def check_results(self, urls: list[str], expected_status: int) -> None:
        """Test the given URL's against the expected status code"""
        for url in urls:
            with self.subTest(url=url):
                status = self.get_mini_url(url)
                self.assertEqual(expected_status, status)

    def test_valid_url_protocols(self) -> None:
        """Test URL's with valid protocols"""
        urls = ['https://github.com', 'http://google.com']
        expected_status = 200
        self.check_results(urls, expected_status)

    def test_invalid_url_protocols(self) -> None:
        """Test URL's with invalid protocols"""
        urls = [
            'htp://google.com', 'ssh://google.com', 'google.com',
            'http//google.com', 'https:/google.com', r'https:\\google.com'
        ]
        expected_status = 422
        self.check_results(urls, expected_status)

    def test_invalid_authority(self) -> None:
        """Test URL's with invalid authorities"""
        urls = [
            'https:///google.com', 'https://user:password@google.com',
            'http://google/notallowed.com', 'http://google@notallowed.com',
            'http://google?notallowed.com', 'http://google#notallowed.com'
        ]
        expected_status = 422
        self.check_results(urls, expected_status)

    def test_valid_domains(self) -> None:
        """Test URL's with valid domains"""
        urls = [
            'https://google.com', 'https://wikipedia.org',
            'https://php.net', 'https://snake.io',
            'https://oregonstate.edu', 'https://irs.gov'
        ]
        expected_status = 200
        self.check_results(urls, expected_status)

    def test_invalid_domains(self) -> None:
        """Test URL's with valid domains"""
        urls = [
            'https://google.comm', 'https://wikipedia.fr',
            'https://php.php', 'https://snake.oi',
            'https://oregonstate.osu', 'https://irs.goov'
        ]
        expected_status = 422
        self.check_results(urls, expected_status)


if __name__ == '__main__':
    unittest.main()
