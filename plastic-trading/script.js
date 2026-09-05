document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('nav');
  const menu=document.querySelector('.menu-toggle');
  if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));}
  document.querySelectorAll('.nav-drop-toggle').forEach(t=>t.addEventListener('click',e=>{
    if(window.innerWidth<=900){e.preventDefault();t.parentElement.classList.toggle('open');}
  }));
  const modal=document.getElementById('quoteModal');
  const open=()=>{if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>modal.querySelector('input')?.focus(),50)};
  const close=()=>{if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
  document.querySelectorAll('a[href="#quoteModal"],a[href="contact.html#contact-form"],.js-quote').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();open()}));
  document.querySelectorAll('[data-close-quote]').forEach(el=>el.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  const form=document.getElementById('quoteForm');
  if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent('Website Quote Request - Green Line Plastic Trading LLC');const body=encodeURIComponent(`Name: ${d.get('name')}\nCompany: ${d.get('company')}\nPhone: ${d.get('phone')}\nEmail: ${d.get('email')}\n\nProduct / Requirement:\n${d.get('message')}`);window.location.href=`mailto:sales@greenlinepack.com?subject=${subject}&body=${body}`;});
});


// Advanced products catalogue filters
(function(){
  const tabs=document.querySelectorAll('.catalog-tab');
  const cards=document.querySelectorAll('.catalog-card');
  const search=document.getElementById('productSearch');
  const empty=document.getElementById('catalogEmpty');
  if(!tabs.length) return;
  let filter='all';
  function render(){
    const q=(search?.value||'').trim().toLowerCase(); let visible=0;
    cards.forEach(card=>{
      const matchFilter=filter==='all'||card.dataset.category===filter;
      const matchSearch=!q||(card.dataset.name||'').toLowerCase().includes(q)||card.textContent.toLowerCase().includes(q);
      const show=matchFilter&&matchSearch; card.style.display=show?'flex':'none'; if(show) visible++;
    });
    if(empty) empty.style.display=visible?'none':'block';
  }
  tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');filter=tab.dataset.filter;render();}));
  search?.addEventListener('input',render); render();
})();
