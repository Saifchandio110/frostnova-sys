/* ===== UI SOUND (synth blips, off by default) ===== */
const SND={on:false,ctx:null,beep(f=520,d=.08,type='square',v=.04){if(!this.on)return;try{const c=this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext)()),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;g.gain.value=v;g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+d);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}}};
(function(){const b=document.getElementById('snd');if(!b)return;
 b.onclick=()=>{SND.on=!SND.on;b.setAttribute('aria-pressed',SND.on);b.textContent=SND.on?'SOUND ON':'SOUND OFF';SND.beep(880,.1)};
 document.addEventListener('click',e=>{if(e.target.closest('button,a')&&e.target!==b)SND.beep(620,.06)});
 document.getElementById('nav').addEventListener('mouseover',e=>{if(e.target.closest('button'))SND.beep(940,.03,'square',.02)});
 const g0=go;go=function(i){if(i!==cur)SND.beep(i?240:180,.28,'sawtooth',.025);return g0(i)};
})();
