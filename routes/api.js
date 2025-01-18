import { Router } from 'express';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import fs from 'fs';




//━━━━━━━━━━[ SCRAPER ]━━━━━━━━━━━━//
import { nulis } from './utils/nulis.js';
import { brat } from './utils/brat.js';
import pinterest from './utils/pinterest.js';
import { instaDL } from './utils/instagram.js';
import { soundcloud, soundcloudSearch } from './utils/soundcloud.js';
import { mediafire } from './utils/mediafire.js';
import { xnxxsearch, xnxxdl } from './utils/xnxx.js';
import { tiktokStalk } from './utils/tiktokStalk.js';
import { findKodeDaerah, jadwalSholat } from "./utils/jadwal-sholat.js";
import { ytmp3, ytmp4, transcript, upscaler, removebg, search, SatzzAI } from './utils/scrape.js';
import { spotifySearch, spotifydl } from './utils/spotify.js';
import {selfReminder, profile, versus} from './utils/canvas.js';
import {Welcome, Goodbye,  Gura, Gfx1, Gfx2, Gfx3, Gfx4, Gfx5 } from '@lyncx/canvas'
import {carbonSH} from './utils/puppeteer.js'
import yts from 'yt-search';
import { Upscale } from './utils/upscale.js';



const router = new Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




