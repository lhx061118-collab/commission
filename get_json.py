import os, json
base_dir = r"c:\Users\lhx06\OneDrive\桌面\555"
categories = ['場景插畫', '法國麵包', '精緻頭像', '胸像橫插', '蝴蝶餅', '鬆餅', '麵包籃']
images_data = []
for cat in categories:
    cat_path = os.path.join(base_dir, cat)
    if os.path.exists(cat_path):
        for fname in os.listdir(cat_path):
            if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                rel_path = f"{cat}/{fname}"
                images_data.append({"src": rel_path, "category": cat})

with open("out.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(images_data, ensure_ascii=False, indent=4))
