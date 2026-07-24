const toggle=document.querySelector('.theme-toggle');
const stored=localStorage.getItem('projexa-theme');
if(stored==='dark') document.body.classList.add('dark');
toggle.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('projexa-theme',document.body.classList.contains('dark')?'dark':'light')});
let dragged=null;
document.querySelectorAll('.ticket').forEach(ticket=>{
  ticket.addEventListener('dragstart',()=>{dragged=ticket;setTimeout(()=>ticket.style.opacity='.45',0)});
  ticket.addEventListener('dragend',()=>{ticket.style.opacity='1';dragged=null;document.querySelectorAll('.dropzone').forEach(z=>z.classList.remove('over'))});
});
document.querySelectorAll('.dropzone').forEach(zone=>{
  zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('over')});
  zone.addEventListener('dragleave',()=>zone.classList.remove('over'));
  zone.addEventListener('drop',e=>{e.preventDefault();if(dragged){zone.appendChild(dragged);const col=zone.closest('.column');col.querySelector('small').textContent=zone.querySelectorAll('.ticket').length;}zone.classList.remove('over')});
});