//━━━━━━━━━━[ FUNCTION ]━━━━━━━━━━━━//
const fetchJson = async (url) => {
try {
const res = await axios({method: "GET",url:url,headers: {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"}});
return res.data;
} catch (err) {
return err;
}
};
const getBuffer = async (url) => { 
try { 
const res = await axios({method: "get",url,headers:{ 'DNT':1,'Upgrade-Insecure-Request':1},responseType:'arraybuffer'}) 
return res.data 
} catch (err) { 
return err 
}
}













//━━━━━━━━━━[ START OF API GET ]━━━━━━━━━━━━//





//━━━━━━━━━━[ ALL MAKER ]━━━━━━━━━━━━//
router.get("/welcome", async (req, res) => {
try {
const { ppgc, ppuser, username, groupname, member } = req.query;
if (!ppgc) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter ppgc" });
if (!ppuser) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter ppuser" });
if (!username) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter username" });
if (!groupname) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter groupname" });
if (!member) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter member" });
const background = req.query.background || "https://r4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-01b69d213afe95f35634472bcdf74a70.jpg";
const image = await new Welcome().setUsername(username).setGuildName(groupname).setGuildIcon(ppgc).setMemberCount(member).setAvatar(ppuser).setBackground(background).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/goodbye", async (req, res) => {
try {
const { ppgc, ppuser, username, groupname, member } = req.query;
if (!ppgc) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter ppgc" });
if (!ppuser) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter ppuser" });
if (!username) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter username" });
if (!groupname) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter groupname" });
if (!member) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter member" });
const background = req.query.background || "https://r4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-01b69d213afe95f35634472bcdf74a70.jpg";
const image = await new Goodbye().setUsername(username).setGuildName(groupname).setGuildIcon(ppgc).setMemberCount(member).setAvatar(ppuser).setBackground(background).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/gura", async (req, res) => {
try {
let {text} = req.query;
if (!text) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text" });
const image = await new Gura().setName(text).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/gfx1", async (req, res) => {
try {
let {text} = req.query;
if (!text) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text" });
const image = await new Gfx1().setName(text).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/gfx2", async (req, res) => {
try {
let {text} = req.query;
if (!text) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text" });
const image = await new Gfx2().setName(text).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/gfx3", async (req, res) => {
try {
let {text1, text2} = req.query;
if (!text1 || !text2) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text1 dan text2" });
const image = await new Gfx3().setText1(text1).setText2(text2).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/gfx4", async (req, res) => {
try {
let {text1, text2} = req.query;
if (!text1 || !text2) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text1 dan text2" });
const image = await new Gfx4().setText1(text1).setText2(text2).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/gfx5", async (req, res) => {
try {
let {text} = req.query;
if (!text) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text" });
const image = await new Gfx5().setText(text).toAttachment();
const buffer = image.toBuffer();
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/self-reminder", async (req, res) => {
try {
let {text} = req.query;
if (!text) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text" });
const buffer = await selfReminder(text);
res.set({ "Content-Type": "image/png", "Content-Length": buffer.length });
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
});
router.get("/profile", async (req, res) => {
try {
let {username, avatar, isPremium, isOwner} = req.query;
if (!username || !avatar || !isPremium || !isOwner) return res.status(400).send({status: 400, message: "[ ! ] mising query parameter username, avatar, isPremium dan isOwner. contoh : ?username=username&avatar=avatar&isPremium=true&isOwner=true"});
const buffer = await profile(username, avatar, isPremium === 'true', isOwner === 'true');
res.set({"Content-Type": "image/png", "Content-Length": buffer.length});
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({status: 500, message: "Internal Server Error", error: error.message});
}
});
router.get("/bewan", async (req, res) => {
try {
let {player1, player2, avatar1, avatar2} = req.query;
if (!player1 || !player2 || !avatar1 || !avatar2) return res.status(400).send({status: 400, message: "[ ! ] mising query parameter player1, player2, avatar1 dan avatar2. contoh : ?player1=Udin&player2=Asep&avatar1=&avatar2="});
const buffer = await versus(player1, player2, avatar1, avatar2);
res.set({"Content-Type": "image/png", "Content-Length": buffer.length});
res.send(buffer);
} catch (error) {
console.error("Error:", error);
res.status(500).send({status: 500, message: "Internal Server Error", error: error.message});
}
});
router.get("/thmb", async (req, res) => {
const img = [
"https://i.pinimg.com/originals/8e/a6/27/8ea62747934dd13912a9027b37219907.jpg",
"https://i.pinimg.com/originals/ae/7e/3b/ae7e3bada352578068f2048283838941.jpg",
"https://i.pinimg.com/originals/c7/e9/ae/c7e9ae21404e5cc87ceccb591572de26.jpg",
"https://i.pinimg.com/originals/25/a7/fc/25a7fc44f70c2bac07bcb014e952f654.jpg",
"https://i.pinimg.com/originals/f5/39/73/f539739c594cb8bd9034d640d142d97e.jpg",
"https://i.pinimg.com/originals/7f/4e/77/7f4e77dbfdd04b979ad38239d02b0ce8.jpg",
"https://i.pinimg.com/originals/65/fa/04/65fa04f58f9a102ccd36046eee3101b7.jpg",
"https://i.pinimg.com/originals/af/4c/68/af4c685f1671e00b6c1b33fdd0f6cc96.jpg",
"https://i.pinimg.com/originals/25/a7/fc/25a7fc44f70c2bac07bcb014e952f654.jpg",
"https://i.pinimg.com/originals/d1/e1/8b/d1e18bb7e886fb399b04cb50c99aa4f2.jpg",
];
const randomImgUrl = img[Math.floor(Math.random() * img.length)];
try {
const response = await axios.get(randomImgUrl, { responseType: "arraybuffer" });
const buffer = Buffer.from(response.data, "binary");
res.set({
"Content-Type": "image/jpeg", 
"Content-Length": buffer.length
});
res.send(buffer);
} catch (error) {
console.error("Error fetching image:", error);
res.status(500).send("Failed to load image.");
}
});
router.get("/brat", async (req, res) => {
try {
const { text } = req.query;
if (!text) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "missing parameter text." });
const rs = await brat(text);
res.set({
"Content-Type": "image/jpeg",
"Content-Length": rs.length,
"Cache-Control": "public, max-age=31536000",
});
res.end(rs)
} catch (error) {
console.error("Error in /upscaler:", error.message);
res.status(500).json({ status: false, creator: "@krniwnstria", message: "Internal Server Error", error: error.message });
}
});
router.get("/nulis", async (req, res) => {
try {
const { nama, kelas, fakultas, text } = req.query;
if (!nama || !kelas || !text) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "missing parameter nama kelas and text. optional = fakultas=" });
const rs = await nulis(nama, kelas, fakultas ? fakultas :'',text);
res.set({
"Content-Type": "image/jpeg",
"Content-Length": rs.length,
"Cache-Control": "public, max-age=31536000",
});
res.end(rs)
} catch (error) {
console.error("Error in /upscaler:", error.message);
res.status(500).json({ status: false, creator: "@krniwnstria", message: "Internal Server Error", error: error.message });
}
});
router.get("/renungan", async (req, res) => {
let riss = JSON.parse(fs.readFileSync(path.join(__dirname, 'utils/data/renungan.json')))
let imageUrl = riss[Math.floor(Math.random() * riss.length)];
const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
const buffer = Buffer.from(response.data, "binary");
res.set({
"Content-Type": "image/jpeg",
"Content-Length": buffer.length,
"Cache-Control": "public, max-age=31536000",
});
res.send(buffer);
});
router.get("/couple", async (req, res) => {
let riss = JSON.parse(fs.readFileSync(path.join(__dirname, 'utils/data/couple.json')))
let {male, female} = riss.result[Math.floor(Math.random() * riss.result.length)];
res.json({
status:true,
creator:"@krniwnstria",
result:{
female,
male
}
})
});
router.get("/wallpaper/", async (req, res) => {
const { query, resolusi } = req.query
if (!query || !resolusi) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "[ ! ] mising query parameter query dan resolusi contoh: ?query=anime&resolusi=1612x720" })
const avaliableRes = ['2160x3840','1440x2560','1366x768','1080x1920','1024x600','960x544','800x1280','800x600','720x1280','540x960','480x854','480x800','360x640','320x480','320x240','240x400','240x320','3415x3415','2780x2780','3415x3415','2780x2780','1350x2400','1280x1280','938x1668','800x1420','800x1200','1600x1200','1400x1050','1280x1024','1280x960','1152x864','1024x768','3840x2400','3840x2160','2560x1600','2560x1440','2560x1080','2560x1024','2048x1152','1920x1200','1920x1080','1680x1050','1600x900','1440x900','1280x800','1280x720']
if (!avaliableRes.includes(resolusi)) return res.status(400).json({status:false, creator:"@krniwnstria", message:"Resolusi yang tersedia adalah: "+avaliableRes.join(", ")})
const { wallpaper } = await import("../routes/utils/wallpaper.js")
let r = await wallpaper(query, resolusi)
res.json(r)
})
router.get("/carbon", async (req, res) => {
let { code } = req.query;
if (!code)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: "[ ! ] mising query parameter code!",
});
let riss = await carbonSH(code);
res.set({
"Content-Type": "image/jpeg",
"Content-Length": riss.length,
"Cache-Control": "public, max-age=31536000",
});
res.end(riss)
});









//━━━━━━━━━━[ ALL AI ]━━━━━━━━━━━━//
router.get('/satzzAI', async(req, res) => {
try {
const { text } = req.query;
if (!text) return res.status(400).send({ status: 400, message: "[ ! ] mising query parameter text" });
const response = await SatzzAI(text);
res.status(200).json({
status: 200,
creator: "@krniwnstria",
result: response
});
} catch (error) {
console.error("Error:", error);
res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
}
})
router.get("/removebg", async (req, res) => {
try {
const { url } = req.query
if (!url) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "missing parameter url." })
const r = await removebg(url)
res.json(r)
} catch (error) {
console.error("Error in /removebg:", error.message)
res.status(500).json({ status: false, creator: "@krniwnstria", message: "Internal Server Error", error: error })
}
})
router.get("/upscaler", async (req, res) => {
try {
const { url } = req.query;
if (!url) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "missing parameter url." });
const b = await getBuffer(url)
const r = await Upscale(b);
res.set({ "Content-Type": "image/png", "Content-Length": r.length });
res.send(r);
} catch (error) {
console.error("Error in /upscaler:", error.message);
res.status(500).json({ status: false, creator: "@krniwnstria", message: "Internal Server Error", error: error.message });
}
});






