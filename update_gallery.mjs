import fs from 'fs';
import path from 'path';

const baseDir = process.cwd();
const htmlPath = path.join(baseDir, 'gallery.html');

const categories = ['場景插畫', '法國麵包', '精緻頭像', '胸像橫插', '蝴蝶餅', '鬆餅', '麵包籃', '驚喜麵包'];
const imagesData = [];

for (const cat of categories) {
    const catPath = path.join(baseDir, cat);
    if (fs.existsSync(catPath)) {
        const files = fs.readdirSync(catPath);
        for (const fname of files) {
            const lower = fname.toLowerCase();
            if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.gif')) {
                const relPath = `${cat}/${fname}`;
                imagesData.push({ src: relPath, category: cat });
            }
        }
    }
}

// Preserve existing video entries (軟糖小人)
const videoCatPath = path.join(baseDir, '軟糖小人');
if (fs.existsSync(videoCatPath)) {
    const vfiles = fs.readdirSync(videoCatPath);
    for (const vname of vfiles) {
        if (vname.toLowerCase().endsWith('.mp4')) {
            imagesData.push({ src: `軟糖小人/${vname}`, category: '軟糖小人' });
        }
    }
}

if (!fs.existsSync(htmlPath)) {
    console.error(`Error: ${htmlPath} not found.`);
    process.exit(1);
}

let content = fs.readFileSync(htmlPath, 'utf-8');

// Replace galleryItems array in script
const jsData = JSON.stringify(imagesData, null, 4);
content = content.replace(/const galleryItems = \[[\s\S]*?\];/, `const galleryItems = ${jsData};`);

fs.writeFileSync(htmlPath, content, 'utf-8');
console.log(`Updated ${htmlPath} with ${imagesData.length} items.`);
