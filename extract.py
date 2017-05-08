from bs4 import BeautifulSoup
import requests


def get_soup(url):
    html = requests.get(url)
    text = html.text
    soup = BeautifulSoup(text, "html.parser")
    return soup


def get_flag(path):
    soup = get_soup('http://emojipedia.org' + path)
    article = soup.find("article")
    code = article.find("span", {"class": "emoji"}).text
    first = article.find("a")
    while not first["href"].startswith('/regional-indicator'):
        first = first.findNext("a")
    second = first.findNext("a")
    return "\"%s%s\": u\"%s\"," %(first.text[-1:], second.text[-1:], code)



# print (get_flag('/flag-for-andorra/'))
# print (get_flag('/flag-for-united-arab-emirates/'))


soup = get_soup('http://emojipedia.org/flags/')
e_list = soup.find("ul", {"class": "emoji-list"})
children = e_list.find_all('a')
for child in children:
    h = child['href']
    if h.startswith('/flag-for'):
        print(get_flag(h))