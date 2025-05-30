import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
import { carbonSH } from "./util.js";



//━━━━━━━━━━━━━━━[ App Configuration ]━━━━━━━━━━━━━━━━━//
app.set("port", process.env.PORT || 80);
//━━━━━━━━━━━━━━━[ Middleware ]━━━━━━━━━━━━━━━━━//
app.enable('trust proxy');
app.set("json spaces", 2);
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//━━━━━━━━━━━━━━━[ Server Initialization ]━━━━━━━━━━━━━━━━━//
app.listen(app.get("port"), async() => {
console.log("RUNNING!")
});
//━━━━━━━━━━━━━━━[ Home ]━━━━━━━━━━━━━━━━━//
app.get('/', (req, res) => {
res.send('Hello World!')
})
//━━━━━━━━━━━━━━━[ Carbon API ]━━━━━━━━━━━━━━━━━//
app.get('/carbon', async (req, res) => {
const codeSnippet = req.query.code;
const buffer = await carbonSH(codeSnippet);
res.set({
"Content-Type": "image/jpeg",
"Content-Length": buffer.length
});
res.end(buffer);
})
//━━━━━━━━━━━━━━━[ Cookie API ]━━━━━━━━━━━━━━━━━//
app.get('/get-info', async (req, res) => {
const url = req.query.url
if (!url) return res.status(400).json({ error: 'url wajib di query (?url=...)' })
try {
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome' ,//'/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium', //,,
args: ['--no-sandbox', '--disable-setuid-sandbox']
})
const page = await browser.newPage()
let responseHeaders = {}
// intercept first response to get headers
page.on('response', async (res) => {
if (res.url() === url) {
responseHeaders = res.headers()
}
})
await page.goto(url, { waitUntil: 'networkidle2' })
const cookies = await page.cookies()

await browser.close()
res.json({ headers: responseHeaders, cookies })
} catch (err) {
console.error(err)
res.status(500).json({ error: 'gagal ambil headers/cookies' })
}
})