import cheerio from 'cheerio';
import got from 'got';
import axios from "axios"

async function downloadUrlebird(URL) {
try {
const response = await got(URL);
const $ = cheerio.load(response.body);
const videoURL = $('meta[property="og:video"]').attr('content');
return videoURL;
} catch (error) {
throw new Error(error.message);
}
}

export async function randomVid(URL) {
try {
const response = await got(URL);
const $ = cheerio.load(response.body);
const results = [];
const htmlSegment = response.body.split('<div class="col-md-12 text-center text-md-left p-2 pl-md-5 pl-0" id="thumbs">')[1]
.split('<div class="row">\n<div class="col-md-12 mt-1 justify-content-center text-center">')[0];
const $segment = cheerio.load(htmlSegment);
$segment('div.thumb.wc .info3').each((index, element) => {
const links = $(element).find('a');
if (links.length > 1) {
const href = links.eq(1).attr('href');
if (href && href.includes('.com/id/video/')) {
results.push(href);
}
}
});
let result = []
for (const u of results) {
result.push(await downloadUrlebird(u))
}
return result;
} catch (error) {
throw new Error(error.message);
}
}


// randomVid('https://urlebird.com/id/user/ph0nk0ne/')
// .then(console.log)
// .catch(console.error);

export const asupan = async() => {
try {
const usernames = [
"kkara000",
"initokyolagii",
"amnddiah_",
"oliviapaytenn",
"zqya_a",
"risti_aprilianti",
"vfyourzaa",
"capeudah123",
"vicidior9051"
];
const username =
usernames[Math.floor(Math.random() * usernames.length)];
const stalkResponse = await got(
`https://urlebird.com/user/${username}/`,
);
const stalkHtml = stalkResponse.body;
const $stalk = cheerio.load(stalkHtml);
const linkVideo = [];
const udahAda = {};
$stalk(".thumb.wc a[href*='video/']").each((index, element) => {
const href = $stalk(element).attr("href");
if (!udahAda[href]) {
    linkVideo.push(href);
udahAda[href] = true;
}
});
const randomIndex = Math.floor(Math.random() * linkVideo.length);
const randomVideoLink = linkVideo[randomIndex] || linkVideo[0];
if (!randomVideoLink) {
throw new Error("No video link found");
}
const videoSrc = await downloadUrlebird(randomVideoLink);
if (!videoSrc) {
throw new Error("Video src not found");
}
return {
creator: "SatzzDev.",
videoSrc: videoSrc,
};
} catch (error) {
console.error("Error in asupan request:", error.message);
throw new Error(`Request failed: ${error.message}`);
}
}
asupan().then(console.log).catch(console.error);
