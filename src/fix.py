import re
path = r"C:\Users\PRESTIGE\.gemini\antigravity-ide\scratch\eco-sports-ishlab-chiqarish\src\app.js"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

c = re.sub(r'\\`', '`', c)
c = re.sub(r'\\\$', '$', c)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
