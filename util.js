import puppeteer from "puppeteer";

export async function carbonSH(codeSnippet) {
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome' ,//'/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium', //,
args:["--no-sandbox", "--disable-setuid-sandbox"]});
const theme = "Verminal"; // Theme for Carbon
const page = await browser.newPage();
await page.setViewport({width: 1080, height: 1080, deviceScaleFactor: 2});
await page.goto("https://carbon.now.sh/xsP2TOBZdgtM0krXAZPZ", { waitUntil: "networkidle2" });
await page.evaluate((code) => {
const editor = document.querySelector(".CodeMirror");
const editorInstance = editor.CodeMirror;
editorInstance.setValue(code);
}, codeSnippet);
await page.click("[data-cy=theme-selector-button]");
await page.waitForSelector("[data-cy=dropdown-item]");
await page.evaluate((themeName) => {
const items = Array.from(document.querySelectorAll("[data-cy=dropdown-item]"));
const target = items.find(item => item.textContent.trim().toLowerCase() === themeName.toLowerCase());
if (target) target.click();
}, theme);
//await new Promise(resolve => setTimeout(resolve, 100));
const codeBlock = await page.$(".container-bg");
let screenshotBuffer = null;
if (codeBlock) {
screenshotBuffer = await codeBlock.screenshot();
console.log(`Screenshot captured as buffer.`);
} else {
console.log("Code block not found!");
}

await browser.close();
return screenshotBuffer;
}


  