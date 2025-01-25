import { browser } from '../../index.js'

export async function nulis(nama, tanggal, text) {
const page = await browser.newPage();
await page.setViewport({width: 1080, height: 1080, deviceScaleFactor: 2});
try {
await page.goto(`https://ahmadghozali-xyz.github.io`, {waitUntil: "networkidle2",timeout: 60000});
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
