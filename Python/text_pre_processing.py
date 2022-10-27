import re

def sanitize(text, **kwargs):
    text = text.replace('\xa0', ' ')
    text = remove_special_chars(text)
    words = text.split()
    for idx, word in enumerate(words):
        if not re.search('^[0-9]{1,2}\.$', word):
            words[idx] = word.strip()
        else:
            words[idx] = ''
    return " ".join([word for word in words if word])


def remove_special_chars(text):
    text = text.replace('\xa0', ' ')
    list_ = list(text)
    for idx, c in enumerate(list_):
        if not re.search(r'[A-Za-z0-9,/\s\.-]', c):
            list_[idx] = ' '
    return " ".join([w.strip() for w in ''.join(list_).split()])


def strip_spaces_linebreaks(text):
    sents = text.split('\n')
    text = " ".join([s.strip() for s in sents])
    sents = text.split('\\n')
    text = " ".join([s.strip() for s in sents])
    return text.strip()


if __name__=='__main__':
    with open('text.txt',  encoding="utf8") as file:
        data = file.read()
        data1 = strip_spaces_linebreaks(data)
        data2 = remove_special_chars(data1)
        # data = sanitize(data)
    with open("sanitized.docx", 'w', encoding='utf8') as file2:
        file2.write(data2)
