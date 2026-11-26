/* On-screen diagnostics for phone testing: open the site with ?debug=1 (no effect otherwise). */
(function(){if(!/[?&]debug=1/.test(location.search))return;
 const p=document.createElement('pre'),L=[];let fps=0;
 p.style.cssText='position:fixed;left:0;right:0;bottom:0;max-height:45%;overflow:auto;margin:0;padding:6px;background:rgba(0,0,0,.85);color:#7dffb0;font:11px/1.3 monospace;z-index:99;white-space:pre-wrap';
 const show=()=>{p.textContent='FPS '+fps+' | '+innerWidth+'x'+innerHeight+' | dpr '+devicePixelRatio+' | cores '+(navigator.hardwareConcurrency||'?')+'\n'+(L.join('\n')||'no errors so far')};
 const log=t=>{L.push(t);if(L.length>40)L.shift();show()};
 document.addEventListener('DOMContentLoaded',()=>{document.body.appendChild(p);show()});
 addEventListener('error',e=>log('ERROR: '+e.message+' ('+String(e.filename||'').split('/').pop()+':'+e.lineno+')'));
 addEventListener('unhandledrejection',e=>log('PROMISE: '+(e.reason&&e.reason.message||e.reason)));
 ['warn','error'].forEach(k=>{const o=console[k];console[k]=function(){log(k.toUpperCase()+': '+[].slice.call(arguments).map(String).join(' '));o.apply(console,arguments)}});
 let f=0,t=performance.now();(function l(){f++;const n=performance.now();if(n-t>1000){fps=f;f=0;t=n;show()}requestAnimationFrame(l)})();
})();
