import puppeteer from "puppeteer";
import { exec } from "node:child_process";
import { promisify } from "node:util";

export async function nulis(nama, tanggal, text) {
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome',
args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

const page = await browser.newPage();
await page.setViewport({width: 1080, height: 1080, deviceScaleFactor: 2});
try {
await page.goto(`https://ahmadghozali-xyz.github.io`, {waitUntil: "networkidle2"});
await page.type("#date", tanggal);
await page.type("#name", nama);
await page.type("#content", text);
const memeContainer = await page.$("#defaultCanvas0");
let screenshotBuffer = await memeContainer.screenshot();
return screenshotBuffer;
} catch (error) {
console.error("Error:", error.message);
throw error;
} finally {
await browser.close();
}
}
