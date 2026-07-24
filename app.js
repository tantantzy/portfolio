
const $=(q,r=document)=>r.querySelector(q);
const $$=(q,r=document)=>[...r.querySelectorAll(q)];

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const id=link.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
    }
  });
});

const navLinks=$$('.navlinks a');
const sections=$$('section[id]');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{rootMargin:'-40% 0px -50% 0px'});
sections.forEach(s=>observer.observe(s));

$('#contactForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const subject=encodeURIComponent(form.subject.value.trim());
  const body=encodeURIComponent(
    `Name: ${form.name.value.trim()}\nEmail: ${form.email.value.trim()}\n\n${form.message.value.trim()}`
  );
  location.href=`mailto:tantantzy81@gmail.com?subject=${subject}&body=${body}`;
});

$('#copyEmail')?.addEventListener('click',async()=>{
  await navigator.clipboard.writeText('your-email@example.com');
  const button=$('#copyEmail');
  const old=button.textContent;
  button.textContent='Copied!';
  setTimeout(()=>button.textContent=old,1600);
});
