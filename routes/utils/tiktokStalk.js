import puppeteer from "puppeteer";
import { exec } from "node:child_process";
import { promisify } from "node:util";

export async function tiktokStalk(username) {
const { stdout: chromiumPath } = await promisify(exec)("which chromium").catch(() => '/usr/bin/google-chrome');
const browser = await puppeteer.launch({
executablePath: 'chromiumPath.trim()',
args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
const page = await browser.newPage();
try {
await page.setUserAgent(
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
);
await page.goto(`https://tokviewer.net`, {
waitUntil: "networkidle2",
timeout: 60000, 
});
await page.waitForSelector(".search-form__input", { visible: true });
await page.type(".search-form__input", `${username}`, { delay: 100 });
await page.waitForSelector(".search-form__button", { visible: true });
await page.click(".search-form__button");
await page.waitForSelector(".user-info__username span", { visible: true });
await page.click(".profile-media-list__button--see-more")
const userData = await page.evaluate(() => {
const getText = (selector) => document.querySelector(selector)?.innerText || null;
const getSrc = (selector) => document.querySelector(selector)?.src || null;
const stats = Array.from(document.querySelectorAll(".stats.user-info__stats .stats__item")).map(item => {
return {
value: item.querySelector(".stats__value")?.innerText,
name: item.querySelector(".stats__name")?.innerText
};
});
const statsObj = {};
stats.forEach(stat => {
if (stat.name === "Likes") statsObj.likes = stat.value;
if (stat.name === "Follower") statsObj.followers = stat.value;
if (stat.name === "Following") statsObj.following = stat.value;
});
const recentVideo = Array.from(document.querySelectorAll(".profile-media-list__item")).map(item => {
const url = item.querySelector("a")?.href;
return { url };
});
return {
status: true,
creator:'@krniwnstria',
username: getText(".user-info__username span"),
profile_pic: getSrc(".avatar__wrapper img"),
stats: statsObj,
recentVideo
};
});
return userData;
} catch (error) {
console.error("Error:", error.message);
throw error;
} finally {
await browser.close();
}
}