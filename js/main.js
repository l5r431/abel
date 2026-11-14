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
if($("#fm"))$("#fm").onsubmit=async e=>{e.preventDefault();const f=e.target,b=f.querySelector("button");b.disabled=true;$("#err").hidden=true;
try{const r=await fetch(f.action,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}});if(!r.ok)throw 0;f.hidden=true;$("#ok").hidden=false;f.reset()}catch(_){$("#err").hidden=false}b.disabled=false};
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
