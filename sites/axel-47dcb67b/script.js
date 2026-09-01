document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}});});

const cards=document.querySelectorAll('.interest');
cards.forEach(card=>card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*2}deg) rotateX(${-y*2}deg)`;}));
cards.forEach(card=>card.addEventListener('mouseleave',()=>card.style.transform=''));
