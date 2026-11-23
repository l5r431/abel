const $=s=>document.querySelector(s),root=document.documentElement,main=$("#main"),veh=$("#veh"),pgs=["home","about","gallery","contact"];
/* icons: <i data-i="name"></i> drawn via CSS mask */
const IC={cam:"<path d='M4 8h3l2-3h6l2 3h3v11H4z'/><circle cx='12' cy='13' r='3.5'/>",sun:"<circle cx='12' cy='12' r='4'/><path d='M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2'/>",moon:"<path d='M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z'/>",mail:"<rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/>",pin:"<path d='M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z'/><circle cx='12' cy='10' r='2.5'/>",phone:"<path d='M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z'/>",ig:"<rect x='3' y='3' width='18' height='18' rx='5'/><circle cx='12' cy='12' r='4'/><circle cx='17.5' cy='6.5' r='.6'/>",arr:"<path d='M5 12h14M13 6l6 6-6 6'/>",heart:"<path d='M12 20s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z'/>",mtn:"<path d='M3 19l6-10 4 6 3-4 5 8z'/>",star:"<path d='M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.3l6-.7z'/>",wa:"<path d='M3 21l1.7-5A9 9 0 1 1 8 19.4z'/><path d='M9 8c0 4 3 7 7 7l1.2-1.6-2.3-1.2-1 .9a5 5 0 0 1-2.4-2.4l.9-1L11 7z'/>",tt:"<path d='M14 3v11a3.5 3.5 0 1 1-3.5-3.5'/><path d='M14 3c.4 2.6 2.1 4.2 5 4.4'/>",user:"<circle cx='12' cy='8' r='4'/><path d='M4 21c0-4 4-6 8-6s8 2 8 6'/>",sld:"<path d='M4 7h10M18 7h2M4 17h2M10 17h10'/><circle cx='16' cy='7' r='2'/><circle cx='8' cy='17' r='2'/>",cal:"<rect x='3' y='5' width='18' height='16' rx='2'/><path d='M3 10h18M8 3v4M16 3v4'/>",chk:"<path d='M20 6L9 17l-5-5'/>",home:"<path d='M3 11l9-8 9 8'/><path d='M5 10v10h5v-6h4v6h5V10'/>",img:"<rect x='3' y='4' width='18' height='16' rx='2'/><circle cx='9' cy='10' r='1.8'/><path d='M3 17l5-4 4 3 3-2 6 4'/>"};
const icons=()=>document.querySelectorAll("i[data-i]").forEach(e=>e.style.setProperty("--m",`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#000' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'>${IC[e.dataset.i]}</svg>`)}")`));
document.querySelectorAll(".hero").forEach(h=>h.insertAdjacentHTML("afterbegin","<div class=sun></div><div class=mt></div><div class=mt></div>"));
icons();
/* theme switch with circular reveal */
$("#th").onclick=e=>{const t=root.dataset.theme==="dark"?"light":"dark",r=e.currentTarget.getBoundingClientRect();
root.style.setProperty("--x",r.left+r.width/2+"px");root.style.setProperty("--y",r.top+r.height/2+"px");
const ap=()=>{root.dataset.theme=t;try{localStorage.setItem("abel-theme",t)}catch(_){}};
document.startViewTransition?document.startViewTransition(ap):ap()};
/* bottom tab bar (mobile): on press the pill glides from the focused tab to the pressed one, then the page slides out and the next slides in */
const tb=$(".tabs"),ind=$(".ind"),tabs=[...tb.querySelectorAll("a")],cI=tabs.findIndex(a=>a.classList.contains("on")),mob=()=>getComputedStyle(tb).display!=="none";
try{const v=sessionStorage.getItem("abel-prev");sessionStorage.removeItem("abel-prev");if(v!==null&&+v!==cI&&mob())document.body.dataset.dir=cI>+v?"r":"l"}catch(_){}
tabs.forEach((a,i)=>a.addEventListener("click",e=>{if(e.metaKey||e.ctrlKey||!mob())return;e.preventDefault();if(i===cI)return scrollTo({top:0,behavior:"smooth"});
ind.style.setProperty("--ti",i);tabs.forEach((t,k)=>t.classList.toggle("on",k===i));
try{sessionStorage.setItem("abel-prev",cI)}catch(_){}document.body.dataset.out=i>cI?"l":"r";setTimeout(()=>location.href=a.href,380)}));
addEventListener("pageshow",e=>{if(e.persisted){document.body.removeAttribute("data-out");ind.style.setProperty("--ti",cI);tabs.forEach((t,k)=>t.classList.toggle("on",k===cI))}});
/* gallery filter, lightbox, form */
if($("#chips"))$("#chips").onclick=e=>{const b=e.target.closest("button");if(!b)return;document.querySelectorAll("#chips button").forEach(x=>x.classList.toggle("on",x===b));
document.querySelectorAll("#ms .t").forEach(t=>t.style.display=b.textContent==="All"||t.dataset.c===b.textContent?"":"none")};
const lb=$("#lb"),lbf=$("#lbf");
document.addEventListener("click",e=>{const t=e.target.closest(".t");if(!t)return;lbf.style.cssText=t.style.cssText;lbf.innerHTML=t.innerHTML;lbf.querySelector("img").loading="eager";lb.classList.add("on");
const a=t.getBoundingClientRect(),b=lbf.getBoundingClientRect();lbf.animate([{transform:`translate(${a.left-b.left}px,${a.top-b.top}px) scale(${a.width/b.width},${a.height/b.height})`},{transform:"none"}],{duration:480,easing:"cubic-bezier(.2,.8,.2,1)"})});
lb.onclick=()=>lb.classList.remove("on");addEventListener("keydown",e=>e.key==="Escape"&&lb.classList.remove("on"));
/* Formspree: set your form ID in the <form action="https://formspree.io/f/..."> in index.html */
document.querySelectorAll("form[data-ajax]").forEach(f=>f.onsubmit=async e=>{e.preventDefault();const b=f.querySelector("button"),er=f.querySelector(".ferr"),ok=f.parentElement.querySelector(".fok");b.disabled=true;er.hidden=true;
try{const r=await fetch(f.action,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}});if(!r.ok)throw 0;f.hidden=true;ok.hidden=false;f.reset()}catch(_){er.hidden=false}b.disabled=false});
/* reveals + counters */
const count=el=>{const n=+el.dataset.n,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1600);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+(p>=1?el.dataset.s||"":"");p<1&&requestAnimationFrame(f)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll("[data-n]").forEach(count);io.unobserve(e.target)}}),{threshold:.15});
/* dotted trail + kite / paper plane: a different path and vehicle per page */
const F={
home:(t,W,H)=>[W*(.5+.33*Math.sin(t*H/170)),t*H],
about:(t,W,H)=>{const a=t*H/230;return[W*(.5+.3*Math.sin(a)*Math.cos(a*.37)),t*H]},
gallery:(t,W,H)=>{const R=Math.min(90,W*.14),a=t*H/(R*.8);return[W*(.5+.22*Math.sin(t*H/650))+R*Math.sin(a),t*H+R*Math.cos(a)]},
contact:(t,W,H)=>[W*(.5+.38*(1-.85*t)*Math.sin(t*H/180)),t*H]};
const PLANE="<path d='M20 0L-14-12-6 0z'/><path d='M20 0L-6 0-14 12z' opacity='.6'/>",KITE="<path class='tail' d='M0 22q-9 10 0 18t0 18t0 18' fill='none' stroke='currentColor' stroke-width='1.6'/><path d='M0-24L15-4 0 22-15-4z'/><path d='M0-24V22M-15-4H15' stroke='var(--bg)' stroke-width='1.2'/>";
const V={home:PLANE,about:KITE,gallery:PLANE,contact:KITE},KT={about:1,contact:1};
let cur="home",pts=[],H=1,cp=0,run=0,lx=-1;
/* Pinterest-style masonry on a CSS grid: each tile spans rows according to its aspect ratio */
function masonry(){const g=$("#ms");if(!g||g.offsetParent===null)return;const cs=getComputedStyle(g),n=cs.gridTemplateColumns.split(" ").length,gap=parseFloat(cs.columnGap)||16,cw=(g.clientWidth-gap*(n-1))/n;
g.querySelectorAll(".t").forEach(t=>t.style.gridRowEnd="span "+Math.ceil((cw/parseFloat(t.style.getPropertyValue("--r"))+gap)/8))}
function build(){masonry();const w=main.clientWidth,N=300;H=main.clientHeight;pts=[];
for(let i=0;i<=N;i++)pts.push(F[cur](i/N,w,H));
const d="M"+pts.map(p=>p[0].toFixed(0)+" "+p[1].toFixed(0)).join("L");
["s0","s1"].forEach(id=>$("#"+id).setAttribute("viewBox",`0 0 ${w} ${H}`));$("#p0").setAttribute("d",d);$("#p1").setAttribute("d",d);
$("#vg").innerHTML=V[cur];lx=-1;kick()}
/* the animation loop only runs while the vehicle is catching up with the scroll */
function kick(){if(!run){run=1;requestAnimationFrame(tick)}}
function tick(){if(pts.length<3){run=0;return}const t=Math.min(1,Math.max(0,(scrollY+innerHeight*.4)/H)),dl=t-cp;cp+=dl*.12;
const N=pts.length-1,f=cp*N,i=Math.min(N-1,f|0),u=f-i,a=pts[i],b=pts[i+1],x=a[0]+(b[0]-a[0])*u,y=a[1]+(b[1]-a[1])*u;
const p=pts[Math.min(N,i+3)],q=pts[Math.max(0,i-3)],ang=Math.atan2(p[1]-q[1],p[0]-q[0])*180/Math.PI;
veh.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${(KT[cur]?(ang-90)*.5:ang).toFixed(1)}deg)`;
const cy=Math.round(y);if(cy!==lx){lx=cy;$("#s1").style.clipPath=`inset(0 0 ${Math.max(0,H-cy)}px 0)`}
Math.abs(dl)>.0004?requestAnimationFrame(tick):run=0}
addEventListener("scroll",kick,{passive:true});
/* testimonials (static HTML): switch buttons + auto-advance every 5s */
let ti=0,tt;const TN=document.querySelectorAll("#ts blockquote").length;
function show(i){ti=(i+TN)%TN;document.querySelectorAll("#ts blockquote,#td button").forEach((el,k)=>el.classList.toggle("on",k%TN===ti))}
const auto=()=>{clearInterval(tt);tt=setInterval(()=>show(ti+1),5000)};
if(TN){$("#tp").onclick=()=>{show(ti-1);auto()};$("#tx").onclick=()=>{show(ti+1);auto()};
$("#td").onclick=e=>{const k=[...$("#td").children].indexOf(e.target.closest("button"));if(k>-1){show(k);auto()}};
if(matchMedia("(hover:hover)").matches){$("#tc").onmouseenter=()=>clearInterval(tt);$("#tc").onmouseleave=()=>auto()}
show(0);auto()}
/* init: every page is a real HTML file; <body data-page> picks the trail and reveal style */
cur=document.body.dataset.page;
document.querySelectorAll(".rv").forEach((el,i)=>{el.style.setProperty("--s",i%2?1:-1);io.observe(el)});
document.querySelectorAll("[data-n]").forEach(n=>n.textContent=0);
new ResizeObserver(build).observe(main);document.fonts&&document.fonts.ready.then(build);build();
/* solid camera: ONE small <canvas>, plain 3D maths (depth-sorted, shaded, fully opaque polygons; no DOM layers). It redraws only while the page scrolls and each page spins its own way */
{
const cv=document.createElement("canvas"),ctx=cv.getContext("2d"),R=270,D=1500,TAU=Math.PI*2,rd=Math.PI/180,LT=[-.35,-.55,.76];
cv.className="cam3d";cv.setAttribute("aria-hidden","true");document.body.append(cv);
/* the page fades/slides in for ~0.6s and in that time the browser layers it ABOVE the camera, so the camera stays hidden until the animation ends, then fades in */
{const pe=document.querySelector(".page"),show=()=>cv.classList.add("on");
 if(!pe||getComputedStyle(pe).animationName==="none")show();else pe.addEventListener("animationend",e=>{if(e.target===pe)show()});
 setTimeout(show,1000);addEventListener("pageshow",e=>{if(e.persisted)show()})}
/* [axis,deg] list, outermost first (same order CSS would apply them) */
const spin={home:c=>[["x",-12+Math.sin(c*Math.PI*6)*7],["y",-28+c*900]],about:c=>[["z",c*720],["x",-14],["y",-28+c*180]],gallery:c=>[["x",-c*720],["y",-28]],contact:c=>[["x",c*720],["y",-28]]}[document.body.dataset.page]||(c=>[["y",c*720]]);
const ring=(cx,cy,z,r,n=24)=>Array.from({length:n},(_,k)=>{const a=k/n*TAU;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r,z]});
const rc=(x0,x1,y0,y1,z)=>[[x0,y0,z],[x1,y0,z],[x1,y1,z],[x0,y1,z]];
const ringY=(cx,y,cz,r,n=24)=>Array.from({length:n},(_,k)=>{const a=k/n*TAU;return[cx+Math.cos(a)*r,y,cz+Math.sin(a)*r]});
const box=(x0,x1,y0,y1,z0,z1)=>[
{n:[0,0,1],p:[[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]]},{n:[0,0,-1],p:[[x1,y0,z0],[x0,y0,z0],[x0,y1,z0],[x1,y1,z0]]},
{n:[1,0,0],p:[[x1,y0,z1],[x1,y0,z0],[x1,y1,z0],[x1,y1,z1]]},{n:[-1,0,0],p:[[x0,y0,z0],[x0,y0,z1],[x0,y1,z1],[x0,y1,z0]]},
{n:[0,-1,0],p:[[x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1]]},{n:[0,1,0],p:[[x0,y1,z1],[x1,y1,z1],[x1,y1,z0],[x0,y1,z0]]}];
const cyl=(z0,z1,r,seg=26)=>{const f=[];for(let i=0;i<seg;i++){const a=i/seg*TAU,b=(i+1)/seg*TAU,m=(a+b)/2;
 f.push({s:1,n:[Math.cos(m),Math.sin(m),0],p:[[Math.cos(a)*r,Math.sin(a)*r,z0],[Math.cos(b)*r,Math.sin(b)*r,z0],[Math.cos(b)*r,Math.sin(b)*r,z1],[Math.cos(a)*r,Math.sin(a)*r,z1]]})}
 f.push({n:[0,0,1],p:ring(0,0,z1,r,seg)},{n:[0,0,-1],p:ring(0,0,z0,r,seg).reverse()});return f};
/* body, with the small flat details that belong to a face (drawn only while that face is turned toward you) */
const body=box(-180,180,-110,110,-75,75);
body[0].d=[{p:rc(100,146,-90,-68,75),k:"c1"},{p:ring(-143,-83,75,7,14),k:"cg"}];
body[1].d=[{p:rc(-62,150,-82,80,-75),k:"bz"},{p:ring(-133,-47,-75,13,18),k:"c2"},{p:ring(-133,3,-75,13,18),k:"c2"}];
body[2].d=[{p:[[180,-94,59],[180,-94,-59],[180,94,-59],[180,94,59]],dash:1}];
body[4].d=[{p:ringY(-106,-110,-20,30,26),k:"c2"},{p:ringY(118,-110,-15,17,18),k:"c1"}];
const lensFront=cyl(148,168,84);
lensFront[lensFront.length-2].d=[{p:ring(0,0,168,68),k:"cg"},{p:ring(0,0,168,44,24),k:"c1"},{p:ring(0,0,168,14,16),k:"cg"},{p:ring(-26,-26,168,9,12),k:"gd"}];
const solids=[{c:[0,0,0],f:body},{c:[0,-135,0],f:box(-60,60,-160,-110,-45,45).slice(0,5)},
 {c:[0,0,80],f:cyl(75,84,104,34)},{c:[0,0,96],f:cyl(84,108,86)},{c:[0,0,111],f:cyl(108,114,92)},{c:[0,0,128],f:cyl(114,142,86)},{c:[0,0,145],f:cyl(142,148,92)},{c:[0,0,158],f:lensFront}];
/* back screen: a tiny "photo" (flat-colour polygons, changes as you scroll) with camera UI on top. (u,v) = 0..200 x 0..150 seen from behind the camera */
const U=(u,v)=>[144-u,v-76,-76],hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const lerp=(a,b,t)=>"#"+hx(a).map((v,i)=>Math.round(v+(hx(b)[i]-v)*t).toString(16).padStart(2,"0")).join("");
const poly=(a,col)=>[a.map(q=>U(q[0],q[1])),col];
const circ=(u,v,r,col,n=16)=>poly(Array.from({length:n},(_,k)=>[u+Math.cos(k/n*TAU)*r,v+Math.sin(k/n*TAU)*r]),col);
const sky=(c0,c1,h,n=9)=>Array.from({length:n},(_,i)=>poly([[0,h*i/n],[200,h*i/n],[200,h*(i+1)/n+.6],[0,h*(i+1)/n+.6]],lerp(c0,c1,i/(n-1))));
const FAR=[[0,112],[0,84],[30,64],[55,88],[85,58],[120,92],[150,70],[200,98],[200,112]],NEAR=[[0,128],[0,102],[40,84],[75,112],[110,94],[160,116],[200,100],[200,128]],GND=[[0,126],[200,126],[200,150],[0,150]];
const hills=(far,near,gnd)=>[poly(FAR,far),poly(NEAR,near),poly(GND,gnd)];
const city=()=>{const o=[],b=[[8,24,44],[34,18,62],[54,26,36],[84,20,70],[108,24,48],[136,18,76],[158,30,40]];
 b.forEach(([u,w,h],i)=>{o.push(poly([[u,126-h],[u+w,126-h],[u+w,126],[u,126]],"#0e0b18"));
  for(let r=0;r<Math.floor(h/12);r++)for(let k=0;k<Math.floor(w/9);k++)if((i*7+r*5+k*3)%4<2)o.push(poly([[u+3+k*9,126-h+4+r*12],[u+7+k*9,126-h+4+r*12],[u+7+k*9,126-h+9+r*12],[u+3+k*9,126-h+9+r*12]],"#f2c46a"))});
 return o};
const scenes=[
 [...sky("#4a3350","#f0b862",114),circ(140,90,15,"#fbefc4"),...hills("#9a6258","#4a2a28","#1d1311")],
 [...sky("#14213d","#7d9ac4",114),circ(52,44,9,"#eef2f8"),...hills("#3b4a6e","#18223a","#0c111d")],
 [...sky("#161229","#7b4a66",126),circ(168,30,7,"#f3ead6"),...city(),poly(GND,"#09070f")]];
const ui=[poly([[0,137],[200,137],[200,150],[0,150]],"#111"),circ(10,10,3.2,"#e0ac5c"),poly([[176,6],[194,6],[194,13],[176,13]],null),
 ...[0,1,2].map(i=>poly([[178+i*5.4,8],[181.6+i*5.4,8],[181.6+i*5.4,11],[178+i*5.4,11]],"#f4efe6")),
 ...Array.from({length:11},(_,k)=>poly([[20+k*16,139.5],[21.4+k*16,139.5],[21.4+k*16,k===5?146:144],[20+k*16,k===5?146:144]],"#f4efe6")),
 poly([[8,139.5],[30,139.5],[30,141.4],[8,141.4]],"#9d978c")];
const brk=[[[72,58],[72,48],[82,48]],[[118,48],[128,48],[128,58]],[[128,82],[128,92],[118,92]],[[82,92],[72,92],[72,82]]].map(l=>l.map(q=>U(q[0],q[1])));
let S=1,DPR=1,col={},c1=[0,0,0],c2=[0,0,0],cur=0,tgt=0,raf=0;
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const getCol=()=>{const s=getComputedStyle(document.documentElement);["c1","c2","cl","cg","cgd"].forEach(k=>col[k]=s.getPropertyValue("--"+k).trim());c1=rgb(col.c1);c2=rgb(col.c2)};
const size=()=>{const css=innerWidth<700?400:800;DPR=Math.min(devicePixelRatio||1,1.5);cv.style.width=cv.style.height=css+"px";cv.width=cv.height=Math.round(css*DPR);S=css/(2*R)};
const draw=c=>{
 const m=spin(c).reverse(),T=(p,t)=>{let[x,y,z]=p;for(const[a,d]of m){const q=d*rd,co=Math.cos(q),si=Math.sin(q);
  if(a==="x")[y,z]=[y*co-z*si,y*si+z*co];else if(a==="y")[x,z]=[x*co+z*si,-x*si+z*co];else[x,y]=[x*co-y*si,x*si+y*co]}return t?[x,y,z]:[x*D/(D-z),y*D/(D-z),z]};
 const shade=n=>{const l=Math.max(0,n[0]*LT[0]+n[1]*LT[1]+n[2]*LT[2]),t=.25+.75*l;return`rgb(${c1.map((v,i)=>Math.round(v+(c2[i]-v)*t))})`};
 ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,cv.width,cv.height);
 ctx.translate(R*S,R*S);ctx.scale(S,S);ctx.lineWidth=1.4/S;ctx.lineJoin="round";
 const path=p=>{ctx.beginPath();p.forEach((q,i)=>{const[x,y]=T(q);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath()};
 const dk={c1:col.c1,c2:col.c2,cg:col.cg,gd:col.cgd,bz:"#141312"};
 solids.map(s=>({s,z:T(s.c,1)[2]})).sort((a,b)=>a.z-b.z).forEach(({s})=>s.f.forEach(f=>{
  const n=T(f.n,1);if(n[2]<=0)return;
  path(f.p);ctx.fillStyle=shade(n);ctx.fill();
  if(f.s){ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=.9/S;ctx.stroke();ctx.lineWidth=1.4/S}else{ctx.strokeStyle=col.cl;ctx.stroke()}
  (f.d||[]).forEach(d=>{path(d.p);if(d.k){ctx.fillStyle=dk[d.k];ctx.fill()}ctx.setLineDash(d.dash?[6/S,5/S]:[]);ctx.strokeStyle=col.cl;ctx.stroke();ctx.setLineDash([])});
  if(f===body[1]){const fillP=([p,k])=>{path(p);if(k){ctx.fillStyle=k;ctx.fill()}};
   /* the photo is blended toward the page tone so headings that pass over the camera stay readable */
   const base=document.documentElement.dataset.theme==="dark"?c1:c2,soft=([p,k])=>fillP([p,`rgb(${hx(k).map((v,i)=>Math.round(v+(base[i]-v)*.6))})`]);
   scenes[Math.floor(c*6)%3].forEach(soft);ui.forEach(fillP);
   ctx.strokeStyle="#f4efe6";ctx.lineWidth=1.2/S;ctx.lineCap="round";path(ui[2][0]);ctx.stroke();
   brk.forEach(l=>{ctx.beginPath();l.forEach((q,i)=>{const[x,y]=T(q);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()});ctx.lineWidth=1.4/S}}));
};
const calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const prog=()=>{const m=document.documentElement.scrollHeight-innerHeight;return m>0?Math.min(1,scrollY/m):0};
const tick=()=>{cur+=(tgt-cur)*.1;draw(cur);raf=Math.abs(tgt-cur)>.0004?requestAnimationFrame(tick):0};
const go=()=>{tgt=prog();if(calm){cur=tgt;draw(cur);return}raf||(raf=requestAnimationFrame(tick))};
addEventListener("scroll",go,{passive:true});
addEventListener("resize",()=>{size();tgt=prog();draw(cur)});
new MutationObserver(()=>{getCol();draw(cur)}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
size();getCol();tgt=cur=prog();draw(cur);
}
