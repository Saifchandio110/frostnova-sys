/* ===== UI SOUND (synth only, off by default) ===== */
const SND={on:false,ctx:null,amb:null,
 c(){if(!this.ctx)this.ctx=new(window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume();return this.ctx},
 beep(f=620,d=.08,type='square',v=.09){if(!this.on)return;try{const c=this.c(),t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.02)}catch(e){}},
 hum(on){try{const c=this.c(),t=c.currentTime;
  if(on&&!this.amb){const g=c.createGain(),lp=c.createBiquadFilter(),o1=c.createOscillator(),o2=c.createOscillator(),l=c.createOscillator(),lg=c.createGain();o1.type='sine';o1.frequency.value=55;o2.type='triangle';o2.frequency.value=82.5;lp.type='lowpass';lp.frequency.value=380;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+1.2);l.frequency.value=.15;lg.gain.value=.02;l.connect(lg);lg.connect(g.gain);o1.connect(lp);o2.connect(lp);lp.connect(g);g.connect(c.destination);[o1,o2,l].forEach(o=>o.start(t));this.amb={g,stop(){[o1,o2,l].forEach(o=>o.stop())}}}
  else if(!on&&this.amb){const a=this.amb;this.amb=null;a.g.gain.cancelScheduledValues(t);a.g.gain.setValueAtTime(a.g.gain.value,t);a.g.gain.linearRampToValueAtTime(0,t+.4);setTimeout(()=>{try{a.stop()}catch(e){}},500)}}catch(e){console.warn(e)}}};
(function(){const b=document.getElementById('snd');if(!b)return;
 const set=()=>{b.setAttribute('aria-pressed',SND.on);b.textContent=SND.on?'SOUND ON':'SOUND OFF'};
 b.addEventListener('click',e=>{e.stopPropagation();SND.on=!SND.on;set();SND.hum(SND.on);if(SND.on)SND.beep(880,.12);toast(SND.on?'SOUND ON':'SOUND OFF')});
 document.addEventListener('click',e=>{if(e.target.closest('button,a'))SND.beep(620,.06)});
 document.getElementById('nav').addEventListener('mouseover',e=>{if(e.target.closest('button'))SND.beep(940,.03,'square',.04)});
 const g0=go;go=function(i){if(i!==cur)SND.beep(i?240:180,.28,'sawtooth',.06);return g0(i)};
})();
