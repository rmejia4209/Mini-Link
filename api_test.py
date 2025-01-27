import unittest
from utils import get_url_pattern_match


class RegexUnitTest(unittest.TestCase):

    def test_valid_url_protocols(self):
        """
        Test if the regex correcly matches URL's with the correct protocol.
        """
        samples = ['http://google.com', 'https://google.com']
        for sample in samples:
            with self.subTest(sample=sample):
                self.assertEqual(get_url_pattern_match(sample), sample)

    def test_invalid_url_protocols(self):
        """
        Test if the regex does not match URL's with incorrect protocols
        """
        samples = [
            'htp://google.com', 'ssh://google.com', 'google.com',
            'http//google.com', 'https:/google.com', r'https:\\google.com'
            ]
        for sample in samples:
            with self.subTest(sample=sample):
                self.assertFalse(get_url_pattern_match(sample))

    def test_invalid_authority(self):

        samples = [
            'https:///google.com', 'https://user:password@google.com',
            'http://google/notallowed.com', 'http://google@notallowed.com',
            'http://google?notallowed.com', 'http://google#notallowed.com'
        ]
        for sample in samples:
            with self.subTest(sample=sample):
                self.assertFalse(get_url_pattern_match(sample))


if __name__ == '__main__':
    unittest.main()
