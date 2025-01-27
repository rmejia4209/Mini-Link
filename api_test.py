import unittest
from utils import get_url_pattern_match


class RegexUnitTest(unittest.TestCase):

    def test_url_protocol(self):
        """
        Test if the regex correcly matches the url's protocol
        """
        valid_samples = ['http://google.com', 'https://google.com']
        for sample in valid_samples:
            with self.subTest(sample=sample):
                self.assertEqual(get_url_pattern_match(sample), sample)


if __name__ == '__main__':
    unittest.main()
