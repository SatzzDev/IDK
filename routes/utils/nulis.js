import puppeteer from "puppeteer";
import { exec } from "node:child_process";
import { promisify } from "node:util";

export async function nulis(nama,kelas,fakultas, text) {
const { stdout: chromiumPath } = await promisify(exec)("which chromium").catch(() => '/usr/bin/google-chrome');
const browser = await puppeteer.launch({
executablePath: chromiumPath.trim(),
args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

const page = await browser.newPage();
await page.setViewport({width: 1080, height: 1080, deviceScaleFactor: 2});
try {
await page.goto(`https://jnckmedia.com/nulis`, {
waitUntil: "networkidle2",
timeout: 60000,
});
await page.click('#date', { delay: 100 });
await page.waitForSelector('.datepicker');
//const today = new Date().getDate();
const todaySelector = `.datepicker .today`;
await page.click(todaySelector, { delay: 100 });
await page.type("#name", nama, { delay: 100 });
await page.type("#kelas", kelas, { delay: 100 });
await page.type("#fakultas", fakultas, { delay: 100 });
await page.type("#content", text, { delay: 100 });
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
