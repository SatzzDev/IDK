const axios = require('axios');
import * as cheerio from 'cheerio';





const hadist = async (number) => {
return new Promise((resolve, reject) => {
axios.get(`https://ilmuislam.id/hadits/perawi/${number}/muslim`).then(response => {
const html = response.data;
const $ = cheerio.load(html);
const haditsArray = [];
$('div.col-md-9 div.card').each((index, element) => {
const hadits = {};
hadits.nama = $(element).find('h5.mb-0').text();
hadits.arab = $(element).find('div[style="font-family: \'Kitab\'!important;font-size: 24px;text-align: right;"] p').text().trim();
hadits.arti = $(element).find('div.mb-3').eq(0).find('p').text().trim();
haditsArray.push(hadits);
});
resolve({status: 'ok', creator: "SatganzDevs", data: haditsArray});
})
.catch(error => {
reject(error);
});
});
};
hadist(1).then(data => console.log(data)).catch(error => console.error(error));
