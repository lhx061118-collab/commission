import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

const categories = ['場景插畫', '法國麵包', '精緻頭像', '胸像橫插', '蝴蝶餅', '鬆餅', '麵包籃'];
const baseDir = process.cwd();
const thumbnailsDir = path.join(baseDir, 'thumbnails');

async function processImage(category, filename) {
    const inputPath = path.join(baseDir, category, filename);
    const outputDir = path.join(thumbnailsDir, category);
    const outputPath = path.join(outputDir, filename);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        const statsIn = fs.statSync(inputPath);
        const originalSizeKB = (statsIn.size / 1024).toFixed(1);

        // If thumbnail already exists, check if we should skip
        if (fs.existsSync(outputPath)) {
            const statsOut = fs.statSync(outputPath);
            // If original is older than thumbnail, skip
            if (statsIn.mtimeMs <= statsOut.mtimeMs) {
                console.log(`[SKIP] ${category}/${filename} (Thumbnail already exists, size: ${(statsOut.size / 1024).toFixed(1)} KB)`);
                return;
            }
        }

        console.log(`[PROCESS] ${category}/${filename} (${originalSizeKB} KB)`);
        const image = await Jimp.read(inputPath);
        
        let w = image.bitmap.width;
        let h = image.bitmap.height;
        const maxDim = 600;

        if (w > maxDim || h > maxDim) {
            if (w >= h) {
                h = Math.round(h * (maxDim / w));
                w = maxDim;
            } else {
                w = Math.round(w * (maxDim / h));
                h = maxDim;
            }
            image.resize({ w, h });
        }

        // Determine if jpeg/jpg or png
        const lowerName = filename.toLowerCase();
        let options = {};
        if (lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) {
            options = { quality: 75 };
        }

        await image.write(outputPath, options);
        
        const statsOut = fs.statSync(outputPath);
        const newSizeKB = (statsOut.size / 1024).toFixed(1);
        const ratio = ((1 - (statsOut.size / statsIn.size)) * 100).toFixed(1);
        
        console.log(`[SUCCESS] Saved to thumbnails/${category}/${filename} (${newSizeKB} KB) - Reduced by ${ratio}%`);
    } catch (err) {
        console.error(`[ERROR] Failed to process ${category}/${filename}:`, err.message);
    }
}

async function main() {
    console.log("Starting thumbnail generation...");
    let totalFiles = 0;
    
    for (const cat of categories) {
        const catPath = path.join(baseDir, cat);
        if (fs.existsSync(catPath)) {
            const files = fs.readdirSync(catPath);
            for (const file of files) {
                const lowerName = file.toLowerCase();
                if (lowerName.endsWith('.png') || 
                    lowerName.endsWith('.jpg') || 
                    lowerName.endsWith('.jpeg') || 
                    lowerName.endsWith('.gif')) {
                    
                    await processImage(cat, file);
                    totalFiles++;
                }
            }
        }
    }
    console.log(`Thumbnail generation finished. Total files processed/checked: ${totalFiles}`);
}

main();
