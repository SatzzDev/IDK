import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const versus = async (
leftUsername,
rightUsername,
leftAvatarUrl,
rightAvatarUrl,
) => {
const canvas = createCanvas(1280, 720);
const ctx = canvas.getContext("2d");
// Background
ctx.fillStyle = "#1C2333";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Aura dan Border untuk Left Avatar
ctx.save();
ctx.shadowColor = "#FF0000"; 
ctx.shadowBlur = 20;
ctx.strokeStyle = "#FF0000";
ctx.lineWidth = 8;
ctx.beginPath();
ctx.arc(320, 360, 140, 0, Math.PI * 2);
ctx.stroke();
ctx.restore();
// Left Avatar Image
const leftAvatar = await loadImage(leftAvatarUrl);
ctx.save();
ctx.beginPath();
ctx.arc(320, 360, 130, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();
ctx.drawImage(leftAvatar, 190, 230, 260, 260);
ctx.restore();
// Aura dan Border untuk Right Avatar
ctx.save();
ctx.shadowColor = "#0000FF"; 
ctx.shadowBlur = 20;
ctx.strokeStyle = "#0000FF";
ctx.lineWidth = 8;
ctx.beginPath();
ctx.arc(960, 360, 140, 0, Math.PI * 2);
ctx.stroke();
ctx.restore();
// Right Avatar Image
const rightAvatar = await loadImage(rightAvatarUrl);
ctx.save();
ctx.beginPath();
ctx.arc(960, 360, 130, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();
ctx.drawImage(rightAvatar, 830, 230, 260, 260);
ctx.restore();
// Font Registration
registerFont(path.join(__dirname, "../assets/fonts/THEBOLDFONT-FREEVERSION.ttf"), {
family: "Bold",
});
// Left Username
ctx.font = "40px Bold";
ctx.fillStyle = "#FF0000";
ctx.textAlign = "center";
ctx.fillText(leftUsername.toUpperCase(), 320, 550);
// Right Username
ctx.font = "40px Bold";
ctx.fillStyle = "#0000FF";
ctx.textAlign = "center";
ctx.fillText(rightUsername.toUpperCase(), 960, 550);
// VS Icon
const vsIcon = await loadImage(path.join(__dirname, "../assets/images/versus.png"));
const vsWidth = 150;
const vsHeight = 150;
const vsX = canvas.width / 2 - vsWidth / 2;
const vsY = canvas.height / 2 - vsHeight / 2;
ctx.drawImage(vsIcon, vsX, vsY, vsWidth, vsHeight);
// Footer Text
ctx.globalAlpha = 0.3;
ctx.font = "20px Bold";
ctx.fillStyle = "#A0A0A0";
ctx.fillText("Created By SatzzDev", canvas.width - 115, canvas.height - 20);
ctx.globalAlpha = 1;
return canvas.toBuffer("image/png");
};
export const profile = async (username, avatarUrl, isPremium = false, isOwner = false) => {
const canvas = createCanvas(1280, 480);
const ctx = canvas.getContext('2d');
// Background
ctx.fillStyle = '#1D1D1D';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Colors
const borderColor = isOwner ? '#FFC107' : isPremium ? '#FFC107' : '#C0C0C0';
const buttonColor = isOwner ? '#FFC107' : isPremium ? '#FFC107' : '#C0C0C0';
const textColor = isOwner || isPremium ? '#000000' : '#FFFFFF';
// Crown for Owner
if (isOwner) {
const crown = await loadImage(path.join(__dirname, '../assets/images/crown.png'));
const crownWidth = 100;
const crownHeight = 100;
const crownX = 240 - crownWidth / 2;
const crownY = 120 - crownHeight;
ctx.drawImage(crown, crownX, crownY, crownWidth, crownHeight);
}
// Avatar Border
ctx.strokeStyle = borderColor;
ctx.lineWidth = 8;
ctx.beginPath();
ctx.arc(240, 240, 125, 0, Math.PI * 2);
ctx.stroke();
// Avatar Image
const avatar = await loadImage(avatarUrl);
ctx.save();
ctx.beginPath();
ctx.arc(240, 240, 120, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();
ctx.drawImage(avatar, 120, 120, 240, 240);
ctx.restore();
// Font Registration
registerFont(path.join(__dirname, '../assets/fonts/THEBOLDFONT-FREEVERSION.ttf'), { family: 'Bold' });
// Username
ctx.font = '50px Bold';
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = 'center';
ctx.fillText(username.toUpperCase(), 700, 260);
const textWidth = ctx.measureText(username.toUpperCase()).width;
// Line Under Username
ctx.strokeStyle = borderColor;
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(700 - textWidth / 2, 270);
ctx.lineTo(700 + textWidth / 2, 270);
ctx.stroke();
// Verified Icon
if (isPremium || isOwner) {
const verified = await loadImage(path.join(__dirname, '../assets/images/verify.png'));
const logoX = 700 + textWidth / 2 + 10;
const logoY = 260 - 40;
ctx.drawImage(verified, logoX, logoY, 50, 50);
}
// Button
const buttonWidth = 220;
const buttonHeight = 60;
const buttonX = 130;
const buttonY = 400;
ctx.fillStyle = buttonColor;
ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
// Button Text
ctx.font = '30px Bold';
ctx.fillStyle = textColor;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(
isOwner ? 'OWNER' : isPremium ? 'PREMIUM' : 'FREE',
buttonX + buttonWidth / 2,
buttonY + buttonHeight / 2
);
// Border for Button
ctx.strokeStyle = borderColor;
ctx.lineWidth = 4;
ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
// Footer Text
ctx.globalAlpha = 0.3;
ctx.font = '20px Bold';
ctx.fillStyle = '#A0A0A0';
ctx.fillText('Created By SatzzDev', 1170, 465);
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
registerFont(path.join(__dirname, '../assets/fonts/FingerPaint-Regular.ttf'), { family: 'Finger' });
} catch (err) {
console.error('Font registration failed', err);
}
ctx.fillStyle = '#F6F6EE'; 
ctx.fillRect(0, 0, canvas.width, canvas.height);
const garisImage = await loadImage(path.join(__dirname, '../assets/images/garis.png')); 
const garisWidth = 500;
const garisHeight = 500;
const  garisX = (canvas.width -  garisWidth) / 2;
const  garisY = (canvas.height -  garisHeight) / 2 - -200; 
ctx.drawImage( garisImage,  garisX,  garisY,  garisWidth,  garisHeight);
const bungaImage = await loadImage(path.join(__dirname, '../assets/images/bunga.png')); 
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