import requests

url = "http://localhost:3000/api/signUp"

data = {
    "uid": "JFcolJgrT1W0vNyeXPgAdS0yLNN2",
}

response = requests.post(url, json=data)

print("Status code:", response.status_code)
print("Response JSON:", response.json())
