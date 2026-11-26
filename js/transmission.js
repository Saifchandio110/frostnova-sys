/* ===== TRANSMISSION: featured-track button (hero + right panel) =====
   If C.featured.src is set: real play/pause of that audio file. Never autoplays.
   If not: opens the official Bandcamp player in a dock (Bandcamp has no play/pause API for outside pages). */
const XM={au:null,open:false,on:false,
 src(){return C.featured&&C.featured.src},
 label(){return this.src()?(this.on?'❚❚ PAUSE TRANSMISSION':'▶ PLAY TRANSMISSION'):(this.open?'✕ CLOSE TRANSMISSION':'▶ PLAY TRANSMISSION')},
 sync(){this.on=this.src()?!!(this.au&&!this.au.paused):this.open;
  document.querySelectorAll('[data-xmit]').forEach(b=>{b.textContent=this.label();b.setAttribute('aria-pressed',this.on)});
  document.body.classList.toggle('xm-on',this.on)},
 log(t){const lg=document.getElementById('lg');if(!lg)return;lg.insertAdjacentHTML('afterbegin','<li>'+new Date().toLocaleTimeString([],{hour12:false})+' '+t+'</li>');while(lg.children.length>6)lg.lastChild.remove()},
 toggle(){
  if(this.src()){
   if(!this.au){this.au=new Audio(this.src());this.au.preload='none';
    this.au.onplay=()=>{au.pause();this.sync();this.log('Transmission live: '+C.featured.title);if(typeof SND!=='undefined'&&SND.on)SND.hum(false)};
    this.au.onpause=()=>{this.sync();if(typeof SND!=='undefined'&&SND.on)SND.hum(true)};
    this.au.onended=()=>this.sync();
    this.au.onerror=()=>{toast('Audio file could not be loaded');this.sync()}}
   if(this.au.paused)this.au.play().catch(()=>toast('Playback was blocked. Tap again.'));else this.au.pause();
  }else{
   this.open=!this.open;const d=document.getElementById('xdock');
   if(this.open&&!d)document.getElementById('stage').insertAdjacentHTML('beforeend','<div id="xdock" class="xdock" role="region" aria-label="Bandcamp player"><iframe class="bc" title="'+C.album.title+' on Bandcamp" src="'+C.album.embed+'"></iframe><p class="mono">Official Bandcamp player. Press play inside it.</p></div>');
   else if(!this.open&&d)d.remove();
   this.log(this.open?'Bandcamp player opened':'Bandcamp player closed');this.sync()}}};
document.addEventListener('click',e=>{if(e.target.closest('[data-xmit]'))XM.toggle()});
au.addEventListener('play',()=>{if(XM.au)XM.au.pause()});
(function(){const g1=go;go=function(i){const r=g1(i);XM.sync();return r}})();
