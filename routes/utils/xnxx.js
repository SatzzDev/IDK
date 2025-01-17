import axios from 'axios';
import * as cheerio from 'cheerio';


/* New Line */
export const xnxxsearch = (query) => {
return new Promise((resolve, reject) => {
const baseurl = "https://www.xnxx.com";
axios.get(`https://www.xnxx.com/search/${query}`).then((res) => {
let $ = cheerio.load(res.data, {
xmlMode: false,
});
let titles = [];
let urls = [];
let descs = [];
let results = [];
let tmb = []
$("div.mozaique").each(function (a, b) {
$(b)
.find("div.thumb")
.each(function (c, d) {
urls.push(
baseurl +
$(d).find("a").attr("href").replace("/THUMBNUM/", "/")
);
});
});
$("div.mozaique").each(function (a, b) {
$(b)
.find("div.thumb-under")
.each(function (c, d) {
descs.push($(d).find("p.metadata").text());
$(d)
.find("a")
.each(function (e, f) {
titles.push($(f).attr("title"));
});
});
});
for (let i = 0; i < titles.length; i++) {
results.push({
title: titles[i],
info: descs[i],
thumb: tmb[i],
link: urls[i],
});
}
resolve({
status: 200,
creator: "SatganzDevs",
results
});
})
.catch((err) => reject({ code: 503, status: false, result: err }));
});
}
export const xnxxdl = (urlnya) => {
return new Promise((resolve, reject) => {
axios.get(urlnya).then((res) => {
let $ = cheerio.load(res.data, {
xmlMode: false,
});
const title = $('meta[property="og:title"]').attr("content");
const duration = $('meta[property="og:duration"]').attr("content");
const image = $('meta[property="og:image"]').attr("content");
const info = $("span.metadata").text();
const videoScript = $(
"#video-player-bg > script:nth-child(6)"
).html();
const files = {
low: (videoScript.match(
"html5player.setVideoUrlLow\\('(.*?)'\\);"
) || [])[1],
high: videoScript.match(
"html5player.setVideoUrlHigh\\('(.*?)'\\);" || []
)[1],
HLS: videoScript.match(
"html5player.setVideoHLS\\('(.*?)'\\);" || []
)[1],
thumb: videoScript.match(
"html5player.setThumbUrl\\('(.*?)'\\);" || []
)[1],
thumb69: videoScript.match(
"html5player.setThumbUrl169\\('(.*?)'\\);" || []
)[1],
thumbSlide: videoScript.match(
"html5player.setThumbSlide\\('(.*?)'\\);" || []
)[1],
thumbSlideBig: videoScript.match(
"html5player.setThumbSlideBig\\('(.*?)'\\);" || []
)[1],
};
resolve({
status: 'ok',
creator: "SatganzDevs",
title,
URL,
duration,
image,
info,
files,
});
})
}).catch((err) => reject({ code: 503, status: false, result: err }));
}

// Contoh penggunaan
//xnxxsearch('stepson').then(data => console.log(data)).catch(error => console.error(error));
