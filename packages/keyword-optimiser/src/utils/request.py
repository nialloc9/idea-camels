import requests, json

url = 'https://www.w3schools.com/python/demopage.php'
myobj = {'somekey': 'somevalue'}

x = requests.post(url, json = myobj)

def post(url, data):
    json_string = json.dumps(data)
    json_data = json.loads(json_string)

    return requests.post(url, json = json_data)