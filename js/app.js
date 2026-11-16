/* ===== UI ===== */
const $=s=>document.querySelector(s),V=$('#view');let cur=-1,ti=-1,lbi=0,unlocked=false;
const au=new Audio();au.preload='none';
const PH=(t)=>'<p class="ph">PLACEHOLDER: '+t+'</p>';
const ph=i=>{const h=(i*53)%360;return '<svg viewBox="0 0 100 100" role="img" aria-label="Placeholder artwork"><rect width="100" height="100" fill="hsl('+h+',55%,8%)"/>'+[0,1,2,3].map(k=>'<circle cx="50" cy="50" r="'+(10+k*11+i*2)+'" fill="none" stroke="hsl('+(h+k*20)+',80%,60%)" stroke-opacity=".5" stroke-dasharray="'+(2+k*3)+' 4"/>').join('')+'<path d="M0 '+(30+i*8)+'L100 '+(80-i*6)+'" stroke="#ff8a3d" stroke-opacity=".6"/></svg>'};
const ext=(l,t,c='b')=>'<a class="'+c+'" href="'+l+'" target="_blank" rel="noopener">'+t+'</a>';
const S=[
{k:'COMMAND DECK',p:'HOME',m:'Core engaged. Welcome, visitor.',cam:[0,1.3,7],look:[0,1,0],r:()=>'<div class="hero"><div><div class="wm mono">// WELCOME TO THE NEURAL GATEWAY</div><h1>FROSTNOVA<span>.SYS</span></h1><p id="tl">'+C.lines[0]+'</p></div><div class="btns"><button class="b" data-go="1">▶ EXPLORE MUSIC</button><button class="b a" data-go="3">◈ VISUAL ARCHIVE</button></div></div>'},
{k:'AUDIO ARCHIVE',p:'AUDIO',m:'Audio archive mounted.',cam:[-2.4,1.5,5.6],look:[-.6,1,0],r:()=>{const A=C.album,has=A.tracks.some(t=>t.src);return '<div class="sec"><h2>AUDIO ARCHIVE</h2><div class="sub mono">'+A.title.toUpperCase()+'</div>'+(has?'<div id="np" class="mono" style="color:var(--cy)">NO TRACK LOADED</div><div class="ctl"><button data-a="prev" aria-label="Previous">⏮</button><button data-a="play" id="pp" aria-label="Play or pause">▶</button><button data-a="next" aria-label="Next">⏭</button><div id="pr" data-a="seek"><i></i></div></div><p class="note" id="as">Select a track.</p>':'<iframe class="bc" loading="lazy" title="'+A.title+' on Bandcamp" src="'+A.embed+'"></iframe><p class="note">Official Bandcamp player. Tap a track below to open it on Bandcamp.</p>')+A.tracks.map(t=>(t.src?'<button class="trk mono" data-t="'+(t.n-1)+'">':'<a class="trk mono" href="'+t.url+'" target="_blank" rel="noopener">')+'<span>'+String(t.n).padStart(2,'0')+'</span><span style="flex:1">'+t.title+'</span><span class="note">'+t.len+'</span>'+(t.src?'</button>':'</a>')).join('')+'<div class="btns" style="justify-content:flex-start;margin-top:10px">'+ext(A.url,'FULL ALBUM ON BANDCAMP ↗')+'</div></div>'}},
{k:'RELEASE BAY',p:'RELEASES',m:'Release bay open.',cam:[2.4,1,5.6],look:[.6,1,0],r:()=>{const A=C.album;return '<div class="sec"><h2>RELEASE BAY</h2><div class="sub mono">1 RELEASE ON RECORD</div><div class="grid" style="grid-template-columns:150px 1fr"><div class="tile" style="cursor:default">'+ph(2)+'<img src="'+A.art+'" alt="'+A.title+' cover art" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.remove()"></div><div><h3>'+A.title+'</h3><p class="note">'+A.desc+' · Frostnova.sys<br>Released '+A.released+'<br>'+A.tracks.length+' tracks listed<br>'+A.tags.join(' · ')+'</p>'+ext(A.url,'LISTEN ↗')+'</div></div><p class="note" style="margin-top:12px">Cover loaded from the official Bandcamp release page.</p>'+PH('Bandcamp also calls this a 7 track album but lists 5 tracks. Confirm the final track list.')+'</div>'}},
{k:'VISUAL ARCHIVE',p:'VISUAL',m:'Visual archive decrypted.',cam:[0,3.2,5],look:[0,1,0],r:()=>'<div class="sec"><h2>VISUAL ARCHIVE</h2><div class="sub mono">TAP TO ENLARGE</div>'+PH('No client artwork supplied yet.')+'<div class="grid">'+gal().map((g,i)=>'<button class="tile" data-lb="'+i+'" aria-label="'+g.t+'">'+(g.src?'<img src="'+g.src+'" alt="'+g.t+'" loading="lazy" style="width:100%;height:100%;object-fit:cover">':ph(i))+'<em>'+g.t+'</em></button>').join('')+'</div></div>'},
{k:'VIDEO FEED',p:'VIDEO',m:'Video feed standing by.',cam:[-1.6,.5,5.8],look:[0,1,0],r:()=>'<div class="sec"><h2>VIDEO FEED</h2><div class="sub mono">NO FEEDS LINKED</div>'+C.videos.map(v=>'<div class="vid mono">'+(v.embed?'<iframe loading="lazy" src="'+v.embed+'" title="'+v.t+'" allowfullscreen></iframe>':v.t+': embed URL pending')+'</div>').join('')+PH('Add YouTube/Bandcamp embed URLs in CONTENT.videos.')+'</div>'},
{k:'SYSTEM PROFILE',p:'PROFILE',m:'Profile file opened.',cam:[1.6,1.8,4.6],look:[0,1.4,0],r:()=>'<div class="sec"><h2>SYSTEM PROFILE</h2><div class="sub mono">UNIT: FROSTNOVA.SYS // ARIZONA</div><p style="font-size:16px;line-height:1.8">'+C.lines.join('<br>')+'</p><p class="note">Words from the official frostnova.tech entrance page.</p><p>Tagged chiptune, electronic and synthwave on Bandcamp. First release: Photonic Cascade, December 2025.</p>'+PH('Full biography, creative philosophy and credits awaiting client copy.')+'</div>'},
{k:'NETWORK NODES',p:'NODES',m:'Network nodes scanned.',cam:[0,1.2,8.6],look:[0,1,0],r:()=>'<div class="sec"><h2>NETWORK NODES</h2><div class="sub mono">EXTERNAL LINKS</div>'+C.nodes.map(n=>n.u?'<a class="lnk" href="'+n.u+'" target="_blank" rel="noopener"><span>'+n.l+'</span><span class="note">'+n.d+' ↗</span></a>':'<a class="lnk" aria-disabled="true" role="link"><span>'+n.l+'</span><span class="note">'+n.d+'</span></a>').join('')+'</div>'}
];
const gal=()=>unlocked?C.gallery.concat([C.secretArt]):C.gallery;
$('#nb').innerHTML=S.map((s,i)=>'<button data-go="'+i+'"><i>'+String(i).padStart(2,'0')+'</i>'+s.k+'</button>').join('');
$('#rb').href=C.album.url;$('#eq').innerHTML=Array.from({length:28},()=>'<i style="animation-delay:-'+(Math.random()*2).toFixed(2)+'s"></i>').join('');
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2600)}
function go(i){if(i===cur)return;if(cur>=0){au.pause()}cur=i;const s=S[i];V.innerHTML=s.r();V.scrollTop=0;
 document.querySelectorAll('#nb button').forEach((b,j)=>j==i?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));
 $('#path').textContent='SYS/DECK/'+s.p;$('#fs').textContent=s.k;$('#fm').textContent='TRANSMISSION: '+s.m.toUpperCase();const lg=$('#lg');lg.insertAdjacentHTML('afterbegin','<li>'+new Date().toLocaleTimeString([],{hour12:false})+' '+s.m+'</li>');while(lg.children.length>6)lg.lastChild.remove();
 const f=$('#fl');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');if(window.setPose)setPose(s);if(i)V.focus({preventScroll:true});ti=-1}
