import requests

url = "http://localhost:3000/api/likeUser"
params = { "USER_ID": 2 }  # passed in URL query string

data = {
    "likedUser": "1"
}

response = requests.put(url, json=data, params=params)

print("Status code:", response.status_code)
try:
    print("Response JSON:", response.json())
except ValueError:
    print("Response is not JSON:", response.text)
