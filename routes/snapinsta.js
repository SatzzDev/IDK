import axios from 'axios';
import * as cheerio from 'cheerio';

export const instaDL = async (url) => {
try {
const response = await axios.post('https://snapinsta.to/api/ajaxSearch', `q=${encodeURIComponent(url)}&t=media&lang=en`, {
headers: {
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Origin': 'https://snapinsta.to',
'Referer': 'https://snapinsta.to/en',
'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safaria604.1',
'X-Requested-With': 'XMLHttpRequest'
}
});
const data = response.data.data;
const $ = cheerio.load(data);
let urls = $('div.download-items__btn a').attr('href')
let thumb = $('div.download-items__thumb').find('img').attr('src')
return {status: 'ok', creator: 'SatganzDevs',urls,thumb};
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}
