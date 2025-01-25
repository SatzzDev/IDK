import puppeteer from "puppeteer";
import { exec } from "node:child_process";
import { promisify } from "node:util";

export async function brat(text) {
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome',
args: ["--no-sandbox", "--disable-setuid-sandbox","--disable-gpu"]
});

const page = await browser.newPage();
await page.setViewport({width: 1080, height: 1080, deviceScaleFactor: 2});
try {
await page.goto(`https://www.bratgenerator.com`, {
waitUntil: "networkidle2"});
await page.click("#toggleButtonWhite");
await page.evaluate(() => {
const inputElement = document.querySelector("#textInput");
if (inputElement) {
inputElement.value = '';
}
});
await page.type("#textInput", text, { delay: 100 });
const memeContainer = await page.$("#textOverlay");
let screenshotBuffer = await memeContainer.screenshot();
return screenshotBuffer;
} catch (error) {
console.error("Error:", error.message);
throw error;
} finally {
await browser.close();
}
}