document.addEventListener('click',e=>{const t=e.target.closest('[data-go],[data-t],[data-a],[data-lb]');if(!t)return;const d=t.dataset;
 if(d.go!==undefined)go(+d.go);else if(d.t!==undefined)load(+d.t,true);else if(d.lb!==undefined)lb(+d.lb);
 else if(d.a==='play')tog();else if(d.a==='next')load((ti+1)%C.album.tracks.length,true);else if(d.a==='prev')load((ti+C.album.tracks.length-1)%C.album.tracks.length,true);
 else if(d.a==='seek'&&au.duration){au.currentTime=au.duration*(e.offsetX/t.clientWidth)}});
function load(i,p){ti=i;const t=C.album.tracks[i];document.querySelectorAll('.trk').forEach((b,j)=>b.classList.toggle('on',j==i));
 $('#np').textContent='TRACK '+String(t.n).padStart(2,'0')+' // '+(t.title||'TITLE PENDING');
 if(t.src){au.src=t.src;$('#as').textContent='Loading…';if(p)au.play().catch(()=>$('#as').textContent='Playback blocked or file missing. Use Bandcamp.')}
 else{au.removeAttribute('src');$('#as').textContent='No audio file linked for this slot. Listen on Bandcamp below.';$('#pp').textContent='▶'}}
