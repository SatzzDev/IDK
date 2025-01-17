import axios from 'axios';

const CLIENT_ID = '4c4fc8c3496243cbba99b39826e2841f';
const CLIENT_SECRET = 'd598f89aba0946e2b85fb8aefa9ae4c8'


async function getAccessToken() {
const url = 'https://accounts.spotify.com/api/token';
const headers = {
'Content-Type': 'application/x-www-form-urlencoded',
'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
};
const data = new URLSearchParams({ grant_type: 'client_credentials' });

const response = await axios.post(url, data, { headers });
return response.data.access_token;
}

export async function spotifySearch(query) {
const accessToken = await getAccessToken();
const url = `https://api.spotify.com/v1/search`;
const headers = { 'Authorization': `Bearer ${accessToken}` };
const params = { q: query, type: 'track', limit: 10 };

const response = await axios.get(url, { headers, params });
const results = response.data.tracks.items.map(track => ({
name: track.name,
artists: track.artists.map(artist => artist.name).join(', '),
album: track.album.name,
url: track.external_urls.spotify,
}));

return {
author: "@krniwnstria",
status: 200,
results
};
}

export const spotifydl = async(url) => {
return new Promise(async (resolve, reject) => {
try {
const res = await axios.get(
`https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
{
headers: {
accept: "application/json, text/plain, */*",
"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
"sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
"sec-ch-ua-mobile": "?1",
"sec-ch-ua-platform": "\"Android\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
Referer: "https://spotifydownload.org/",
"Referrer-Policy": "strict-origin-when-cross-origin",
},
}
);
const yanz = await axios.get(
`https://api.fabdl.com/spotify/mp3-convert-task/${res.data.result.gid}/${res.data.result.id}`,
{
headers: {
accept: "application/json, text/plain, */*",
"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
"sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
"sec-ch-ua-mobile": "?1",
"sec-ch-ua-platform": "\"Android\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
Referer: "https://spotifydownload.org/",
"Referrer-Policy": "strict-origin-when-cross-origin",
},
}
);
const result = {status:true,creator:"@krniwnstria"};
result.title = res.data.result.name;
result.type = res.data.result.type;
result.artist = res.data.result.artists;
result.duration = res.data.result.duration_ms;
result.cover = res.data.result.image;
result.url = "https://api.fabdl.com" + yanz.data.result.download_url;
resolve(result);
} catch (error) {
reject(error);
}
});
};