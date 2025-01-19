import puppeteer from 'puppeteer';
import axios from 'axios';
import qs from 'querystring';
import fs from 'fs'
import { exec } from "node:child_process";
import { promisify } from "node:util";
import * as cheerio from 'cheerio';
import FormData from 'form-data';
import yts from "yt-search";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Agent from 'fake-user-agent'
import path from 'path'
import { fileURLToPath } from 'url';
import CryptoJS from "crypto-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//━━━━━━━━━━━━━━━[ AI ]━━━━━━━━━━━━━━━━━//
export const SatzzAI = async(text) => {
const apiKey = 'AIzaSyDkOQDRZgySOEDYBr7-aMjVYeY-GCjF_ys';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
model: "gemini-1.5-pro",
});
const generationConfig = {
temperature: 1,
topP: 0.95,
topK: 40,
maxOutputTokens: 8192,
responseMimeType: "text/plain",
};
const chatSession = model.startChat({
generationConfig,
history: [
{
role: "user",
parts: [
{text: "kamu adalah SatzzDev. seorang programmer yang berasal dari Pekanbaru, Indonesia. Ia adalah seorang pengembang API yang fokus pada efisiensi dan kemudahan integrasi. Dengan keahlian dalam menggunakan Express.js dan EJS, SatzzDev sering membangun aplikasi web dinamis yang memanfaatkan JSON sebagai database, yang disimpan dan dikelola melalui GitHub.\n\nSelain itu, ia memiliki dedikasi terhadap praktik terbaik dalam pengembangan perangkat lunak, termasuk dokumentasi API yang jelas dan struktur kode yang rapi. Sebagai seorang pengembang, SatzzDev bersemangat untuk terus belajar dan berbagi pengetahuannya dengan komunitas teknologi.\n"},
],
},
],
});
const result = await chatSession.sendMessage(text);
return result.response.text()
}
//━━━━━━━━━━━━━━━[ END OF AI ]━━━━━━━━━━━━━━━━━//

//━━━━━━━━━━━━━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━//

function getYouTubeVideoId(url) {
const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|embed\/|user\/[^\/\n\s]+\/)?(?:watch\?v=|v%3D|embed%2F|video%2F)?|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]{11})/;
const match = url.match(regex);
return match ? match[1] : null;
}

export const search = async (teks) =>{
try {
let data = await yts(teks);
return {
status: true,
creator: "@krniwnstria",
results: data.all.filter(res => res.type == "video")
};
} catch (error) {
return {
status: false,
message: error.message
};
}
}

const audio = ["92", "128", "256", "320"]
const video = ["144", "360", "480", "720", "1080"]

async function savetube(link, quality, value) {
try {
const headers = {
accept: '*/*',
referer: 'https://yt.savetube.me/',
origin: 'https://yt.savetube.me/',
'user-agent': 'Postify/1.0.0',
'Content-Type': 'application/json'
};
const umber = [51,54,61,63]
const cdnNumber = umber[Math.floor(Math.random() * umber.length)]
const cdnUrl = `cdn${cdnNumber}.savetube.su`;
const videoInfoResponse = await axios.post(
`https://${cdnUrl}/info`, {
url: link
}, {
headers: {
...headers,
authority: `cdn${cdnNumber}.savetube.su`
}
}
);
const videoInfo = videoInfoResponse.data.data;
const type = value == 1 ? "audio" : 'video'
const body = {
downloadType: type,
quality,
key: videoInfo.key
};
const downloadResponse = await axios.post(
`https://${cdnUrl}/download`,
body, {
headers: {
...headers,
authority: `cdn${cdnNumber}.savetube.su`
}
}
);
const downloadData = downloadResponse.data.data;
return {
status: true,
quality: value == 1 ? `${quality}kbps` : `${quality}p`,
availableQuality: value == 1 ? audio : video,
url: downloadData.downloadUrl,
filename: (`${videoInfo.title}`) + (value == 1 ? ` (${quality}kbps).mp3` : ` (${quality}p).mp4`)
};
} catch (error) {
return {
status: false,
message: error.message
}
}
}


export const ytmp3 = async(link, formats = 128) => {
const videoId = getYouTubeVideoId(link);
const format = audio.includes(formats) ? formats : 128
if (!videoId) {
return {
status: false,
message: "Invalid YouTube URL"
};
}
try {
let data = await yts("https://youtube.com/watch?v=" + videoId);
let response = await savetube("https://youtube.com/watch?v=" + videoId, format, 1)
if (!response.status) {
response = await savetube("https://youtube.com/watch?v=" + videoId, format, 1)
}
if (!response.status) {
response = await savetube("https://youtube.com/watch?v=" + videoId, format, 1)
}
return {
status: true,
creator: "@krniwnstria",
metadata: data.all[0],
download: response
};
} catch (error) {
console.log(error)
return {
status: false,
message: error.response ? `HTTP Error: ${error.response.status}` : error.message
};
}
}

export const ytmp4 = async(link, formats = 360) => {
const videoId = getYouTubeVideoId(link);
const format = video.includes(formats) ? formats : 360
if (!videoId) {
return {
status: false,
message: "Invalid YouTube URL"
};
}
try {
let data = await yts("https://youtube.com/watch?v=" + videoId);
let response = await savetube("https://youtube.com/watch?v=" + videoId, format, 0)
if (!response.status) {
response = await savetube("https://youtube.com/watch?v=" + videoId, format, 0)
}
if (!response.status) {
response = await savetube("https://youtube.com/watch?v=" + videoId, format, 0)
}
return {
status: true,
creator: "@krniwnstria",
metadata: data.all[0],
download: response
};
} catch (error) {
console.log(error)
return {
status: false,
message: error.response ? `HTTP Error: ${error.response.status}` : error.message
};
}
}

