/* ===== CONTENT (CMS-ready: edit only this file) ===== */
const C={
 lines:['Music is the Universal language','We are damaged, but not broken','We refuse to die by another sunrise','We will chase that horizon so that the day never ends for us again'],
 album:{title:'Photonic Cascade',url:'https://frostnovasys.bandcamp.com/album/photonic-cascade',
  embed:'https://bandcamp.com/EmbeddedPlayer/album=1282519899/size=large/bgcol=030a0f/linkcol=6ff5e0/tracklist=false/artwork=small/transparent=true/',
  art:'https://f4.bcbits.com/img/a2888557678_7.jpg',released:'25 Dec 2025',desc:'First EP with bonus tracks',tags:['chiptune','electronic','synthwave'],
  tracks:[['Abject Mechanism','03:39','abject-mechanism'],['Voxnominal Wave','01:25','voxnominal-wave'],['Phase Capacitance','02:32','phase-capacitance'],['Mourning Doll','01:53','mourning-doll'],['ESD (Electrostatic Disassociation)','02:26','esd-electrostatic-disassociation']].map((t,i)=>({n:i+1,title:t[0],len:t[1],url:'https://frostnovasys.bandcamp.com/track/'+t[2],src:null}))},
 site:'https://frostnova.tech',
 members:Array.from({length:7},(_,i)=>({n:i+1,name:null,role:null})),
 gallery:Array.from({length:6},(_,i)=>({t:'Artwork slot '+(i+1),credit:null,src:null})),
 secretArt:{t:'Hidden artwork slot',credit:null,src:null},
 videos:[1,2,3].map(i=>({t:'Video slot '+i,embed:null,link:null})),
 nodes:[{l:'Bandcamp artist page',d:'Frostnova.sys · Arizona',u:'https://frostnovasys.bandcamp.com'},{l:'Photonic Cascade',d:'Album on Bandcamp',u:'https://frostnovasys.bandcamp.com/album/photonic-cascade'},{l:'frostnova.tech',d:'Official site entrance',u:'https://frostnova.tech'},{l:'Contact',d:'Bandcamp message form',u:'https://frostnovasys.bandcamp.com/contact?b=799519576&amp;n=Frostnova.sys'},{l:'Instagram',d:'Handle pending'},{l:'YouTube',d:'Channel pending'},{l:'Spotify / streaming',d:'Links pending'}],
 codes:{FROSTNOVA:'ov',NOVA:'ov',SUNRISE:'ov',SARA:'art',HORIZON:'hz',FROST:'ice'}
};
