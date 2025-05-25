import requests

url = "http://localhost:3000/api/login"

params = {
    "USER_UID": "JFcolJgrT1W0vNyeXPgAdS0yLNN2",
}

response = requests.get(url, params=params)

print("Status code:", response.status_code)
print("Response JSON:", response.json())
