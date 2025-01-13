//Created By Satganzdevs 
// Copyright (c) Satganzdevs
// Do Not Change!

import axios from 'axios';
import FormData from 'form-data';


export const loveTik = async(url) {
try {
const formData = new FormData();
formData.append('query', url);
const response = await axios.post('https://lovetik.com/api/ajax/search', formData, {
headers: formData.getHeaders() // Menambahkan header yang diperlukan untuk FormData
});
let video = response.data.links[0].a
let audio = response.data.links[2].a
return {
status: 'ok',
developer: "SatganzDevs",
cover: response.data.cover,
desc: response.data.desc,
author: {
username: response.data.author,
name: response.data.author_name,
avatar: response.data.author_a
},
video,
audio
}
} catch (error) {
console.error('Error scraping:', error);
}
}