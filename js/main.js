/* boot */
const bl=['> FROSTNOVA.SYS KERNEL v2','> MOUNTING HOLOGRAPHIC DECK…','> LINKING AUDIO ARCHIVE…','> CORE ENGAGED'];let bi=0;
(function b(){$('#bt').textContent=bl.slice(0,++bi).join('\n');if(bi<bl.length)setTimeout(b,matchMedia('(prefers-reduced-motion:reduce)').matches?10:300);else setTimeout(()=>$('#boot').classList.add('x'),350)})();
init3D();go(0);
let li=0;setInterval(()=>{const e=$('#tl');if(!e)return;e.style.opacity=0;setTimeout(()=>{li=(li+1)%C.lines.length;e.textContent=C.lines[li];e.style.opacity=1},500)},5000);
