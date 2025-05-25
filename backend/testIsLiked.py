import requests

url = "http://localhost:3000/api/getIsLiked"
params = { "USER_ID": 2 }  # passed in URL query string

data = {
    "otherUser": "4"
}

response = requests.put(url, json=data, params=params)

print("Status code:", response.status_code)
try:
    print("Response JSON:", response.json())
except ValueError:
    print("Response is not JSON:", response.text)
