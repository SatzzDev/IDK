import puppeteer from "puppeteer";
import { exec } from "node:child_process";
import { promisify } from "node:util";

export async function nulis(nama, tanggal, text) {
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome',
headless: true, // Ensures the browser runs without UI
args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-software-rasterizer"],
defaultViewport: { width: 1080, height: 1080, deviceScaleFactor: 2 }
});

const page = await browser.newPage();

// Disable loading unnecessary resources for faster loading
await page.setRequestInterception(true);
page.on('request', (request) => {
const resourceType = request.resourceType();
if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
request.abort(); // Skip images, stylesheets, and fonts
} else {
request.continue();
}
});

try {
// Go to the page and wait for specific elements to be loaded, not the entire page
await page.goto(`https://ahmadghozali-xyz.github.io`, { waitUntil: "domcontentloaded", timeout: 30000 });

// Set the input values
await page.type("#date", tanggal);
await page.type("#name", nama);
await page.type("#content", text);

// Capture the canvas element screenshot
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
