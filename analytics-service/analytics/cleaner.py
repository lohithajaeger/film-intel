import re

def clean_comments(platforms):
    for platform in platforms:
        cleaned = []

        for comment in platform["comments"]:
            text = re.sub(r"[^\w\s]", "", comment.lower())
            cleaned.append(text)

        platform["comments"] = list(set(cleaned))

    return platforms