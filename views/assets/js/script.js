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
console.clear();

class musicPlayer {
  constructor() {
    this.play = this.play.bind(this);
    this.playBtn = document.getElementById('play');
    this.playBtn.addEventListener('click', this.play);
    this.controlPanel = document.getElementById('control-panel');
    this.infoBar = document.getElementById('info');
  }

  play() {
    let controlPanelObj = this.controlPanel,
    infoBarObj = this.infoBar
    Array.from(controlPanelObj.classList).find(function(element){
          return element !== "active" ? controlPanelObj.classList.add('active') : 		controlPanelObj.classList.remove('active');
      });

    Array.from(infoBarObj.classList).find(function(element){
          return element !== "active" ? infoBarObj.classList.add('active') : 		infoBarObj.classList.remove('active');
      });
  }
}

const newMusicplayer = new musicPlayer();