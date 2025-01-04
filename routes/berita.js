import axios from 'axios';
import * as cheerio from 'cheerio';

export const pitutur = async(query) => {
try {
const response = await axios.get(`https://www.pitutur.id/news`);
const html = response.data;
const $ = cheerio.load(html);
let result = [];
$('div.latest__item').each((index, element) => {
const title = $(element).find('h2.latest__title a').text().trim();
const category = $(element).find('h4.latest__subtitle a').text().trim();
const date = $(element).find('date.latest__date').text().trim();
const url = $(element).find('h2.latest__title a').attr('href');
const image = $(element).find('img').attr('src');
result.push({ title, category, date, image, url });
});
const data = {
status: 'ok',
creator: 'SatganzDevs',
result: result 
};
return data;
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}
