import puppeteer from "puppeteer";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import axios from 'axios';



export async function soundcloud(url) {
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome',
args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
const page = await browser.newPage();
try {
await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
await page.goto(`https://soundcloudtool.com`, { waitUntil: "networkidle2", timeout: 60000 });
await page.type("#urlInput", url, { delay: 100 });
await Promise.all([
page.click("#submitBtn"),
page.waitForNavigation({ waitUntil: "networkidle2", timeout: 60000 }) 
]);
const userData = await page.evaluate(() => ({
title: document.querySelector(".info p")?.innerText || null,
cover: document.querySelector(".thumb.mb-4 img")?.src || null,
url: document.querySelector("#trackLink")?.href || null,
}));
return { status: true, creator: '@krniwnstria', ...userData };
} catch (error) {
return {
status:false,
creator:'@krniwnstria',
message:error.message
}
} finally {
await browser.close();
}
}

export const soundcloudSearch = async (query) => {
try {
let res = await axios.get('https://proxy.searchsoundcloud.com/tracks?q=' + query.replace(/ /g, '+'));
let final = res.data.collection.map(track => ({
title: track.title,
author: track.user.username,
url: track.permalink_url,
artwork: track.artwork_url,
duration: millisecondsToTime(track.duration),
playback_count: formatNumber(track.playback_count),
total_likes: formatNumber(track.likes_count),
created_at: track.created_at,
}));
return {
status:true,
creator:'@krniwnstria',
result_count: final.length,
result:final
};
} catch (error) {
return {
status:false,
creator:'@krniwnstria',
message:error.message
}
}
};





function millisecondsToTime(milli){
var milliseconds = milli % 1000;
var seconds = Math.floor((milli / 1000) % 60);
var minutes = Math.floor((milli / (60 * 1000)) % 60);
return minutes + ":" + seconds;
}
function formatNumber(num){ 
if(num >= 1e6) return (num/1e6).toFixed(1) + 'M'; 
if(num >= 1e3) return (num/1e3).toFixed(1) + 'K'; 
return num; 
}