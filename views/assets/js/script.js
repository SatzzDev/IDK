window.addEventListener('load', async() => {
document.getElementById('preloader').style.display = "none";
})
var typed = new Typed('#typing', {
strings: ['SatzzAPI'],
typeSpeed: 70,
backSpeed:70,
loop: true
});
setInterval(() => {
const now=new Date(),s=now.getSeconds(),m=now.getMinutes(),h=now.getHours();
document.getElementById("second").style=`--value:${s};`
document.getElementById("minute").style=`--value:${m};`
document.getElementById("hour").style=`--value:${h%12||12};`
document.getElementById("ampm").textContent=h>=12?"PM":"AM";
}, 100);

setInterval(() => {
fetch('/uptime').then(r=>r.json().then(res=>{
document.getElementById("uphours").style=`--value:${res.hours}`;
document.getElementById("upminutes").style=`--value:${res.minutes}`;
document.getElementById("upseconds").style=`--value:${res.seconds}`;
}))
}, 1000);


let trackList = [], currentIndex = 0;
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const playIcon = document.getElementById('playIcon');
const trackListModal = document.getElementById('my_modal_2');
const trackListContainer = document.getElementById('trackList');

const loadTrack = async (index) => {
if (index >= 0 && index < trackList.length) {
const track = trackList[index];
if (track.downloadUrl) {
  audio.src = track.downloadUrl; // Gunakan URL yang sudah diunduh
  document.getElementById('title').innerText = track.title;
  document.getElementById('cover').src = track.thumbnail;
  document.getElementById('playIcon').classList.replace(
    document.getElementById('playIcon').classList.contains('fa-play') ? 'fa-play' : 'fa-pause',
    'fa-spinner'
  );
  document.getElementById('playIcon').classList.add('animate-spin');
  await audio.play();
  document.getElementById('playIcon').classList.remove('animate-spin');
  playIcon.classList.replace('fa-spinner', 'fa-pause');
} else {
  Swal.fire('Error', `Failed to load track: ${track.title}`, 'error');
}
}
};


