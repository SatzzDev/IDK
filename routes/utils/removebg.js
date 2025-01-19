import puppeteer from 'puppeteer';
import axios from 'axios';
import CryptoJS from "crypto-js";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import FormData from 'form-data';


const getCookiesAndUserAgent = async (url) => {
//const { stdout: chromiumPath } = await promisify(exec)("which chromium").catch(() => '/usr/bin/google-chrome');
const browser = await puppeteer.launch({
executablePath: '/usr/bin/google-chrome',
args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });
const cookies = await page.cookies();
const userAgent = await page.evaluate(() => navigator.userAgent);
const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
await browser.close();
return { cookieHeader, userAgent };
};

export async function removebg(buffer) {
const { cookieHeader, userAgent } = await getCookiesAndUserAgent('https://photobackgroundremover.com');
const Satzz = await testFetch()
const keynya = JSON.parse(Satzz)
const formData = new FormData();
formData.append('image', buffer,{ filename: 'image.jpg', contentType: 'image/jpg' });
formData.append('amtext', encodeURIComponent(keynya.amtext)); 
formData.append('iavmol', encodeURIComponent(keynya.iavmol)); 
formData.append('slamltol', encodeURIComponent(keynya.slam_ltol))
try {
const response = await axios.post(
'https://photobackgroundremover.com/wp-content/plugins/remove_background/requests/image_background_removal.php',
formData,
{
headers: {
...formData.getHeaders(),
'Cookie': cookieHeader,
'Origin':'https://photobackgroundremover.com',
'Refer':'https://photobackgroundremover.com/',
'Sec-Ch-Ua':'"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
'Sec-Ch-Ua-Mobile':'?0',
'Sec-Ch-Ua-Platform':'"Windows"',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'same-origin',
'User-Agent': userAgent,
'X-Requested-With':'XMLHttpRequest'
},
}
);
return {
author: "@krniwnstria",
status: response.status,
url:response.data.output.url,
};
} catch (error) {
return {
author: "@krniwnstria",
status: error.response?.status || 500,
data: error.response?.data || error.message
};
}
}



function cyphereddata(t, r="cryptoJS") {
t = t.toString();
var e = CryptoJS.lib.WordArray.random(256)
, a = CryptoJS.lib.WordArray.random(16)
, i = CryptoJS.PBKDF2(r, e, {
hasher: CryptoJS.algo.SHA512,
keySize: 8,
iterations: 999
})
, n = CryptoJS.AES.encrypt(t, i, {
iv: a
});
return JSON.stringify({
amtext: CryptoJS.enc.Base64.stringify(n.ciphertext),
slam_ltol: CryptoJS.enc.Hex.stringify(e),
iavmol: CryptoJS.enc.Hex.stringify(a)
})
}


async function testFetch() {
try {
let t = await fetch("https://photobackgroundremover.com/wp-content/plugins/remove_background/unix.php");
if (t.ok) {
let r = await t.text();
return cyphereddata(r)
}
throw Error("Error: " + t.status)
} catch (e) {
throw Error("Request failed: " + e.message)
}
}