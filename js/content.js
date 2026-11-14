/* ===== CONTENT (CMS-ready: edit only this object) ===== */
const C={
 album:{title:'Photonic Cascade',url:'https://frostnovasys.bandcamp.com/album/photonic-cascade',
  tracks:Array.from({length:7},(_,i)=>({n:i+1,title:null,src:null})),trackNote:'Track count follows the client reference image: confirm and add titles/audio files.'},
 site:'https://frostnova.tech',
 gallery:Array.from({length:6},(_,i)=>({t:'Artwork slot '+(i+1),credit:null,src:null})),
 secretArt:{t:'Hidden artwork slot',credit:null,src:null},
 videos:[1,2,3].map(i=>({t:'Video slot '+i,embed:null,link:null})),
 nodes:[{l:'Bandcamp',d:'Photonic Cascade',u:'https://frostnovasys.bandcamp.com/album/photonic-cascade'},{l:'frostnova.tech',d:'Current official site',u:'https://frostnova.tech'},
  {l:'Instagram',d:'Handle pending'},{l:'YouTube',d:'Channel pending'},{l:'Streaming platforms',d:'Links pending'},{l:'Contact',d:'Email pending'}],
 codes:{FROSTNOVA:'ov',NOVA:'ov',SARA:'art'}
};
