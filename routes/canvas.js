import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const profile = async (username, avatarUrl, isPremium = false) => {
const canvas = createCanvas(1280, 480);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1D1D1D';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = isPremium ? '#FFD700' : '#C0C0C0';
ctx.lineWidth = 8;
ctx.beginPath();
ctx.arc(240, 240, 130, 0, Math.PI * 2);
ctx.stroke();
const avatar = await loadImage(avatarUrl);
ctx.save();
ctx.beginPath();
ctx.arc(240, 240, 120, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();
ctx.drawImage(avatar, 120, 120, 240, 240);
ctx.restore();
registerFont(path.join(__dirname, 'THEBOLDFONT-FREEVERSION.ttf'), { family: 'Bold' });
ctx.font = '50px Bold';
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = 'center';
ctx.fillText(username.toUpperCase(), 700, 260);
const textWidth = ctx.measureText(username.toUpperCase()).width;
ctx.strokeStyle = isPremium ? '#FFD700' : '#C0C0C0';
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(700 - textWidth / 2, 270); 
ctx.lineTo(700 + textWidth / 2, 270); 
ctx.stroke();
ctx.font = '35px Bold';
ctx.fillStyle = '#A0A0A0';
const now = new Date();
const day = now.toLocaleDateString("en-US", { weekday: "long" });
const time = now.toLocaleTimeString("en-US", {
hour: "2-digit",
minute: "2-digit",
second: "2-digit",
hour12: false
});
const buttonColor = isPremium ? '#FFD700' : '#C0C0C0'; 
const textColor = isPremium ? '#000000' : '#FFFFFF'; 
ctx.fillStyle = buttonColor;
ctx.fillRect(160, 400, 180, 60);  
ctx.font = '30px Bold';
ctx.fillStyle = textColor;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(isPremium ? 'PREMIUM' : 'FREE', 250, 430);
ctx.globalAlpha = 0.3;
ctx.font = '20px Bold';
ctx.fillStyle = '#A0A0A0';
ctx.fillText('https://satzzdev.xyz', 1150, 455);
ctx.globalAlpha = 1;
return canvas.toBuffer('image/png');
};

const wordWrap = (text, ctx, maxWidth) => {
const words = text.split(' ');
let lines = [];
let currentLine = '';
for (let i = 0; i < words.length; i++) {
const testLine = currentLine + words[i] + ' ';
const testWidth = ctx.measureText(testLine).width;
if (testWidth > maxWidth && currentLine !== '') {
lines.push(currentLine);
currentLine = words[i] + ' ';
} else {
currentLine = testLine;
}
}
lines.push(currentLine); 
return lines;
};

export const selfReminder = async (quote) => {
const canvas = createCanvas(1080, 1080); 
const ctx = canvas.getContext('2d');
try {
registerFont(path.join(__dirname, 'FingerPaint-Regular.ttf'), { family: 'Finger' });
} catch (err) {
console.error('Font registration failed', err);
}
ctx.fillStyle = '#F6F6EE'; 
ctx.fillRect(0, 0, canvas.width, canvas.height);
const garisImage = await loadImage(path.join(__dirname, 'garis.png')); 
const garisWidth = 500;
const garisHeight = 500;
const  garisX = (canvas.width -  garisWidth) / 2;
const  garisY = (canvas.height -  garisHeight) / 2 - -200; 
ctx.drawImage( garisImage,  garisX,  garisY,  garisWidth,  garisHeight);
const bungaImage = await loadImage(path.join(__dirname, 'bunga.png')); 
const bungaWidth = 300;
const bungaHeight = 300;
const bungaX = (canvas.width - bungaWidth) / 2;
const bungaY = (canvas.height - bungaHeight) / 2 - -450; 
ctx.drawImage(bungaImage, bungaX, bungaY, bungaWidth, bungaHeight);
ctx.font = '67px "Finger Paint"';  
ctx.fillStyle = '#000000';
ctx.textAlign = 'center';
const wrappedQuote = wordWrap(quote, ctx, canvas.width - 40);  
const quoteY = 500;
wrappedQuote.forEach((line, index) => {
ctx.fillText(line, canvas.width / 2, quoteY + (index * 75)); 
});
ctx.font = '30px "Open Sans"';
ctx.fillStyle = '#737373';
ctx.fillText(`[ SELF REMINDER ]`, canvas.width / 2, 100); 
const buffer = canvas.toBuffer('image/png');
return buffer
};