export const transcript = async(link) => {
try {
const response = await axios.get('https://ytb2mp4.com/api/fetch-transcript', {
params: {
'url': link
},
headers: {
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
'Referer': 'https://ytb2mp4.com/youtube-transcript'
}
});
return {
status: true,
creator: "@krniwnstria",
transcript: response.data.transcript
}
} catch (error) {
return {
status: false,
message: error.message
}
}
}




const retatube = {
getPrefix: async () => {
try {
const { data } = await axios.get('https://retatube.com/api/v1/aio/index?s=retatube.com', {
headers: { 'User-Agent': 'Postify/1.0.0' }
});
const prefix = cheerio.load(data)('input[name="prefix"]').val();
if (!prefix) throw new Error('Waduh, prefix nya kagak ada nih bree.. Input manual aja yak Prefix nya');
return prefix;
} catch (error) {
console.error(error.message);
throw error;
}
},

request: async (prefix, vidLink) => {
try {
const p = new URLSearchParams({ prefix, vid: vidLink }).toString();
const { data } = await axios.post('https://retatube.com/api/v1/aio/search', p, {
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
'User-Agent': 'Postify/1.0.0',
}
});

const ext = (regex) => (data.match(regex) || [])[1] || '';
const fans = ext(/<p><strong>Fans：<\/strong>(\d+)/);
const views = ext(/<p><strong>Views:：<\/strong>(\d+)/);
const shares = ext(/<p><strong>Shares：<\/strong>(\d+)/);

const $ = cheerio.load(data);
const ex = $('div.icon-box').map((_, element) => {
const title = $(element).find('strong:contains("Title")').text().replace('Title：', '').trim();
const owner = $(element).find('strong:contains("Owner")').parent().text().replace('Owner：', '').trim();
const image = $(element).find('img').attr('src');

const dlink = $('a.button.primary.expand')
.map((_, el) => {
const link = $(el).attr('href');
if (link === 'javascript:void(0);') return null;
const teks = $(el).find('span').text().replace('Download', '').trim().toLowerCase()
.replace(/[\(\)]/g, '').replace(/\s+/g, '_')
.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
return { title: teks, link };
})
.get()
.filter(Boolean);

return { title, owner, fans, views, shares, image, dlink };
}).get();

return ex;
} catch (error) {
console.error(error.message);
throw error;
}
},

scrape: async (vidLink) => {
try {
const prefix = await retatube.getPrefix();
return await retatube.request(prefix, vidLink);
} catch (error) {
console.error(error.message);
throw error;
}
}
};


const getCookiesAndUserAgent = async (url) => {
// const { stdout: chromiumPath } = await promisify(exec)("which chromium").catch(() => '/usr/bin/google-chrome');
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome',
args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });
const cookies = await page.cookies();
const userAgent = await page.evaluate(() => navigator.userAgent);
const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
await browser.close();
return { cookieHeader, userAgent };
};

export async function removebg(buffer) {
const { cookieHeader, userAgent } = await getCookiesAndUserAgent('https://photobackgroundremover.com');
const Satzz = await testFetch()
const keynya = JSON.parse(Satzz)
const formData = new FormData();
formData.append('image', buffer, { filename: 'image.png', contentType: 'image/png' });
formData.append('amtext', encodeURIComponent(keynya.amtext)); 
formData.append('iavmol', encodeURIComponent(keynya.iavmol)); 
formData.append('slamltol', encodeURIComponent(keynya.slam_ltol))
try {
const response = await axios.post(
'https://photobackgroundremover.com/wp-content/plugins/remove_background/requests/image_background_removal.php',
formData,
{
headers: {
...formData.getHeaders(),
'Cookie': cookieHeader,
'Origin':'https://photobackgroundremover.com',
'Refer':'https://photobackgroundremover.com/',
'Sec-Ch-Ua':'"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
'Sec-Ch-Ua-Mobile':'?0',
'Sec-Ch-Ua-Platform':'"Windows"',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'same-origin',
'User-Agent': userAgent,
'X-Requested-With':'XMLHttpRequest'
},
}
);
return {
author: "@krniwnstria",
status: response.status,
url:response.data.output.url,
};
} catch (error) {
return {
author: "@krniwnstria",
status: error.response?.status || 500,
data: error.response?.data || error.message
};
}
}



function cyphereddata(t, r="cryptoJS") {
t = t.toString();
var e = CryptoJS.lib.WordArray.random(256)
, a = CryptoJS.lib.WordArray.random(16)
, i = CryptoJS.PBKDF2(r, e, {
hasher: CryptoJS.algo.SHA512,
keySize: 8,
iterations: 999
})
, n = CryptoJS.AES.encrypt(t, i, {
iv: a
});
return JSON.stringify({
amtext: CryptoJS.enc.Base64.stringify(n.ciphertext),
slam_ltol: CryptoJS.enc.Hex.stringify(e),
iavmol: CryptoJS.enc.Hex.stringify(a)
})
}


async function testFetch() {
try {
let t = await fetch("https://photobackgroundremover.com/wp-content/plugins/remove_background/unix.php");
if (t.ok) {
let r = await t.text();
return cyphereddata(r)
}
throw Error("Error: " + t.status)
} catch (e) {
throw Error("Request failed: " + e.message)
}
}

//━━━━━━━━━━━━━━━[ END OF DOWNLOADER ]━━━━━━━━━━━━━━━━━//
