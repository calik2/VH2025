import requests

url = "http://localhost:3000/api/updateUser"
params = { "USER_ID": 2 }  # passed in URL query string

data = {
    "Hobbies": "baking, crafting",
    "LinkedIn": "www.linkedin.com/in/emily-ktom",
    "isMentor": False,
    "Values": "not community"
}

response = requests.put(url, json=data, params=params)

print("Status code:", response.status_code)
try:
    print("Response JSON:", response.json())
except ValueError:
    print("Response is not JSON:", response.text)