//━━━━━━━━━━[ ALL ISLAMIC ]━━━━━━━━━━━━//
router.get("/jadwal-sholat", async (req, res) => {
let { kota } = req.query;
if (!kota)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: "[ ! ] mising query parameter kota",
});
let kd = await findKodeDaerah(kota);
let riss = await jadwalSholat(kd.kode_daerah);
res.json(riss);
});
router.get("/surah/:surah", async (req, res) => {
let { surah } = req.params;
if (!surah) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "Parameter 'surah' surah diperlukan. Contoh: /surah/17" });
let riss = JSON.parse(fs.readFileSync(path.join(__dirname, 'utils/data/quranaudio.json')))
let data = riss.filter((item) => item.number === parseInt(surah));
res.json({
status: true,
creator: "@krniwnstria",
data,
});
});
router.get("/surah-ayat/:surah/:ayat", async (req, res) => {
let { surah, ayat } = req.params;
if (!surah || !ayat)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message:
"[ ! ] mising query parameter nomor surah dan ayat, cth: /17/32",
});
let riss = await fetchJson(
`https://raw.githubusercontent.com/Jabalsurya2105/database/master/surah/surah%20${parseInt(surah)}.json`,
);
let data = riss.ayat.filter((item) => item.no === parseInt(ayat));
res.json({
status: true,
creator: "@krniwnstria",
data,
});
});
router.get("/hadist", async (req, res) => {
let { query, nomor } = req.query;
if (!query || !nomor)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message:
"Insert parameter query hadist dan nomor hadist, exempli gratia: ?query=abu  -daud&nomor=32, lista query: abu-daud, ahmad, bukhari, darimi, ibnu-majah, malik, muslim, nasai, tirmidzi",
});
let riss = await fetchJson(
`https://raw.githubusercontent.com/Jabalsurya2105/database/master/hadis/hadis%20${query}.json`,
);
if (parseInt(nomor) > riss.available)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: `nomor hadist tidak tersedia, nomor yang tersedia adalah ${riss.available}`,
});
let data = riss.hadits.filter((item) => item.number === parseInt(nomor));
res.json({
status: true,
creator: "@krniwnstria",
data,
});
});









