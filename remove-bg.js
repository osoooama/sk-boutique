const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Install jimp if not present
try {
    require('jimp');
} catch (e) {
    console.log("Installing jimp locally...");
    execSync('npm install jimp@0.16.1', { stdio: 'inherit' });
}

const Jimp = require('jimp');

async function processLogo() {
    const inputPath = 'C:\\Users\\osama\\Desktop\\100\\89.jpg';
    const outputPathWhite = 'public\\assets\\logo_white.png';
    const outputPathGold = 'public\\assets\\logo_gold.png';

    console.log(`Reading logo from: ${inputPath}`);
    const image = await Jimp.read(inputPath);
    
    // Create white version and gold version
    const imageWhite = image.clone();
    const imageGold = image.clone();

    // Gold color tokens
    const goldR = 207; // #cfa850
    const goldG = 168;
    const goldB = 80;

    // Scan pixels
    imageWhite.scan(0, 0, imageWhite.bitmap.width, imageWhite.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // Calculate brightness
        const brightness = (r + g + b) / 3;
        
        if (brightness > 220) {
            // White background -> Make transparent
            this.bitmap.data[idx + 3] = 0;
        } else {
            // Dark foreground -> Make crisp white
            // Retain some antialiasing by blending alpha based on darkness
            const darkness = 255 - brightness;
            this.bitmap.data[idx + 0] = 245; // #f5f5f7
            this.bitmap.data[idx + 1] = 245;
            this.bitmap.data[idx + 2] = 247;
            this.bitmap.data[idx + 3] = Math.min(255, darkness * 1.5);
        }
    });

    imageGold.scan(0, 0, imageGold.bitmap.width, imageGold.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        const brightness = (r + g + b) / 3;
        
        if (brightness > 220) {
            this.bitmap.data[idx + 3] = 0;
        } else {
            const darkness = 255 - brightness;
            this.bitmap.data[idx + 0] = goldR;
            this.bitmap.data[idx + 1] = goldG;
            this.bitmap.data[idx + 2] = goldB;
            this.bitmap.data[idx + 3] = Math.min(255, darkness * 1.5);
        }
    });

    // Write output images
    await imageWhite.writeAsync(outputPathWhite);
    await imageGold.writeAsync(outputPathGold);
    console.log(`Saved transparent white logo to: ${outputPathWhite}`);
    console.log(`Saved transparent gold logo to: ${outputPathGold}`);
}

processLogo().catch(err => {
    console.error("Error processing image:", err);
});
