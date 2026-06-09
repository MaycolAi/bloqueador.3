window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',window.scrollY>40));
function toggleMobileNav(){document.getElementById('mobile-nav').classList.toggle('open')}

(function(){
  const canvas=document.getElementById('hero-canvas'),ctx=canvas.getContext('2d');
  let W,H,particles;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
  function spawn(){particles=Array.from({length:80},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+0.3,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,alpha:Math.random()*0.2+0.05}))}
  function draw(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(220,38,38,${p.alpha})`;ctx.fill()});requestAnimationFrame(draw)}
  resize();spawn();draw();window.addEventListener('resize',()=>{resize();spawn()});
})();

(function(){
  const fill=document.getElementById('mockup-fill'),alert=document.querySelector('.mockup-alert');
  if(!fill)return;
  let pct=0,blocked=false,waiting=false;
  setInterval(()=>{
    if(waiting)return;
    if(!blocked){pct=Math.min(pct+1.2,100);fill.style.width=pct+'%';
      if(pct>=100&&!blocked){blocked=true;alert.classList.add('show');waiting=true;
        setTimeout(()=>{pct=0;blocked=false;alert.classList.remove('show');fill.style.width='0%';setTimeout(()=>waiting=false,500)},4000)}}
  },60);
})();

let selectedPlan='starter';
function openModal(type){
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('modal').classList.add('open');
  document.querySelectorAll('.modal-panel').forEach(p=>p.classList.add('hidden'));
  const panel=document.getElementById('modal-'+type);
  if(panel)panel.classList.remove('hidden');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

function selectPlan(plan){
  selectedPlan=plan;
  document.querySelectorAll('.plan-option').forEach(el=>el.classList.remove('active'));
  document.getElementById('plan-'+plan).classList.add('active');
}

function handleLogin(){
  const email=document.getElementById('login-email').value.trim();
  const pass=document.getElementById('login-pass').value;
  if(!email||!pass){showToast('Completa todos los campos','error');return}
  if(!email.includes('@')){showToast('Correo no válido','error');return}
  const btn=document.querySelector('#modal-login .btn-modal-red');
  const txt=document.getElementById('login-btn-text');
  btn.disabled=true;txt.textContent='Iniciando sesión...';
  setTimeout(()=>{btn.disabled=false;txt.textContent='Iniciar sesión';showSuccess('Bienvenido de vuelta')},1800);
}

function handleRegister(){
  const name=document.getElementById('reg-name').value.trim();
  const email=document.getElementById('reg-email').value.trim();
  const pass=document.getElementById('reg-pass').value;
  if(!name||!email||!pass){showToast('Completa todos los campos','error');return}
  if(!email.includes('@')){showToast('Correo no válido','error');return}
  if(pass.length<8){showToast('Mínimo 8 caracteres en contraseña','error');return}
  const btn=document.querySelector('#modal-register .btn-modal-red');
  const txt=document.getElementById('reg-btn-text');
  btn.disabled=true;
  const price=selectedPlan==='pro'?'$12.99':'$5.99';
  txt.textContent=`Procesando pago ${price}/mes...`;
  setTimeout(()=>{btn.disabled=false;txt.textContent='Crear cuenta y pagar';showSuccess('Cuenta creada exitosamente')},2200);
}

function handleGoogleAuth(){
  showToast('Conectando con Google...','success');
  setTimeout(()=>showSuccess('Sesión iniciada con Google'),1500);
}

function showSuccess(msg){
  document.querySelectorAll('.modal-panel').forEach(p=>p.classList.add('hidden'));
  const s=document.getElementById('modal-success');
  s.classList.remove('hidden');
  s.querySelector('.modal-title').textContent=msg;
  const fill=document.getElementById('progress-fill');
  let w=0;
  const iv=setInterval(()=>{w=Math.min(w+2,100);fill.style.width=w+'%';if(w>=100){clearInterval(iv);setTimeout(()=>{closeModal();showToast('Redirigiendo al dashboard...','success')},400)}},25);
}

let toastTimer;
function showToast(msg,type=''){
  let toast=document.getElementById('global-toast');
  if(!toast){toast=document.createElement('div');toast.id='global-toast';toast.className='toast';document.body.appendChild(toast)}
  toast.className='toast '+type;
  const icon=type==='success'?'✓':type==='error'?'✕':'ℹ';
  toast.innerHTML=`<span>${icon}</span><span>${msg}</span>`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),3500);
}

function togglePass(id){const el=document.getElementById(id);if(el)el.type=el.type==='password'?'text':'password'}

(function(){
  const els=document.querySelectorAll('.step-card,.testi-card,.pricing-card,.feat-item');
  els.forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition=`opacity 0.5s ${i*0.08}s ease, transform 0.5s ${i*0.08}s ease`});
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target)}})},{threshold:0.1});
  els.forEach(el=>obs.observe(el));
})();