//━━━━━━━━━━[ ALL SEARCH ]━━━━━━━━━━━━//
router.get("/yts", async(req, res) => {
var { query } = req.query;
if (!query) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter query.'})
let r = await search(query)
res.json(r)
})
router.get("/ytlist", async(req, res) => {
var { list } = req.query;
if (!list) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter list.'})
let r = await yts( { listId: list } )
res.json(r)
})
router.get("/ytplay", async(req, res) => {
var { query } = req.query;
if (!query) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter query.'})
let r1 = await search(query)
let r = await ytmp3(r1.results[0].url)
res.json(r)
})
router.get("/soundcloud", async(req, res) => {
var { query } = req.query;
if (!query) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter query.'})
let r = await soundcloudSearch(query)
res.json(r)
})
router.get("/spotify", async(req, res) => {
var { query } = req.query;
if (!query) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter query.'})
let r = await spotifySearch(query)
res.json(r)
})
router.get("/xnxxsearch", async (req, res) => {
let { query } = req.query;
if (!query)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: "[ ! ] mising query parameter query!",
});
let riss = await xnxxsearch(query);
res.json(riss);
});
router.get("/pinterest/:actions", async (req, res) => {
let { actions } = req.params
switch (actions) {
case 'search': {
let { query } = req.query
if (!query) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "[ ! ] missing query parameter query!" })
let r = await pinterest.search(query)
res.json(r)
break
}
case 'download': {
let { url } = req.query
if (!url) return res.status(400).json({ status: false, creator: "@krniwnstria", message: "[ ! ] missing query parameter url!" })
let r = await pinterest.download(url)
res.json(r)
break
}
default: {
res.status(400).json({ status: false, creator: "@krniwnstria", message: "[ ! ] Unknown action provided!" })
break
}
}
})









//━━━━━━━━━━[ ALL DOWNLOADER ]━━━━━━━━━━━━//
router.get("/ytmp3", async(req, res) => {
var { url } = req.query;
if (!url) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter url.'})
let r = await ytmp3(url)
res.json(r)
})
router.get("/ytmp4", async(req, res) => {
var { url } = req.query;
if (!url) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter url.'})
let r = await ytmp4(url)
res.json(r)
})
router.get("/spotifydl", async(req, res) => {
var { url } = req.query;
if (!url) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter url.'})
let r = await spotifydl(url)
res.json(r)
})
router.get("/spotplay", async(req, res) => {
var { query } = req.query;
if (!query) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter query.'})
let r = await spotifySearch(query)
let oi = await spotifydl(r.results[0].url)
if (oi.url ==='https://api.fabdl.comundefined') return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'error'})
let oii = await getBuffer(oi.url)
res.set({
"Content-Type": "audio/mp3",
"Content-Length": oii.length,
"Cache-Control": "public, max-age=31536000",
"Accept-Ranges": "bytes", 
});
res.end(oii) 
})
router.get("/igdl", async (req, res) => {
let { url } = req.query;
if (!url)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: "[ ! ] mising query parameter url!",
});
let riss = await instaDL(url);
res.json(riss);
});
router.get("/soundclouddl", async (req, res) => {
let { url } = req.query;
if (!url)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: "[ ! ] mising query parameter url!",
});
let riss = await soundcloud(url);
let be = await getBuffer(riss.url)
res.set({
"Content-Type": "audio/mp3",
"Content-Length": be.length,
"Cache-Control": "public, max-age=31536000",
"Accept-Ranges": "bytes", 
});
res.end(be)
});
router.get("/mediafire", async (req, res) => {
let { url } = req.query;
if (!url)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: "[ ! ] mising query parameter url!",
});
let riss = await mediafire(url);
res.json(riss);
});
router.get("/xnxxdl", async (req, res) => {
let { url } = req.query;
if (!url)
return res.status(400).json({
status: false,
creator: "@krniwnstria",
message: "[ ! ] mising query parameter url!",
});
let rissone = await xnxxdl(url);
let ro = await getBuffer(rissone.files.high ? rissone.files.high : rissone.files.low)
res.set({
"Content-Type": "video/mp4",
"Content-Length": ro.length,
"Cache-Control": "public, max-age=31536000",
"Accept-Ranges": "bytes", 
});
res.end(ro)
});









router.get("/ttstalk", async(req, res) => {
var { username } = req.query;
if (!username) return res.status(400).json({ status : false, creator : `@krniwnstria`, message: 'missing parameter username.'})
let r = await tiktokStalk(username)
res.json(r)
})





export default router
