import requests
import re
import os
import multiprocessing
import time


class Worker(multiprocessing.Process):
    def __init__(self, url: str, counter: int)->None:
        self.url = url
        self.counter = counter
        self.finished = False
        self.processing = False
        super().__init__()

    def run(self):
        self.processing = True
        print(os.getpid(), self.url)
        if not re.match("^http", self.url):
            self.url = MAIN_PAGE+self.url
        try:
            res = requests.get(self.url)
            print("[%s]\t%s"%(res.status_code, self.url))
            fileName = '%s' % re.search(r'((?!/).)*$', self.url).group(0)
            with open(fileName, 'w') as w:
                w.write(fileName)
            if self.counter < MAX_DEEP:
                subList = (re.compile(r'href="([^"?]*)"')).findall(res.text)
                for task in subList:
                    hostList.append(Worker(task, self.counter + 1))
            print("[finished] %s" % self.url)
            self.finished = True
        except Exception as e:
            print("[error] %s \n %s" % (self.url,str(e)))
            self.finished = True
            # raise(e)


MAX_DEEP = 5
ON_WORKING = 0
MAX_WORK = 10
MAIN_PAGE = "https://robocode.sourceforge.io/docs/robocode/"
pages = [
    "overview-summary.html",
]
hostList = list()


def dash():
    global MAX_DEEP, MAX_WORK, ON_WORKING, MAIN_PAGE, pages, hostList
    for task in pages:
        hostList.append(Worker(task, 0))
    while (len(hostList) > 0):
        while (ON_WORKING >= MAX_WORK):
            for task in hostList[:]:
                if task.finished:
                    ON_WORKING -= 1
                    hostList.remove(task)
            time.sleep(0.5)
        for task in hostList:
            if not task.processing:
                if (ON_WORKING < MAX_WORK):
                    task.processing = True
                    task.start()
                    ON_WORKING += 1
        for task in hostList[:]:
            if task.finished:
                ON_WORKING -= 1
                hostList.remove(task)
        time.sleep(1)


if __name__ == '__main__':
    dash()

# res = list()
# loop = 0
# while loop < 10:
#     change = list()
#     for key, request in enumerate(pages):
#         res.append(requests.get(MAIN_PAGE+request))
#         print(request)
#         print(res[-1].status_code)
#         fileName = '%s' % re.search(r'((?!/).)*$', request).group(0)
#         print(fileName)
#         # pattern = re.compile(r'href="((?!").)*"')
#         pattern = re.compile(r'href="([^"?]*)"')
#         # s = pattern.finditer(res[0].text)
#         s = pattern.findall(res[0].text)
#         print(s)
#         # s = re.search(r'href="((?!").)*"', res[0].text)
#         # print([x.group() for x in s])
#         with open(fileName, 'w') as w:
#             w.write(res[0].text)
#         change.extend(s)
#     change = list(set(change))
#     pages = change
#     loop += 1
