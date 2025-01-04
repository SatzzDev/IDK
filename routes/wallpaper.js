import axios from 'axios';
import cheerio from 'cheerio';


export const wallpaper = async (query, mobile = false) => {
try {
const response = await axios.get(`https://www.wallpaperflare.com/search?wallpaper=${query}${mobile ? '&mobile=ok' : ''}`);
console.log(mobile)
const $ = cheerio.load(response.data);
const urls = [];
$('li[itemprop="associatedMedia"]').each((index, element) => {
const url = $(element).find('a').attr('href') + '/download';
if (url) {
urls.push(url);
}
});
const updatedUrls = await Promise.all(
urls.map(async (url) => {
try {
const res = await axios.get(url);
const _$ = cheerio.load(res.data);
return _$('#show_img').attr('src');
} catch (err) {
console.error(`Error fetching ${url}:`, err.message);
return null;
}
})
);
const validUrls = updatedUrls.filter(Boolean);
return {
status: 'ok',
type: mobile ? 'mobile' : 'desktop',
developer: "SatganzDevs",
urls: validUrls
};
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
};
