/* boot */
const bl=['> FROSTNOVA.SYS KERNEL v2','> MOUNTING HOLOGRAPHIC DECK…','> LINKING AUDIO ARCHIVE…','> CORE ENGAGED'];let bi=0;
(function b(){$('#bt').textContent=bl.slice(0,++bi).join('\n');if(bi<bl.length)setTimeout(b,matchMedia('(prefers-reduced-motion:reduce)').matches?10:300);else setTimeout(()=>$('#boot').classList.add('x'),350)})();
init3D();go(0);