function tog(){if(ti<0)return load(0,true);if(!au.src)return;au.paused?au.play():au.pause()}
au.onplay=()=>{const b=$('#pp');if(b)b.textContent='⏸'};au.onpause=()=>{const b=$('#pp');if(b)b.textContent='▶'};
au.ontimeupdate=()=>{const b=$('#pr i');if(b&&au.duration)b.style.width=au.currentTime/au.duration*100+'%'};
au.onerror=()=>{const a=$('#as');if(a)a.textContent='Audio failed to load. Use Bandcamp.'};
function lb(i){lbi=i;const g=gal()[i];$('#lbc').innerHTML='<div class="tile" style="aspect-ratio:1;max-height:70vh;margin:auto;cursor:default">'+(g.src?'<img src="'+g.src+'" alt="'+g.t+'" style="width:100%;height:100%;object-fit:contain">':ph(i))+'</div><p class="mono" style="margin-top:8px">'+g.t+' // CREDIT: '+(g.credit||'pending')+'</p><button data-l="-1">◀</button><button data-l="0">CLOSE</button><button data-l="1">▶</button>';$('#lb').classList.add('on');$('#lbc button:nth-of-type(2)').focus()}
$('#lb').addEventListener('click',e=>{const l=e.target.dataset.l;if(l===undefined&&e.target.id!=='lb')return;const n=gal().length;if(l==='1')lb((lbi+1)%n);else if(l==='-1')lb((lbi+n-1)%n);else $('#lb').classList.remove('on')});
/* clock, session, telemetry */
setInterval(()=>$('#clk').textContent=new Date().toLocaleTimeString([],{hour12:false}),1000);
$('#gst').textContent='GUEST // '+String(100+Math.floor(Math.random()*900));
setInterval(()=>document.querySelectorAll('.bar i').forEach(i=>i.style.width=(55+Math.random()*40)+'%'),2800);
/* easter eggs */
function egg(c){if(c==='ov'){document.body.classList.toggle('ov');window.recolor&&recolor();toast('OVERRIDE ACCEPTED // AMBER PROTOCOL')}
 else if(c==='art'||c==='konami'){unlocked=true;document.body.classList.add('glitch');setTimeout(()=>document.body.classList.remove('glitch'),900);toast('UNIT 07 UNLOCKED // HIDDEN ARCHIVE SLOT ADDED');if(cur===3){cur=-1;go(3)}}}
$('#ovr').onsubmit=e=>{e.preventDefault();const v=$('#ok').value.trim().toUpperCase();$('#ok').value='';C.codes[v]?egg(C.codes[v]):toast('ACCESS DENIED // UNKNOWN KEY')};
const K='ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a'.split(',');let kp=0;
addEventListener('keydown',e=>{if(e.key==='Escape'){$('#lb').classList.remove('on');return}
 if(e.target.tagName==='INPUT')return;
 if($('#lb').classList.contains('on')){if(e.key==='ArrowRight')$('#lb [data-l="1"]').click();if(e.key==='ArrowLeft')$('#lb [data-l="-1"]').click();return}
 kp=(e.key===K[kp]||e.key.toLowerCase()===K[kp])?kp+1:0;if(kp===K.length){kp=0;egg('konami')}
 if(/^[0-6]$/.test(e.key))go(+e.key)});
