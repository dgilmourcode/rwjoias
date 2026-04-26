(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=0,t=[],n=[];async function r(){try{let e=await fetch(`./data.json`);if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);let r=await e.json();t=r.collections||[],n=r.galleryImages||[],console.log(`Dados carregados com sucesso:`,{collections:t.length,gallery:n.length}),i(),s()}catch(e){console.error(`Erro ao carregar dados:`,e),t=[],n=[]}}function i(){let e=document.getElementById(`collections-grid`);if(e){if(t.length===0){e.innerHTML=`<p class="text-center text-gray-500">Carregando coleções...</p>`;return}e.innerHTML=t.map(e=>`
        <div onclick="openModal('${e.id}')" class="collection-card reveal group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${e.image}" alt="${e.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
            </div>
            <div class="p-5">
                <h3 class="font-serif text-xl font-medium text-gray-800">${e.name}</h3>
                <p class="text-sm text-gold font-medium mt-1">Explorar <i class="fa-solid fa-arrow-right ml-1"></i></p>
            </div>
        </div>
    `).join(``)}}function a(e){let n=document.getElementById(`collection-modal`),r=t.find(t=>t.id===e);if(!r||!n){console.error(`Coleção não encontrada:`,e);return}let i=r.items;n.innerHTML=`
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()"></div>

            <div class="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in">
                
                <button onclick="closeModal()" class="absolute top-4 right-4 z-[110] w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>

                <div class="relative w-full md:w-3/5 bg-[#FBFBFD] h-[350px] md:h-auto overflow-hidden group">
                    <div class="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth" id="modal-slider">
                        ${i.map(e=>`
                            <div class="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-6">
                                <img src="${e.src}" alt="${e.titulo}" class="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-black/5" loading="lazy">
                            </div>
                        `).join(``)}
                    </div>
                    
                    <button onclick="scrollSlider(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 backdrop-blur-sm rounded-full hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onclick="scrollSlider(1)" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 backdrop-blur-sm rounded-full hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>

                <div class="w-full md:w-2/5 p-8 md:p-12 flex flex-col bg-white overflow-y-auto">
                    <div id="modal-info-content">
                        <span class="text-gold font-bold tracking-widest text-[10px] uppercase">Catálogo RW Joias</span>
                        <h2 id="dynamic-title" class="font-serif text-3xl mt-2 mb-2 text-gray-900">${i[0].titulo}</h2>
                        
                        <div class="mb-6">
                            <span id="dynamic-price" class="text-2xl font-semibold text-charcoal">${i[0].preco}</span>
                            <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Valor aproximado / Consulte gramatura</p>
                        </div>

                        <div class="space-y-3 mb-8">
                            <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p class="text-[9px] uppercase text-gray-400 font-bold">Descrição</p>
                                    <p id="dynamic-material" class="text-sm font-medium text-gray-800">${i[0].material}</p>
                                </div>
                                <i class="fa-solid fa-gem text-gold/50"></i>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p class="text-[9px] uppercase text-gray-400 font-bold">Disponibilidade</p>
                                    <p id="dynamic-status" class="text-sm font-medium text-green-600">${i[0].disponibilidade}</p>
                                </div>
                                <i class="fa-solid fa-circle-check text-green-500/30"></i>
                            </div>
                        </div>
                    </div>

                    <div class="mt-auto pt-6 border-t border-gray-100">
                        <a id="whatsapp-link" href="#" target="_blank" 
                           class="w-full bg-black text-white py-4 rounded-full text-sm font-bold hover:bg-gold transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 active:scale-95">
                            <i class="fa-brands fa-whatsapp text-lg"></i> Finalizar Compra
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `,n.classList.remove(`hidden`),document.body.style.overflow=`hidden`,o(r)}function o(e){let t=document.getElementById(`modal-slider`);if(!t)return;let n=()=>{let n=Math.round(t.scrollLeft/t.offsetWidth),r=e.items[n];if(r){document.getElementById(`dynamic-title`).textContent=r.titulo,document.getElementById(`dynamic-price`).textContent=r.preco,document.getElementById(`dynamic-material`).textContent=r.material,document.getElementById(`dynamic-status`).textContent=r.disponibilidade;let e=`*NOTA DE PEDIDO - RW JOIAS*%0A%0A*Nome:* ${r.titulo}%0A*Preço:* ${r.preco}%0A*Descrição:* ${r.material}%0A*Status:* ${r.disponibilidade}%0A%0A--------------------------------%0AOlá! Gostaria de finalizar a compra deste item.`,t=document.getElementById(`whatsapp-link`);t.href=`https://wa.me/5586994888666?text=${e}`}};t.addEventListener(`scroll`,n),n()}window.scrollSlider=e=>{let t=document.getElementById(`modal-slider`);t&&t.scrollBy({left:e*t.offsetWidth,behavior:`smooth`})},window.closeModal=()=>{let e=document.getElementById(`collection-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``)};function s(){let e=document.getElementById(`gallery-horizontal`);if(e){if(n.length===0){e.innerHTML=`<p class="text-center text-gray-500">Carregando galeria...</p>`;return}e.innerHTML=n.map((e,t)=>`
        <div onclick="openLightbox(${t})" class="gallery-item-horizontal reveal cursor-pointer overflow-hidden rounded-xl">
            <img src="${e}" alt="Galeria ${t+1}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy">
        </div>
    `).join(``)}}function c(t){e=t;let n=document.getElementById(`lightbox-modal`),r=document.getElementById(`lightbox-image`);!n||!r||(n.classList.remove(`hidden`),n.classList.add(`flex`),document.body.style.overflow=`hidden`,l())}function l(){let t=document.getElementById(`lightbox-image`),r=document.getElementById(`lightbox-counter`);t&&(t.src=n[e],r&&(r.textContent=`${e+1} / ${n.length}`))}window.navigateLightbox=t=>{e=(e+t+n.length)%n.length,l()},window.closeLightbox=()=>{let e=document.getElementById(`lightbox-modal`);e&&(e.classList.add(`hidden`),e.classList.remove(`flex`),document.body.style.overflow=``)},document.addEventListener(`DOMContentLoaded`,()=>{r();let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t))},100)}),window.openModal=a,window.closeModal=closeModal,window.openLightbox=c,window.closeLightbox=closeLightbox,window.navigateLightbox=window.navigateLightbox,window.scrollSlider=window.scrollSlider;