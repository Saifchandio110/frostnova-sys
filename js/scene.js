/* ===== 3D ===== */
function init3D(){const cv=$('#gl'),st=$('#stage');
 const low=matchMedia('(max-width:700px)').matches||(navigator.hardwareConcurrency||4)<=4,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,sp=rm?.2:1;
 let R;try{if(!window.THREE)throw 0;R=new THREE.WebGLRenderer({canvas:cv,antialias:!low,alpha:true,powerPreference:'low-power'})}catch(e){document.body.classList.add('nogl');toast('3D unavailable: running simplified mode');return}
 R.setPixelRatio(Math.min(devicePixelRatio,low?1.25:2));
 const sc=new THREE.Scene();sc.fog=new THREE.FogExp2(0x030a0f,.06);
 const cam=new THREE.PerspectiveCamera(42,1,.1,60),pos=new THREE.Vector3(0,1.3,7),look=new THREE.Vector3(0,1,0),lk=new THREE.Vector3(0,1,0);
 sc.add(new THREE.AmbientLight(0x223a44,1.2));
 const l1=new THREE.DirectionalLight(0x6ff5e0,1.6);l1.position.set(-4,4,4);sc.add(l1);
 const l2=new THREE.PointLight(0xff8a3d,1.6,14);l2.position.set(3,1,-3);sc.add(l2);
 const l3=new THREE.PointLight(0x8f6bff,1.2,10);l3.position.set(0,-1,3);sc.add(l3);
 const edge=new THREE.LineBasicMaterial({color:0x6ff5e0,transparent:true,opacity:.75});
 const mat=(c,e=0)=>new THREE.MeshStandardMaterial({color:c,emissive:e,metalness:.8,roughness:.35,flatShading:true});
 const dark=mat(0x0b2a33),mid=mat(0x14505a),vis=mat(0x1a1033,0x7a55ff),core=mat(0x331a08,0xff8a3d);
 const mech=new THREE.Group();sc.add(mech);const hit=[];
 function part(g,m,x,y,z,rx=0,ry=0,rz=0,h){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.rotation.set(rx,ry,rz);const e=new THREE.LineSegments(new THREE.EdgesGeometry(g),edge);o.add(e);mech.add(o);if(h)hit.push(o);return o}
 const head=part(new THREE.CylinderGeometry(.8,.6,1.1,6),mid,0,1.6,0,0,Math.PI/6,0,1);
 part(new THREE.BoxGeometry(1.05,.22,.2),vis,0,1.62,.62,0,0,0,1);
 part(new THREE.BoxGeometry(.4,.3,.3),dark,0,1.05,.5);
 part(new THREE.ConeGeometry(.12,.8,4),mid,-.72,2.3,0,0,0,.4);part(new THREE.ConeGeometry(.12,.8,4),mid,.72,2.3,0,0,0,-.4);
 part(new THREE.CylinderGeometry(.3,.4,.4,6),dark,0,.85,0);
 part(new THREE.CylinderGeometry(1.3,.9,1,6),dark,0,.2,0,0,Math.PI/6);
 part(new THREE.BoxGeometry(1,.55,.9),mid,-1.55,.55,0,0,0,.25);part(new THREE.BoxGeometry(1,.55,.9),mid,1.55,.55,0,0,0,-.25);
 part(new THREE.BoxGeometry(1.1,.55,.3),mid,0,.4,.8);
 const cr=part(new THREE.OctahedronGeometry(.17),core,0,.4,1);
 [-1,1].forEach(s=>{part(new THREE.CylinderGeometry(.22,.17,1.3,6),dark,s*1.7,-.3,0);part(new THREE.BoxGeometry(.5,.12,.5),vis,s*1.65,.9,.1,0,0,-s*.25);part(new THREE.BoxGeometry(.18,.5,.6),mid,s*.78,1.45,.3,0,s*.3,0);part(new THREE.CylinderGeometry(.02,.02,.9,4),dark,s*.35,2.55,-.1,0,0,-s*.2)});
 for(let i=0;i<3;i++)part(new THREE.BoxGeometry(.7,.05,.1),vis,0,.15-i*.12,.92);
 const gt=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
 const halo=(c,s,x,y,z)=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:gt,color:c,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,opacity:.7}));m.scale.set(s,s,1);m.position.set(x,y,z);mech.add(m);return m};
 const hv1=halo(0x7a55ff,2,0,1.62,.75),hv2=halo(0xff8a3d,1.2,0,.4,1.1);
 part(new THREE.CylinderGeometry(2.3,2.5,.2,6),dark,0,-.7,0);
 const holo=new THREE.Group();sc.add(holo);
 const orb=new THREE.Group();sc.add(orb);for(let i=0;i<8;i++){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.08+Math.random()*.06),mid),a=i/8*6.283;m.position.set(Math.cos(a)*3.2,.2+Math.random()*1.8,Math.sin(a)*3.2);m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edge));orb.add(m)}
 const hm=new THREE.MeshBasicMaterial({color:0x6ff5e0,transparent:true,opacity:.5,blending:THREE.AdditiveBlending});
 const ring=(r,t,s,y,z)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,t,4,s),hm);m.position.set(0,y,z);holo.add(m);return m};
 const r1=ring(2.8,.012,120,1,-1),r2=ring(3.1,.03,36,1,-1.2),scan=ring(1.9,.012,90,0,0);scan.rotation.x=Math.PI/2;
 const tags=[[-2.6,1.8,.8],[2.7,.9,.6],[-2.3,.2,1.2]].map((p,i)=>{const g=new THREE.PlaneGeometry(.9,.5);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0x6ff5e0,transparent:true,opacity:.1,side:2}));m.add(new THREE.LineSegments(new THREE.EdgesGeometry(g),edge));m.position.set(...p);m.userData.p=p;sc.add(m);hit.push(m);return m});
 const N=low?220:900,pg=new THREE.BufferGeometry(),pa=new Float32Array(N*3);for(let i=0;i<N*3;i++)pa[i]=(Math.random()-.5)*(i%3==1?8:16);
 pg.setAttribute('position',new THREE.BufferAttribute(pa,3));const pm=new THREE.PointsMaterial({color:0x6ff5e0,size:.035,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false});sc.add(new THREE.Points(pg,pm));
 window.recolor=()=>{const a=document.body.classList.contains('ov'),c=a?0xffb35c:0x6ff5e0;edge.color.setHex(c);hm.color.setHex(c);hv1.material.color.setHex(a?0xff8a3d:0x7a55ff);pm.color.setHex(c);vis.emissive.setHex(a?0xff8a3d:0x7a55ff)};
 window.setPose=s=>{pos.set(...s.cam);look.set(...s.look);kick=1};
 const ms=new THREE.Vector2(),rc=new THREE.Raycaster();let hv=null,pulse=0,kick=0;
 st.addEventListener('pointermove',e=>{const b=st.getBoundingClientRect();ms.set((e.clientX-b.left)/b.width*2-1,-((e.clientY-b.top)/b.height)*2+1)});
 st.addEventListener('click',e=>{if(e.target!==cv)return;if(hv){pulse=1;toast(hv===head||hv.geometry.type!=='PlaneGeometry'?'UNIT 07 // FROSTNOVA.SYS CORE RESPONDS':'HOLO NODE // DATA SLOT EMPTY')}});
 function size(){const w=st.clientWidth,h=st.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.fov=w/h<.9?60:42;cam.updateProjectionMatrix()}
 new ResizeObserver(size).observe(st);size();
 let on=true;document.addEventListener('visibilitychange',()=>{on=!document.hidden;if(on)tick()});
 const clock=new THREE.Clock();
 function tick(){if(!on)return;requestAnimationFrame(tick);const t=clock.getElapsedTime()*sp,dt=Math.min(clock.getDelta(),.05);
  mech.position.y=Math.sin(t*1.1)*.07;mech.rotation.y+=((ms.x*.35)-mech.rotation.y)*.05;head.rotation.x=ms.y*-.08;
  r1.rotation.z=t*.15;r2.rotation.z=-t*.1;scan.position.y=1+Math.sin(t*.8)*1.5;holo.children.forEach(m=>m.material.opacity=.45);
  cr.rotation.y=t*2;core.emissiveIntensity=.8+Math.sin(t*3)*.4+pulse*2;vis.emissiveIntensity=.8+pulse*2+(hv===head?.8:0);pulse*=.94;hv1.material.opacity=.55+Math.sin(t*2)*.1+pulse*.4;hv2.material.opacity=.5+Math.sin(t*3)*.25;orb.rotation.y=t*.2;
  tags.forEach((m,i)=>{m.position.y=m.userData.p[1]+Math.sin(t+i*2)*.12;m.lookAt(cam.position);m.material.opacity=hv===m?.35:.1});
  const a=pg.attributes.position;for(let i=1;i<N*3;i+=3){a.array[i]+=.004*sp;if(a.array[i]>4)a.array[i]=-4}a.needsUpdate=true;
  rc.setFromCamera(ms,cam);const h=rc.intersectObjects(hit,false)[0];hv=h?h.object:null;cv.style.cursor=hv?'pointer':'default';
  cam.position.lerp(new THREE.Vector3(pos.x+ms.x*.5,pos.y+ms.y*.3,pos.z),.045);lk.lerp(look,.05);
  if(kick>.01){kick*=.93;cam.fov=(cam.aspect<.9?60:42)+kick*7;cam.updateProjectionMatrix();cam.up.set(Math.sin(kick*.12),1,0);scan.scale.setScalar(1+kick*.3)}else cam.up.set(0,1,0);
  cam.lookAt(lk);R.render(sc,cam)}
 tick()}
