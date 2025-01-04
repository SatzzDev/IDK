window.addEventListener('load', async() => {
document.getElementById('preloader').style.display = "none";
})
navigator.mediaSession.metadata = new MediaMetadata({
title: 'Sepenuh Hati X Sampai Akhir',
artist: 'SatzzDev',
album: 'SatzzDev',
artwork: [
{ src: '/assets/SatzzDev.png', sizes: '512x512', type: 'image/png' }
]
});
var typed = new Typed('#typing', {
strings: ['SatzzAPI'],
typeSpeed: 70,
backSpeed:70,
loop: true
});
setInterval(() => {
fetch('/uptime').then(r => r.json().then(res => {
document.getElementById('uptime').textContent = res.uptime;
}))
}, 100)
function ulang() {
const now = new Date();
const day = now.toLocaleDateString("en-US", {weekday: "long"});
const time = now.toLocaleTimeString("en-US", {
hour: "2-digit",
minute: "2-digit",
second: "2-digit",
hour12: false
});
document.getElementById("currentTime").textContent = `${day}, ${time}`;
}
setInterval(ulang, 100)
