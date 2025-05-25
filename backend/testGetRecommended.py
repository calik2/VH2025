import requests

url = "http://localhost:3000/api/getRecommended"

USER_ID = 2

params = {'USER_ID': USER_ID}

response = requests.get(url, params=params)

print("Status code:", response.status_code)
print("Response JSON:", response.json())

