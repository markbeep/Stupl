import json
with open("../data/lectures.json", "r") as f:
    data = json.load(f)

k = {}

for l in data:
    k[l["category"]] = True

print(k.keys())
