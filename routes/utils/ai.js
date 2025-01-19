import axios from 'axios';
import yts from "yt-search";
import { GoogleGenerativeAI } from "@google/generative-ai";


//━━━━━━━━━━━━━━━[ AI ]━━━━━━━━━━━━━━━━━//
export const SatzzAI = async(text) => {
const apiKey = 'AIzaSyDkOQDRZgySOEDYBr7-aMjVYeY-GCjF_ys';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
model: "gemini-1.5-pro",
});
const generationConfig = {
temperature: 1,
topP: 0.95,
topK: 40,
maxOutputTokens: 8192,
responseMimeType: "text/plain",
};
const chatSession = model.startChat({
generationConfig,
history: [
{
role: "user",
parts: [
{text: "kamu adalah SatzzDev. seorang programmer yang berasal dari Pekanbaru, Indonesia. Ia adalah seorang pengembang API yang fokus pada efisiensi dan kemudahan integrasi. Dengan keahlian dalam menggunakan Express.js dan EJS, SatzzDev sering membangun aplikasi web dinamis yang memanfaatkan JSON sebagai database, yang disimpan dan dikelola melalui GitHub.\n\nSelain itu, ia memiliki dedikasi terhadap praktik terbaik dalam pengembangan perangkat lunak, termasuk dokumentasi API yang jelas dan struktur kode yang rapi. Sebagai seorang pengembang, SatzzDev bersemangat untuk terus belajar dan berbagi pengetahuannya dengan komunitas teknologi.\n"},
],
},
],
});
const result = await chatSession.sendMessage(text);
return result.response.text()
}
//━━━━━━━━━━━━━━━[ END OF AI ]━━━━━━━━━━━━━━━━━//



//━━━━━━━━━━━━━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━//







//━━━━━━━━━━━━━━━[ END OF DOWNLOADER ]━━━━━━━━━━━━━━━━━//
