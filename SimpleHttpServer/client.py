import requests
if __name__ == '__main__':
    d = {"hi": 123}
    requests.post("http://localhost:8000", data=d)
