import re

url_pattern = r"^https?:\/\/[a-zA-Z0-9\-._~]+$"


def get_url_pattern_match(txt: str) -> str:
    """Returns the regex match from the defined url pattern"""
    results = re.findall(url_pattern, txt)
    return results[0] if results else ''