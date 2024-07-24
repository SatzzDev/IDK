/*
this script created by:
  
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/ 
                   __/ |                                      
                  |___/       

Social Media:
https://github.com/SatzzDev
https://instagram.com/kurniawan_Satria__
*/
//━━━━━━━━━━━━━━━[ PACKAGE ]━━━━━━━━━━━━━━━━━//
import { Router } from 'express';
import cors from 'cors';
import secure from 'ssl-express-www';
import path from 'path';
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import nulish from 'nulis'
import JXR from 'jxr-canvas';
import gtts from 'node-gtts';


//━━━━━━━━━━━━━━━[ ROUTER ]━━━━━━━━━━━━━━━━━//
const router = new Router();

//━━━━━━━━━━━━━━━[ DIRECTORY SETUP ]━━━━━━━━━━━━━━━━━//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//━━━━━━━━━━━━━━━[ FETCH JSON FUNCTION ]━━━━━━━━━━━━━━━━━//
const fetchJson = async (url, options) => {
try {
options ? options : {};
const res = await axios({ method: "GET", url: url, headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"}, ...options});
return res.data;
} catch (err) {
return err;
}
};


async function fetchAsupanVideo() {
while (true) {
const { asupan } = await import('./asupan.js');
const result = await asupan();
const videoUrl = result.videoSrc;

try {
const response = await axios.head(videoUrl);

if (response.headers['content-type'].startsWith('video/')) {
return videoUrl;
}
} catch (error) {
console.error(`Failed to fetch from ${videoUrl}:`, error);
}
}
}
async function fetchRandomVideo() {
while (true) {
const { randomVid } = await import('./asupan.js');
const result = await randomVid('https://urlebird.com/id/user/ph0nk0ne/')
const videoUrl = result[Math.floor(Math.random() * result.length)];;
try {
const response = await axios.head(videoUrl);
if (response.headers['content-type'].startsWith('video/')) {
return videoUrl;
}
} catch (error) {
console.error(`Failed to fetch from ${videoUrl}:`, error);
}
}
}
//━━━━━━━━━━━━━━━[ ROUTES ]━━━━━━━━━━━━━━━━━//
// Route definitions
router.get('/tts', async (req, res) => {
  let { text } = req.query;

  const tts = (text) => {
    return new Promise((resolve, reject) => {
      try {
        const tts = new gtts(text, 'id');
        const filePath = path.join(__dirname, `${Date.now()}.wav`);
        tts.save(filePath, async () => {
          const data = await fs.readFile(filePath);
          resolve(data);
          await fs.unlink(filePath);
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  try {
    const audioBuffer = await tts(text);
    res.set('Content-Type', 'audio/wav');
    res.send(audioBuffer);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send(`Error processing text-to-speech: ${error.message}`);
  }
});
router.get("/thmb", async(req,res) => {
    let img = [
               "https://i.pinimg.com/originals/4c/7f/b6/4c7fb6fa1a8a49f8e14dc02a7cbe3860.jpg",
               "https://i.pinimg.com/originals/6e/5d/71/6e5d71ae714f3d40795d919c3d8aa40a.jpg",
               "https://i.pinimg.com/originals/44/cb/ff/44cbff62271f1f860b3ec3a3f9834ef4.jpg",
               "https://i.pinimg.com/originals/3c/86/4e/3c864e50a0fb0bd36731398329da1321.jpg",
               "https://i.pinimg.com/originals/f4/38/42/f4384252d7be1a98b27d116e69308397.jpg",
               "https://i.pinimg.com/originals/7f/4e/77/7f4e77dbfdd04b979ad38239d02b0ce8.jpg",
               "https://i.pinimg.com/originals/65/fa/04/65fa04f58f9a102ccd36046eee3101b7.jpg",
               "https://i.pinimg.com/originals/af/4c/68/af4c685f1671e00b6c1b33fdd0f6cc96.jpg",
              ]
    let reu = img[Math.floor(Math.random() * img.length)];
    const response = await axios.get(reu, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    res.set({"Content-Type": "image/jpeg", "Content-Length": buffer.length, "Cache-Control": "public, max-age=31536000"});
    res.send(buffer);
})
router.get("/jadwal-sholat", async (req, res) => {
    let { kota } = req.query;
    if (!kota) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter kota"});
    const { findKodeDaerah, jadwalSholat } = (await import("./jadwal-sholat.js"));
    let kd = await findKodeDaerah(kota);
    let riss = await jadwalSholat(kd.kode_daerah);
    res.json(riss);
});

router.get("/quran-surah", async (req, res) => {
    let { nomor } = req.query;
    if (!nomor) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter nomor surah, cth: ?nomor=1"});
    let riss = await fetchJson(`https://raw.githubusercontent.com/SatzzDev/API/master/data/quranaudio.json`);
    let data = riss.filter((item) => item.number === parseInt(nomor));
    res.json({status: true, creator: "SatzzDev", data});
});

router.get("/quran-ayat", async (req, res) => {
    let { surah, ayat } = req.query;
    if (!surah || !ayat) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter nomor surah dan ayat, cth: ?surah=17&ayat=32"});
    let riss = await fetchJson(`https://raw.githubusercontent.com/SatzzDev/API/master/surah/surah%20${parseInt(surah)}.json`);
    let data = riss.ayat.filter((item) => item.no === parseInt(ayat));
    res.json({status: true, creator: "SatzzDev", data});
});

router.get("/hadist", async (req, res) => {
    let { query, nomor } = req.query;
    if (!query || !nomor) return res.json({status: false, creator: "SatganzDevs", message: "Insert parameter query hadist dan nomor hadist, exempli gratia: ?query=abu-daud&nomor=32, lista query: abu-daud, ahmad, bukhari, darimi, ibnu-majah, malik, muslim, nasai, tirmidzi"});
    let riss = await fetchJson(`https://raw.githubusercontent.com/SatzzDev/API/master/hadis/hadis%20${query}.json`);
    if (parseInt(nomor) > riss.available) return res.json({status: false, creator: "SatganzDevs", message: `nomor hadist tidak tersedia, nomor yang tersedia adalah ${riss.available}`});
    let data = riss.hadits.filter((item) => item.number === parseInt(nomor));
    res.json({status: true, creator: "SatzzDev", data});
});

router.get("/renungan", async (req, res) => {
    let riss = await fetchJson(`https://raw.githubusercontent.com/SatzzDev/API/master/data/renungan.json`);
    let imageUrl = riss[Math.floor(Math.random() * riss.length)];
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    res.set({"Content-Type": "image/jpeg", "Content-Length": buffer.length, "Cache-Control": "public, max-age=31536000"});
    res.send(buffer);
});

router.get("/nulis", async (req, res) => {
    let { text, nama, kelas, hari, tanggal } = req.query;
    if (!text || !nama || !kelas || !hari || !tanggal) {
        return res.json({ status: false, creator: 'SatzzDev', message: 'input parameter text nama kelas hari tanggal, contoh: ?text=hello&nama=satzz&kelas=1&hari=senin&tanggal=1' });
    }
    try {
        if (fs.exists(path.join(__dirname, `../hasil.jpg`))) {
        fs.unlink(path.join(__dirname, `../hasil.jpg`))
    }
        const mager = await new nulish.nulis();
        const image = await mager.buku1(text, nama, kelas, hari, tanggal);
        const imagePath = path.join(__dirname, `../hasil.jpg`);
        const response = await fs.readFile(imagePath);
        const buffer = Buffer.from(response, "binary");
        res.set({"Content-Type": "image/jpeg"});
        res.send(buffer);
        await fs.unlink(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error generating image' });
    }
});


router.get("/welcome", async (req, res) => {
  const { username, guildname, guildicon, membercount, avatar, background } = req.query;
  if (!username || !guildname || !guildicon || !membercount || !avatar) return res.json({ status: false, creator: 'SatzzDev', message: 'input parameter username guildname guildicon membercount avatar, contoh: ?username=Satzz&guildname=Siesta - MD&guildicon=&membercount=1&avatar=1' });
  try {
    const image = await new JXR.Welcome()
      .setUsername(username)
      .setGuildName(guildname)
      .setGuildIcon(guildicon)
      .setMemberCount(membercount)
      .setAvatar(avatar)
      .setBackground(background || "https://telegra.ph/file/c792631587035c6cd185e.jpg")
      .toAttachment();
    const buffer = image.toBuffer();
    res.set({ "Content-Type": "image/jpeg"});
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error generating image' });
  }
});

router.get("/goodbye", async (req, res) => {
  const { username, guildname, guildicon, membercount, avatar, background } = req.query;
  if (!username || !guildname || !guildicon || !membercount || !avatar) return res.json({ status: false, creator: 'SatzzDev', message: 'input parameter username guildname guildicon membercount avatar, contoh: ?username=Satzz&guildname=Siesta - MD&guildicon=&membercount=1&avatar=1' });
  try {
    const image = await new JXR.Goodbye()
      .setUsername(username)
      .setGuildName(guildname)
      .setGuildIcon(guildicon)
      .setMemberCount(membercount)
      .setAvatar(avatar)
      .setBackground(background || "https://telegra.ph/file/c792631587035c6cd185e.jpg")
      .toAttachment();
    const buffer = image.toBuffer();
    res.set({ "Content-Type": "image/jpeg"});
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error generating image' });
  }
});

router.get("/gura", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.json({ status: false, creator: 'SatzzDev', message: 'input parameter username' });
  try {
    const image = await new JXR.Gura()
      .setName(username)
      .toAttachment();
    const buffer = image.toBuffer();
    res.set({ "Content-Type": "image/jpeg"});
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error generating image' });
  }
});

router.get("/wallpaper", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ status: false, creator: 'SatzzDev', message: 'Masukkan parameter query contoh: ?query=anime' });
  try {
    const response = await axios.get(`https://www.wallpaperflare.com/search?wallpaper=${query}&mobile=ok`);
    const $ = cheerio.load(response.data);
    const urls = [];
    $('li[itemprop="associatedMedia"]').each((index, element) => {
      const url = $(element).find('a').attr('href') + '/download';
      if (url) urls.push(url);
    });
    const updatedUrls = [];
    for (const i of urls) {
      const res = await axios.get(i);
      const _$ = cheerio.load(res.data);
      const imgUrl = _$('#show_img').attr('src');
      updatedUrls.push(imgUrl);
    }
    res.json({ status: true, creator: 'SatzzDev', result: updatedUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error fetching wallpapers' });
  }
});

router.get("/pitutur", async (req, res) => {
    let { q } = req.query;
    if (!q) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter q"});
    let { pitutur } = (await import("./berita.js"));
    let riss = await pitutur(q);
    res.json(riss);
});

router.get("/igdl", async (req, res) => {
    let { url } = req.query;
    if (!url) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter url!"});
    let { instaDL } = (await import("./snapinsta.js"));
    let riss = await instaDL(url);
    res.json(riss);
});

router.get("/ttdl", async (req, res) => {
    let { url } = req.query;
    if (!url) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter url!"});
    let { loveTik } = (await import("./lovetik.js"));
    let riss = await loveTik(url);
    res.json(riss);
});

router.get("/xnxxsearch", async (req, res) => {
    let { query } = req.query;
    if (!query) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter query!"});
    let { xnxxsearch } = (await import("./xnxx.js"));
    let riss = await xnxxsearch(query);
    res.json(riss);
});

router.get("/xnxxdl", async (req, res) => {
    let { url } = req.query;
    if (!url) return res.json({status: false, creator: "SatganzDevs", message: "Masukkan parameter url!"});
    let { xnxxdl } = (await import("./xnxx.js"));
    let riss = await xnxxdl(url);
    res.json(riss);
});

router.get('/storyanime', async (req, res) => {
    try {
        const users = [
            'https://tikgun.com/username/6778941734242534405',
            'https://tikgun.com/username/6880202540139856898',
        ];
        const usr = users[Math.floor(Math.random() * users.length)];
        const rez = await axios.get(usr);
        const $ = cheerio.load(rez.data);
        const videoUrls = $('video source').map((i, el) => $(el).attr('src')).get();
        const result = videoUrls[Math.floor(Math.random() * videoUrls.length)];
        // Mengambil video dari URL
        const response = await axios({
            url: result,
            method: 'GET',
            responseType: 'stream'
        });

        // Mengatur header dan mengirimkan video
        res.set({
            "Content-Type": "video/mp4",
            "Content-Disposition": "inline"
        });

        // Mengalirkan konten video ke respons
        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while processing request');
    }
});

router.get('/storymusic', async (req, res) => {
    try {
        const videoUrl = await fetchRandomVideo();

        // Mengambil video dari URL
        const response = await axios({
            url: videoUrl,
            method: 'GET',
            responseType: 'stream'
        });

        // Mengatur header dan mengirimkan video
        res.set({
            "Content-Type": "video/mp4",
            "Content-Disposition": "inline"
        });

        // Mengalirkan konten video ke respons
        response.data.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while processing request');
    }
});

router.get('/asupan', async (req, res) => {
    try {
        const videoUrl = await fetchAsupanVideo();

        // Mengambil video dari URL
        const response = await axios({
            url: videoUrl,
            method: 'GET',
            responseType: 'stream'
        });

        // Mengatur header dan mengirimkan video
        res.set({
            "Content-Type": "video/mp4",
            "Content-Disposition": "inline"
        });

        // Mengalirkan konten video ke respons
        response.data.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while processing request');
    }
});

router.get("/random/:type", async (req, res) => {
    const type = req.params.type;
    let url = `https://raw.githubusercontent.com/SatzzDev/API/master/data/${type}.json`;
    let datas = await fetchJson(url);
    if (type === "asmaulhusna") {
        let { q } = req.query;
        if (!q) return res.json({status: false, creator: "SatganzDevs", message: "Insert parameter query index, example: ?q=1"});
        if (parseInt(q) > 99) return res.json({status: false, creator: "SatganzDevs", message: `kristen ya?`});
        let data = datas.filter((item) => item.index === parseInt(q));
        res.json({status: true, creator: "SatzzDev", data});
    } else {
        let data = datas[Math.floor(Math.random() * datas.length)];
        res.json({status: true, creator: "SatzzDev", data});
    }
});

router.get("/games/:game", async (req, res) => {
    const game = req.params.game;
    const url =`https://raw.githubusercontent.com/SatzzDev/API/master/games/${game}.json`;
    let datas = await fetchJson(url);
    let data = datas.result[Math.floor(Math.random() * datas.result.length)];
    res.json({status: true, creator: "SatzzDev", data});
});

//━━━━━━━━━━━━━━━[ END ]━━━━━━━━━━━━━━━━━//
export default router;
