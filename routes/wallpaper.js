import axios from 'axios';
import cheerio from 'cheerio';

export const wallpaper = (query) => {
try {
console.log('started');
const response = await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query);
const $ = cheerio.load(response.data);
const urls = [];
$('li[itemprop="associatedMedia"]').each((index, element) => {
const url = $(element).find('a').attr('href') + '/download';
if (url) {
urls.push(url);
}
});
const updatedUrls = [];
for (let i of urls) {
const res = await axios.get(i);
const _$ = cheerio.load(res.data);
const imgUrl = _$('#show_img').attr('src'); // Menggunakan id 'show_img'
updatedUrls.push(imgUrl);
}
return {
status: 'ok',
developer: "SatganzDevs",
urls: updatedUrls
};
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}