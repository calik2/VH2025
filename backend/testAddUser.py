import requests

url = "http://localhost:3000/api/addUser"

data = {
    "isMentor": False,
    "Name": "Rhea Shetti",
    "Hobbies": "coding, F1 racing",
    "Values": "work-life balance, continuous learning",
    "Preferences": {"adviceType": 0, "communicationStyle": 0, "engagement": 5, "student": True, "values": 1},
    "LinkedIn": "https://linkedin.com/in/rheashetti"
}

response = requests.post(url, json=data)

print("Status code:", response.status_code)
print("Response JSON:", response.json())
