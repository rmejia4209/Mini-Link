import re

url_pattern = r"^https?:\/\/.*"


def get_url_pattern_match(txt: str) -> str:
    """Returns the regex match from the defined url pattern"""
    return re.findall(url_pattern, txt)[0]
