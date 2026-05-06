import os
import re
import json

base_dir = r"c:\Users\lhx06\Downloads\555"
html_path = os.path.join(base_dir, "index.html")

categories = ['場景插畫', '法國麵包', '精緻頭像', '胸像橫插', '蝴蝶餅', '鬆餅', '麵包籃']
images_data = []

for cat in categories:
    cat_path = os.path.join(base_dir, cat)
    if os.path.exists(cat_path):
        for fname in os.listdir(cat_path):
            if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                rel_path = f"{cat}/{fname}"
                images_data.append({"src": rel_path, "category": cat})

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <div class="gallery-nav">...</div>
nav_replacement = '<div class="gallery-nav" id="gallery-nav">\n            <!-- Dynamically generated -->\n        </div>'
content = re.sub(r'<div class="gallery-nav">.*?</div>', nav_replacement, content, flags=re.DOTALL)

# Replace <div class="gallery-grid">...</div>
grid_replacement = '<div class="gallery-grid" id="gallery-grid">\n            <!-- Dynamically generated -->\n        </div>'
content = re.sub(r'<div class="gallery-grid">.*?</div>', grid_replacement, content, flags=re.DOTALL)

js_data = json.dumps(images_data, ensure_ascii=False)

js_code = f"""
    <script>
        const galleryItems = {js_data};
        
        function renderGallery() {{
            const nav = document.getElementById('gallery-nav');
            
            // Generate nav buttons including All
            const categories = ['All 🌟', ...new Set(galleryItems.map(item => item.category))];
            
            nav.innerHTML = categories.map(cat => 
                `<button class="neu-button" onclick="filterGallery('${{cat}}')" style="margin: 0 5px;">${{cat}}</button>`
            ).join('');
            
            // Render initial state
            filterGallery('All 🌟');
        }}

        function filterGallery(category) {{
            const grid = document.getElementById('gallery-grid');
            const filtered = category === 'All 🌟' 
                ? galleryItems 
                : galleryItems.filter(item => item.category === category);
                
            grid.innerHTML = filtered.map(item => `
                <div class="gallery-item" data-category="${{item.category}}" style="padding: 0; overflow: hidden; background: var(--cookie-color); border-radius: 20px; box-shadow: inset 5px 5px 10px var(--dark-shadow), inset -5px -5px 10px var(--light-shadow); break-inside: avoid; margin-bottom: 25px;">
                    <img src="${{item.src}}" alt="${{item.category}}" style="width: 100%; height: auto; display: block; border-radius: 20px; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
                </div>
            `).join('');
        }}
        
        document.addEventListener('DOMContentLoaded', renderGallery);
    </script>
</body>
"""

content = content.replace("</body>", js_code)

masonry_css = """        .gallery-grid {
            column-count: 3;
            column-gap: 25px;
            width: 100%;
        }
        @media (max-width: 900px) {
            .gallery-grid {
                column-count: 2;
            }
        }
        @media (max-width: 600px) {
            .gallery-grid {
                column-count: 1;
            }
        }
"""

content = re.sub(r'\.gallery-grid\s*\{[^}]*\}', masonry_css, content)

# Remove the .gallery-item and .gallery-item:hover css blocks since we put inline styles on JS to preserve structure neatly without conflicts.
content = re.sub(r'\.gallery-item\s*\{[^}]*\}', '', content)
content = re.sub(r'\.gallery-item:hover\s*\{[^}]*\}', '', content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Updated {html_path} with {len(images_data)} images.")
