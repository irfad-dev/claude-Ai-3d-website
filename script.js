/* ── CURSOR ── */
const dot=document.getElementById('dot');
const ring=document.getElementById('ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx+'px';dot.style.top=my+'px';
});
(function raf(){
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(raf);
})();

/* ── CANVAS STARS ── */
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
const stars=Array.from({length:220},()=>({
  x:Math.random()*window.innerWidth,
  y:Math.random()*window.innerHeight,
  r:Math.random()*1.3+.2,
  a:Math.random(),
  spd:Math.random()*.006+.002
}));
function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{
    s.a+=s.spd;if(s.a>1||s.a<0)s.spd*=-1;
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${s.a*.65})`;ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* ── ROBOT PARALLAX ── */
const robot=document.getElementById('robot');
const heroSec=document.getElementById('hero');
heroSec.addEventListener('mousemove',e=>{
  const b=heroSec.getBoundingClientRect();
  const px=(e.clientX-b.left)/b.width-.5;
  const py=(e.clientY-b.top)/b.height-.5;
  robot.style.animationPlayState='paused';
  robot.style.transform=`rotateX(${py*-22}deg) rotateY(${px*26}deg) translateY(${py*-8}px)`;
});
heroSec.addEventListener('mouseleave',()=>{
  robot.style.animationPlayState='running';
  robot.style.transform='';
});

/* ── SCROLL REVEAL ── */
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('vis');
      // trigger child reveals
      e.target.querySelectorAll('.reveal').forEach((el,i)=>{
        setTimeout(()=>el.classList.add('vis'),i*70);
      });
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal,.s-eyebrow,.s-title,.cap-cell,.proc-step,.stat-cell,.d-point,.chat-win,.cta-h,.cta-body,.cta-actions,.cta-note').forEach(el=>revObs.observe(el));