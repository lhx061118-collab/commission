import os
import re
import json

base_dir = os.getcwd()
html_path = os.path.join(base_dir, "gallery.html")

categories = ['場景插畫', '法國麵包', '精緻頭像', '胸像橫插', '蝴蝶餅', '鬆餅', '麵包籃']
images_data = []

for cat in categories:
    cat_path = os.path.join(base_dir, cat)
    if os.path.exists(cat_path):
        for fname in os.listdir(cat_path):
            if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                rel_path = f"{cat}/{fname}"
                images_data.append({"src": rel_path, "category": cat})

if not os.path.exists(html_path):
    print(f"Error: {html_path} not found.")
    exit(1)

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace galleryItems array in script
js_data = json.dumps(images_data, ensure_ascii=False)
content = re.sub(r'const galleryItems = \[.*?\];', f'const galleryItems = {js_data};', content, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Updated {html_path} with {len(images_data)} images.")
