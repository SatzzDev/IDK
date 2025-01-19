import axios from 'axios'
import yts from 'yt-search'
export async function oceanSaver(url, format) {
try {
let { data: downloadInit } = await axios.get('https://p.oceansaver.in/ajax/download.php?copyright=0&format=' + format + '&url=' + url)
let id = downloadInit.id
let downloadUrl = null

while (!downloadUrl) {
let res = await axios.get('https://p.oceansaver.in/ajax/progress.php?id=' + id)
downloadUrl = res.data.download_url
await new Promise(resolve => setTimeout(resolve, 2000))
}

return {
status: true,
url:downloadUrl
}
} catch (error) {
return {
status: false,
msg: error.message
}
}
}


function getYouTubeVideoId(url) {
const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|embed\/|user\/[^\/\n\s]+\/)?(?:watch\?v=|v%3D|embed%2F|video%2F)?|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]{11})/;
const match = url.match(regex);
return match ? match[1] : null;
}

export const search = async (teks) =>{
try {
let data = await yts(teks);
return {
status: true,
creator: "@krniwnstria",
results: data.all.filter(res => res.type == "video")
};
} catch (error) {
return {
status: false,
message: error.message
};
}
}

const audio = ["92", "128", "256", "320"]
const video = ["144", "360", "480", "720", "1080"]

async function savetube(link, quality, value) {
try {
const headers = {
accept: '*/*',
referer: 'https://yt.savetube.me/',
origin: 'https://yt.savetube.me/',
'user-agent': 'Postify/1.0.0',
'Content-Type': 'application/json'
};
const umber = [51,54,61,63]
const cdnNumber = umber[Math.floor(Math.random() * umber.length)]
const cdnUrl = `cdn${cdnNumber}.savetube.su`;
const videoInfoResponse = await axios.post(
`https://${cdnUrl}/info`, {
url: link
}, {
headers: {
...headers,
authority: `cdn${cdnNumber}.savetube.su`
}
}
);
const videoInfo = videoInfoResponse.data.data;
const type = value == 1 ? "audio" : 'video'
const body = {
downloadType: type,
quality,
key: videoInfo.key
};
const downloadResponse = await axios.post(
`https://${cdnUrl}/download`,
body, {
headers: {
...headers,
authority: `cdn${cdnNumber}.savetube.su`
}
}
);
const downloadData = downloadResponse.data.data;
return {
status: true,
quality: value == 1 ? `${quality}kbps` : `${quality}p`,
availableQuality: value == 1 ? audio : video,
url: downloadData.downloadUrl,
filename: (`${videoInfo.title}`) + (value == 1 ? ` (${quality}kbps).mp3` : ` (${quality}p).mp4`)
};
} catch (error) {
return {
status: false,
message: error.message
}
}
}


export const ytmp3 = async(link, formats = 128) => {
const videoId = getYouTubeVideoId(link);
const format = audio.includes(formats) ? formats : 128
if (!videoId) {
return {
status: false,
message: "Invalid YouTube URL"
};
}
try {
let data = await yts("https://youtube.com/watch?v=" + videoId);
let response = await savetube("https://youtube.com/watch?v=" + videoId, format, 1)
if (!response.status) {
response = await oceanSaver("https://youtube.com/watch?v=" + videoId, 'mp3')
}
if (!response.status) {
response = await savetube("https://youtube.com/watch?v=" + videoId, format, 1)
}
return {
status: true,
creator: "@krniwnstria",
metadata: data.all[0],
download: response
};
} catch (error) {
console.log(error)
return {
status: false,
message: error.response ? `HTTP Error: ${error.response.status}` : error.message
};
}
}

export const ytmp4 = async(link, formats = 360) => {
const videoId = getYouTubeVideoId(link);
const format = video.includes(formats) ? formats : 360
if (!videoId) {
return {
status: false,
message: "Invalid YouTube URL"
};
}
try {
let data = await yts("https://youtube.com/watch?v=" + videoId);
let response = await savetube("https://youtube.com/watch?v=" + videoId, format, 0)
if (!response.status) {
response = await oceanSaver("https://youtube.com/watch?v=" + videoId, format)
}
if (!response.status) {
response = await savetube("https://youtube.com/watch?v=" + videoId, format, 0)
}
return {
status: true,
creator: "@krniwnstria",
metadata: data.all[0],
download: response
};
} catch (error) {
console.log(error)
return {
status: false,
message: error.response ? `HTTP Error: ${error.response.status}` : error.message
};
}
}

export const transcript = async(link) => {
try {
const response = await axios.get('https://ytb2mp4.com/api/fetch-transcript', {
params: {
'url': link
},
headers: {
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
'Referer': 'https://ytb2mp4.com/youtube-transcript'
}
});
return {
status: true,
creator: "@krniwnstria",
transcript: response.data.transcript
}
} catch (error) {
return {
status: false,
message: error.message
}
}
}