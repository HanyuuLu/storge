import pyttsx3
import re
from bs4 import BeautifulSoup
import urllib.request

# coding=utf-8
#!/usr/bin/env python3

# from urllib.request import urlopen


def voice(engine, date, win, temp, weather):
    print(date)
    print('天气：' + weather)
    print('最低温度：' + temp[5:8])
    print('最高温度：' + temp[1:4])
    print('风级：' + win)
    print('\n')

    engine.say(date)
    engine.say('天气：' + weather)
    if temp[5:8] != '':
        engine.say('最低温度：' + temp[5:8])
    if temp[1:4] != '':
        engine.say('最高温度：' + temp[1:4])
    engine.say('风级小于：' + win[1:4])
    engine.runAndWait()


def parse_weather_infor(url):

    # add a headers to simulate as a web browser
    headers = ("User-Agent",
               "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) "
               "Chrome/61.0.3163.100 Safari/537.36")
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]

    resp = opener.open(url).read()

    soup = BeautifulSoup(resp, 'html.parser')

    # get current date
    tagDate = soup.find('ul', class_="t clearfix")

    # dates = tagDate.h1.string
    tgs = soup.findAll('h1', tagDate)
    dates = tgs[0:7]

    for d in range(len(dates)):

        print(dates[d].getText())

    tagAllTem = soup.findAll('p', class_="tem")  # get all weather information:

    tagAllWea = soup.findAll('p', class_="wea")

    tagAllWin = soup.findAll('p', class_="win")

    # pyttsx module initial:
    engine = pyttsx3.init()
    """ RATE"""
    rate = engine.getProperty(
        'rate')   # getting details of current speaking rate
    # printing current voice rate
    print(f"default rate:{rate}, set rate to {175}")
    engine.setProperty('rate', 175)     # setting up new voice rate

##
    """VOLUME"""
    volume = engine.getProperty(
        'volume')  # getting to know current volume level (min=0 and max=1)
    print(volume)  # printing current volume level
    # setting up volume level  between 0 and 1
    engine.setProperty('volume', 1.0)

##    """VOICE"""
##    voices = engine.getProperty('voices')       #getting details of current voice
##    #engine.setProperty('voice', voices[0].id)  #changing index, changes voices. o for male
##    engine.setProperty('voice', voices[1].id)   #changing index, changes voices. 1 for female

    # get location
    location = soup.find('div', class_='crumbs fl')
    text = location.getText()

    # now start voicing:

    print('以下播报' + str(text.split(">")[2]) + '未来7天天气情况......')
    engine.say('以下播报' + str(text.split(">")[2]) + '未来7天天气情况')

    engine.runAndWait()

    # 3 days later
    for k in range(len(dates)):
        voice(engine, dates[k].getText(), tagAllWin[k].i.string,
              tagAllTem[k].getText(), tagAllWea[k].string)

    engine.say('天气播报完毕')
    engine.runAndWait()


if __name__ == "__main__":

    # get city website from ww.weather.com
    url = 'http://www.weather.com.cn/weather/101210101.shtml'

    parse_weather_infor(url)
