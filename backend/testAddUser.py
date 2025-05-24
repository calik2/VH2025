import requests

url = "http://localhost:3000/api/addUser"
params = { "USER_UID": "JFcolJgrT1W0vNyeXPgAdS0yLNN2" }


data = {
    "isMentor": True,
    "isStudent": True,
    "Name": "Rhea Shetti",
    "Hobbies": "coding, F1 racing",
    "Values": "work-life balance, continuous learning",
    "Preferences": {"adviceType": 0, "communicationStyle": 0, "engagement": 5, "student": True, "values": 1},
    "LinkedIn": "https://linkedin.com/in/rheashetti",
}

response = requests.post(url, json=data, params=params)

print("Status code:", response.status_code)
print("Response JSON:", response.json())
