import axios from 'axios';
import * as cheerio from 'cheerio';

export const jadwalSholat = async (kode_daerah) => {
try {
const response = await axios.get('https://jadwalsholat.org/jadwal-sholat/daily.php?id='+ kode_daerah);
const html = response.data; 
const $ = cheerio.load(html);
let daerah = $('h1').text().trim();
let bulan = $('h2').text().trim(); 
const row = $('tr.table_light, tr.table_dark').find('td'); 
const tanggal = $(row[0]).text().trim();
const imsyak = $(row[1]).text().trim();
const shubuh = $(row[2]).text().trim();
const terbit = $(row[3]).text().trim();
const dhuha = $(row[4]).text().trim();
const dzuhur = $(row[5]).text().trim();
const ashr = $(row[6]).text().trim();
const maghrib = $(row[7]).text().trim();
const isya = $(row[8]).text().trim();
return {
status: 'ok',
developer: "SatganzDevs",
daerah,
bulan,
tanggal, 
imsyak, 
shubuh,
terbit, 
dhuha, 
dzuhur, 
ashr, 
maghrib, 
isya
};
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}


export const findKodeDaerah = async(nama_daerah) =>{
try {
const response = await axios.get('https://jadwalsholat.org/jadwal-sholat/monthly.php');
const html = response.data;
const $ = cheerio.load(html);
const options = $('select[name="kota"] option');
const kodeDaerah = {};
options.each((index, element) => {
const kode = $(element).attr('value');
const nama = $(element).text().trim();
kodeDaerah[nama.toLowerCase()] = kode;
});
const lowercaseRegion = nama_daerah.toLowerCase();
if (kodeDaerah.hasOwnProperty(lowercaseRegion)) {
return {
status: 'ok',
creator: 'SatganzDevs',
kode_daerah: kodeDaerah[lowercaseRegion]
};
} else {
return {
status: 'error',
message: 'Region not found'
};
}
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}
