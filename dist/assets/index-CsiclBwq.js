(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=0,t=0,n=[],r=[],i=null,a=document.getElementById(`mobile-menu-btn`),o=document.getElementById(`mobile-menu`);a&&o&&(a.addEventListener(`click`,()=>{o.classList.toggle(`hidden`)}),o.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{o.classList.add(`hidden`)})}));function s(){i&&i.disconnect(),i=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`active`),i.unobserve(e.target))})},{threshold:.05,rootMargin:`0px 0px -50px 0px`}),document.querySelectorAll(`.reveal`).forEach(e=>{i.observe(e);let t=e.getBoundingClientRect();t.top<window.innerHeight&&t.bottom>0&&e.classList.add(`active`)})}async function c(){let e=document.getElementById(`collections-grid`);console.log(`🔄 Iniciando loadData...`),console.log(`📍 BASE_URL:`,`/rwjoias/`),e&&(e.innerHTML=`
      <div class="col-span-full flex flex-col items-center justify-center py-20 gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
        <p class="text-charcoal/50 font-medium animate-pulse">Carregando coleções...</p>
      </div>
    `);try{let e=`./data.json`;console.log(`📦 Buscando JSON em:`,e);let t=await fetch(e,{method:`GET`,headers:{"Content-Type":`application/json`,Accept:`application/json`},cache:`no-cache`});if(console.log(`📊 Status:`,t.status),console.log(`📊 OK?`,t.ok),!t.ok)throw Error(`HTTP ${t.status}: ${t.statusText}`);let i=await t.json();console.log(`✅ JSON parseado:`,i),console.log(`📊 Collections:`,i.collections?.length),console.log(`📊 Gallery:`,i.galleryImages?.length),(!i.collections||i.collections.length===0)&&console.warn(`⚠️ AVISO: collections está vazio ou não existe!`),(!i.galleryImages||i.galleryImages.length===0)&&console.warn(`⚠️ AVISO: galleryImages está vazio ou não existe!`),n=i.collections||[],r=i.galleryImages||[],console.log(`🎨 Chamando renderCollections...`),l(),console.log(`🎨 Chamando renderGallery...`),f(),setTimeout(()=>{s(),console.log(`✅ Observer reconfigurado após renderização!`)},100),console.log(`✅ Renderização concluída!`)}catch(t){console.error(`❌ ERRO FATAL:`,t),console.error(`📋 Stack:`,t.stack),e&&(e.innerHTML=`
        <div class="col-span-full text-center py-20">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <i class="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
          </div>
          <h3 class="font-serif text-2xl text-charcoal mb-2">Erro ao carregar</h3>
          <p class="text-charcoal/60 mb-4">Verifique o console para detalhes</p>
          <button onclick="location.reload()" 
                  class="px-6 py-3 bg-gold text-charcoal rounded-full hover:bg-gold-light transition-colors">
            🔄 Tentar Novamente
          </button>
        </div>
      `)}}function l(){let e=document.getElementById(`collections-grid`);if(console.log(`🔍 renderCollections chamada`),console.log(`🔍 grid existe?`,!!e),console.log(`🔍 collections.length:`,n.length),!e){console.error(`❌ Elemento #collections-grid NÃO encontrado!`);return}if(!n.length){console.warn(`⚠️ collections está vazio!`),e.innerHTML=`<p class="text-center text-charcoal/50">Nenhuma coleção disponível</p>`;return}console.log(`✅ Renderizando`,n.length,`coleções...`);try{e.innerHTML=n.map((e,t)=>(console.log(`  📦 Collection ${t+1}:`,e.name,`| ID:`,e.id),`
        <div onclick="openModal('${e.id}')" 
             class="collection-card reveal group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${e.image}" 
                     alt="${e.name}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     loading="${t===0?`eager`:`lazy`}"
                     ${t===0?`fetchpriority="high"`:``}>
            </div>
            <div class="p-5">
                <h3 class="font-serif text-xl font-medium text-gray-800">${e.name}</h3>
                <p class="text-sm text-gold font-medium mt-1">Explorar <i class="fa-solid fa-arrow-right ml-1"></i></p>
            </div>
        </div>
      `)).join(``),console.log(`✅ Collections renderizadas com sucesso!`)}catch(t){console.error(`❌ Erro ao renderizar collections:`,t),e.innerHTML=`<p class="text-center text-red-500">Erro ao carregar coleções</p>`}}function u(e){let t=document.getElementById(`collection-modal`),r=n.find(t=>t.id===e);if(!r||!t)return;let i=r.items;t.innerHTML=`
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()"></div>

        <div class="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in">

            <button onclick="closeModal()" 
                   class="absolute top-4 right-4 z-[110] w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div class="relative w-full md:w-3/5 bg-[#FBFBFD] h-[350px] md:h-auto overflow-hidden group">
                <div class="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth" id="modal-slider">
                    ${i.map((e,t)=>`
                        <div class="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-6">
                            <img src="${e.src}" 
                                alt="${e.titulo}" 
                                class="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-black/5"
                                loading="${t===0?`eager`:`lazy`}">
                        </div>
                    `).join(``)}
                </div>

                <!-- BOTÕES SEMPRE VISÍVEIS -->
                <button onclick="scrollModalSlider(-1)" 
                       class="absolute left-4 top-1/2 -translate-y-1/2 z-[105] w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onclick="scrollModalSlider(1)" 
                       class="absolute right-4 top-1/2 -translate-y-1/2 z-[105] w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>

                <!-- Indicadores de slide -->
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-[105] flex gap-2" id="modal-dots">
                    ${i.map((e,t)=>`
                        <div class="modal-dot w-2 h-2 rounded-full bg-white/40 transition-all duration-300 ${t===0?`w-6 bg-white`:``}"></div>
                    `).join(``)}
                </div>
            </div>

            <div class="w-full md:w-2/5 p-6 md:p-12 flex flex-col bg-white overflow-y-auto">
                <div id="modal-info-content">
                    <span class="text-gold font-bold tracking-widest text-[10px] uppercase">Catálogo RW Joias</span>
                    <h2 id="dynamic-title" class="font-serif text-2xl md:text-3xl mt-2 mb-2 text-gray-900">${i[0].titulo}</h2>

                    <div class="mb-6">
                        <span id="dynamic-price" class="text-xl md:text-2xl font-semibold text-charcoal">${i[0].preco}</span>
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
  `,t.classList.remove(`hidden`),document.body.style.overflow=`hidden`,d(r)}function d(e){let t=document.getElementById(`modal-slider`);if(!t)return;let n=()=>{let n=Math.round(t.scrollLeft/t.offsetWidth),r=e.items[n];if(!r)return;document.getElementById(`dynamic-title`).textContent=r.titulo,document.getElementById(`dynamic-price`).textContent=r.preco,document.getElementById(`dynamic-material`).textContent=r.material,document.getElementById(`dynamic-status`).textContent=r.disponibilidade,document.querySelectorAll(`.modal-dot`).forEach((e,t)=>{e.classList.toggle(`w-6`,t===n),e.classList.toggle(`bg-white`,t===n),e.classList.toggle(`w-2`,t!==n),e.classList.toggle(`bg-white/40`,t!==n)});let i=`*NOTA DE PEDIDO - RW JOIAS*%0A%0A*Nome:* ${r.titulo}%0A*Preço:* ${r.preco}%0A*Descrição:* ${r.material}%0A*Status:* ${r.disponibilidade}%0A%0A--------------------------------%0AOlá! Gostaria de finalizar a compra deste item.`;document.getElementById(`whatsapp-link`).href=`https://wa.me/5586994888666?text=${i}`};t.addEventListener(`scroll`,n,{passive:!0}),n()}function f(){let e=document.getElementById(`gallery-track`),n=document.getElementById(`gallery-indicators`);if(!(!e||!n)){if(!r.length){e.innerHTML=`<p class="text-center text-charcoal/50 w-full py-20">Carregando galeria...</p>`;return}e.innerHTML=r.map((e,t)=>`
    <div onclick="openLightbox(${t})" 
         class="gallery-slide flex-shrink-0 cursor-pointer group/slide relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-100">
        <div class="aspect-[3/4] overflow-hidden">
            <img src="${e.src}" 
                 alt="${e.titulo}" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                 loading="lazy">
        </div>

        <!-- Overlay com descrição - HOVER SUAVE -->
        <div class="gallery-overlay">
            <h3>${e.titulo}</h3>
            <p>${e.descricao}</p>
        </div>
    </div>
  `).join(``),n.innerHTML=r.map((e,t)=>`
    <button onclick="goToSlide(${t})" 
            class="gallery-indicator w-2 h-2 rounded-full bg-champagne transition-all duration-300 hover:bg-gold ${t===0?`w-8 bg-gold`:``}">
    </button>
  `).join(``),t=0,e.style.transform=`translateX(0)`,p()}}window.scrollGallery=e=>{let n=document.getElementById(`gallery-track`),i=n?.querySelector(`.gallery-slide`);if(!n||!i)return;let a=i.offsetWidth+16,o=n.parentElement.offsetWidth;t=Math.max(0,Math.min(t+e,r.length-Math.ceil(o/a))),n.style.transform=`translateX(-${t*a}px)`,p()},window.goToSlide=e=>{let n=document.getElementById(`gallery-track`),r=n?.querySelector(`.gallery-slide`);if(!n||!r)return;t=e;let i=r.offsetWidth+16;n.style.transform=`translateX(-${t*i}px)`,p()};function p(){document.querySelectorAll(`.gallery-indicator`).forEach((e,n)=>{e.classList.toggle(`w-8`,n===t),e.classList.toggle(`bg-gold`,n===t),e.classList.toggle(`w-2`,n!==t),e.classList.toggle(`bg-champagne`,n!==t)})}window.scrollModalSlider=e=>{let t=document.getElementById(`modal-slider`);t&&t.scrollBy({left:e*t.offsetWidth,behavior:`smooth`})},window.closeModal=()=>{let e=document.getElementById(`collection-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``)};function m(t){e=t;let n=document.getElementById(`lightbox-modal`);n&&(n.innerHTML=`
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 animate-fade-in">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-xl" onclick="closeLightbox()"></div>

        <button onclick="closeLightbox()" class="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:rotate-90">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <button onclick="navigateLightbox(-1)" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onclick="navigateLightbox(1)" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div class="relative w-full max-w-7xl max-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-8 p-8">
            <div class="relative flex-1 w-full flex items-center justify-center">
                <div class="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
                    <img id="lightbox-image" 
                        src="${r[e].src}" 
                        alt="${r[e].titulo}"
                        class="max-h-[60vh] md:max-h-[70vh] w-auto object-contain animate-image-load"
                        loading="eager">
                </div>
            </div>

            <div class="w-full md:w-80 text-center md:text-left animate-slide-up">
                <span class="text-gold/80 text-sm uppercase tracking-widest">Galeria RW Joias</span>
                <h2 id="lightbox-title" class="font-serif text-3xl md:text-4xl text-white mt-2 mb-3">${r[e].titulo}</h2>
                <p id="lightbox-desc" class="text-white/70 text-lg mb-6">${r[e].descricao}</p>
            </div>
        </div>
    </div>
  `,n.classList.remove(`hidden`),document.body.style.overflow=`hidden`)}function h(){let t=document.getElementById(`lightbox-image`),n=document.getElementById(`lightbox-title`),i=document.getElementById(`lightbox-desc`);t&&n&&i&&(t.classList.add(`animate-lightbox-reset`),t.offsetWidth,t.classList.remove(`animate-lightbox-reset`),t.style.opacity=`0`,setTimeout(()=>{t.src=r[e].src,n.textContent=r[e].titulo,i.textContent=r[e].descricao,t.style.opacity=`1`},50))}window.navigateLightbox=t=>{e=(e+t+r.length)%r.length,h()},window.closeLightbox=()=>{let e=document.getElementById(`lightbox-modal`);e&&(e.classList.add(`animate-fade-out`),setTimeout(()=>{e.classList.add(`hidden`),e.classList.remove(`animate-fade-out`),document.body.style.overflow=``},300))},document.addEventListener(`keydown`,e=>{document.getElementById(`lightbox-modal`)?.classList.contains(`hidden`)===!1&&(e.key===`Escape`&&closeLightbox(),e.key===`ArrowLeft`&&navigateLightbox(-1),e.key===`ArrowRight`&&navigateLightbox(1))}),document.addEventListener(`DOMContentLoaded`,()=>{c();let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t))},150)}),window.openModal=u,window.closeModal=closeModal,window.scrollModalSlider=scrollModalSlider,window.openLightbox=m,window.closeLightbox=closeLightbox,window.navigateLightbox=navigateLightbox,window.scrollGallery=scrollGallery,window.goToSlide=goToSlide;