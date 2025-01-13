import axios from 'axios';
import * as cheerio from 'cheerio';


export const wallpaper = async (query, resolution) => {
  const result = [];
  const baseUrl = `https://wallpaperscraft.com/catalog/${query}/${resolution}`;
  try {
    for (let i = 1; i <= 2; i++) {
      const url = i === 1 ? baseUrl : `${baseUrl}/page${i}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      $('div.wallpapers_main span.wallpapers__canvas').each((_, el) => {
        const img = $(el).find('img').attr('src');
        if (img) result.push(img.replace('168x300', resolution));
      });

      console.log(`Got ${result.length} wallpapers from page ${i}`);
    }
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }
  return result;
};