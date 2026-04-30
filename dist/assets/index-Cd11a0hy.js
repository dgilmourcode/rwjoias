(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=0,t=0,n=[],r=[],i=null,a=null,o=0,s=``,c=0,l=document.getElementById(`mobile-menu-btn`),u=document.getElementById(`mobile-menu`);l&&u&&(l.addEventListener(`click`,()=>{u.classList.toggle(`hidden`)}),u.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{u.classList.add(`hidden`)})}));function d(){i&&i.disconnect(),i=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`active`),i.unobserve(e.target))})},{threshold:.05,rootMargin:`0px 0px -50px 0px`}),document.querySelectorAll(`.reveal`).forEach(e=>{i.observe(e);let t=e.getBoundingClientRect();t.top<window.innerHeight&&t.bottom>0&&e.classList.add(`active`)})}async function f(){let e=document.getElementById(`collections-grid`);e&&(e.innerHTML=`
      <div class="col-span-full flex flex-col items-center justify-center py-20 gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
        <p class="text-charcoal/50 font-medium animate-pulse">Carregando colecoes...</p>
      </div>
    `);try{let e=await fetch(`./data.json`,{method:`GET`,headers:{"Content-Type":`application/json`,Accept:`application/json`},cache:`no-cache`});if(!e.ok)throw Error(`HTTP ${e.status}: ${e.statusText}`);let t=await e.json();n=t.collections||[],r=t.galleryImages||[],p(),w(),setTimeout(()=>{d()},100)}catch(t){console.error(`ERRO FATAL:`,t),e&&(e.innerHTML=`
        <div class="col-span-full text-center py-20">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <i class="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
          </div>
          <h3 class="font-serif text-2xl text-charcoal mb-2">Erro ao carregar</h3>
          <p class="text-charcoal/60 mb-4">Verifique o console para detalhes</p>
          <button onclick="location.reload()" 
                  class="px-6 py-3 bg-gold text-charcoal rounded-full hover:bg-gold-light transition-colors">
            Tentar Novamente
          </button>
        </div>
      `)}}function p(){let e=document.getElementById(`collections-grid`);if(e){if(!n.length){e.innerHTML=`<p class="text-center text-charcoal/50">Nenhuma colecao disponivel</p>`;return}e.innerHTML=n.map((e,t)=>`
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
    `).join(``)}}function m(e){let t=document.getElementById(`collection-modal`),r=n.find(t=>t.id===e);if(!r||!t){console.error(`Modal ou colecao nao encontrados!`);return}let i=r.items;t.innerHTML=`
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()" id="modal-backdrop"></div>

        <div class="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in" onclick="event.stopPropagation()">

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

                <button onclick="scrollModalSlider(-1)" 
                       class="absolute left-4 top-1/2 -translate-y-1/2 z-[105] w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onclick="scrollModalSlider(1)" 
                       class="absolute right-4 top-1/2 -translate-y-1/2 z-[105] w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>

                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-[105] flex gap-2" id="modal-dots">
                    ${i.map((e,t)=>`
                        <div class="modal-dot w-2 h-2 rounded-full bg-white/40 transition-all duration-300 ${t===0?`w-6 bg-white`:``}"></div>
                    `).join(``)}
                </div>
            </div>

            <div class="w-full md:w-2/5 p-6 md:p-12 flex flex-col bg-white overflow-y-auto">
                <div id="modal-info-content">
                    <span class="text-gold font-bold tracking-widest text-[10px] uppercase">Catalogo RW Joias</span>
                    <h2 id="dynamic-title" class="font-serif text-2xl md:text-3xl mt-2 mb-2 text-gray-900">${i[0].titulo}</h2>

                    <div class="mb-6">
                        <span id="dynamic-price" class="text-xl md:text-2xl font-semibold text-charcoal">${i[0].preco}</span>
                        <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Valor aproximado / Consulte gramatura</p>
                    </div>

                    <div class="space-y-3 mb-8">
                        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Descricao</p>
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
                    <button id="whatsapp-link" type="button"
                       class="w-full bg-black text-white py-4 rounded-full text-sm font-bold hover:bg-gold transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 active:scale-95">
                        <i class="fa-brands fa-whatsapp text-lg"></i> Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    </div>
  `,t.classList.remove(`hidden`),document.body.style.overflow=`hidden`,setTimeout(()=>{C(r)},100)}function h(e){console.log(`Abrindo checkout modal...`);let t=document.getElementById(`collection-modal`);t&&(t.classList.add(`hidden`),t.innerHTML=``),a=e,o=0,s=``;let n=e.preco.replace(/[^\d,]/g,``).replace(`.`,``).replace(`,`,`.`);c=parseFloat(n);let r=document.getElementById(`checkout-product-img`),i=document.getElementById(`checkout-product-name`),l=document.getElementById(`checkout-product-price`),u=document.getElementById(`checkout-product-material`),d=document.getElementById(`checkout-total`);r&&(r.src=e.src),i&&(i.textContent=e.titulo),l&&(l.textContent=e.preco),u&&(u.textContent=e.material),d&&(d.textContent=e.preco);let f=document.getElementById(`promo-code`),p=document.getElementById(`customer-name`),m=document.getElementById(`customer-address`),h=document.getElementById(`promo-message`),g=document.getElementById(`parcelamento`);f&&(f.value=``),p&&(p.value=``),m&&(m.value=``),h&&(h.classList.add(`hidden`),h.textContent=``),g&&(g.value=`1`),document.querySelectorAll(`input[name="payment"]`).forEach(e=>{e.checked=e.value===`PIX`}),_(),v(),x();let y=document.getElementById(`checkout-modal`);y&&(y.classList.remove(`hidden`),document.body.style.overflow=`hidden`)}function g(){let e=document.getElementById(`checkout-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``)}function _(){document.querySelectorAll(`input[name="payment"]`).forEach(e=>{let t=e.closest(`label`)?.querySelector(`.radio-check`);t&&(t.style.opacity=e.checked?`1`:`0`)})}function v(){let e=document.querySelector(`input[name="payment"]:checked`)?.value,t=document.getElementById(`parcelamento-container`),n=document.getElementById(`parcelamento`);!t||!n||(e===`CREDITO`?(t.classList.remove(`opacity-50`,`pointer-events-none`),n.disabled=!1,y()):(t.classList.add(`opacity-50`,`pointer-events-none`),n.disabled=!0,n.innerHTML=`<option value="1">A vista (sem parcelamento)</option>`))}function y(){let e=document.getElementById(`parcelamento`);if(!e||!c)return;let t=e.value,n=o>0?c-c*o/100:c,r=document.querySelector(`input[name="payment"]:checked`)?.value,i=n;r===`PIX`&&(i=n*.95);let a=``;a+=`<option value="1">A vista no Credito - R$ ${i.toFixed(2).replace(`.`,`,`)}</option>`;let s=Math.min(12,Math.floor(i/50));for(let e=2;e<=s;e++){let t=(i/e).toFixed(2).replace(`.`,`,`),n=i.toFixed(2).replace(`.`,`,`);a+=`<option value="${e}">${e}x de R$ ${t} sem juros (Total: R$ ${n})</option>`}e.innerHTML=a,t&&e.querySelector(`option[value="${t}"]`)&&(e.value=t),e.onchange=()=>x()}function b(){let e=document.getElementById(`promo-code`),t=document.getElementById(`promo-message`),n=e.value.trim().toUpperCase(),r={PRIMEIRACOMPRA:10,VIP15:15,FRETEGRATIS:0,RWJOIAS20:20,OUREI:25};r[n]===void 0?(o=0,s=``,t.textContent=`Cupom invalido ou expirado`,t.className=`mt-2 text-sm text-red-600 font-medium`,t.classList.remove(`hidden`),x(),y()):(o=r[n],s=n,o>0?(t.textContent=`Cupom ${n} aplicado! ${o}% de desconto`,t.className=`mt-2 text-sm text-green-600 font-medium`):(t.textContent=`Cupom ${n} aplicado! Frete gratis`,t.className=`mt-2 text-sm text-green-600 font-medium`),t.classList.remove(`hidden`),x(),y())}function x(){if(!a||c<=0)return;let e=document.getElementById(`checkout-total`),t=document.getElementById(`checkout-product-price`),n=c,r=0;o>0&&(r=c*o/100,n=c-r);let i=document.querySelector(`input[name="payment"]:checked`)?.value,s=0;i===`PIX`&&(s=n*.05,n-=s);let l=`R$ ${c.toFixed(2).replace(`.`,`,`)}`,u=`R$ ${n.toFixed(2).replace(`.`,`,`)}`;if(e&&(e.textContent=u),t&&(o>0||i===`PIX`)){let e=`<span class="line-through text-gray-400 text-sm">${l}</span>`;o>0&&(e+=` <span class="text-green-600 text-xs">(-${o}%)</span>`),i===`PIX`&&(e+=` <span class="text-green-600 text-xs">(-5% PIX)</span>`),e+=`<br><span class="text-gold font-bold text-xl">${u}</span>`,t.innerHTML=e}else t&&(t.textContent=l)}function S(){if(!a)return;let e=document.querySelector(`input[name="payment"]:checked`)?.value,t=document.getElementById(`customer-name`).value.trim(),n=document.getElementById(`customer-address`).value.trim(),r=document.getElementById(`parcelamento`)?.value||`1`;if(!t){alert(`Por favor, digite seu nome`),document.getElementById(`customer-name`).focus();return}if(!n){alert(`Por favor, digite o endereco de entrega`),document.getElementById(`customer-address`).focus();return}let i=c,l=``,u=``;if(o>0){let e=c*o/100;i=c-e,l=`\n*Desconto (${o}%):* -R$ ${e.toFixed(2).replace(`.`,`,`)}`}if(e===`PIX`){let e=i*.05;i-=e,u=`\n*Desconto PIX (5%):* -R$ ${e.toFixed(2).replace(`.`,`,`)}`}let d=``;if(e===`PIX`)d=`• *Forma:* PIX (A vista)
• *Beneficio:* 5% de desconto + Aprovacao imediata`;else if(e===`DEBITO`)d=`• *Forma:* Cartao de Debito (A vista)
• *Pagamento:* Na entrega do produto`;else if(e===`CREDITO`){let e=parseInt(r);d=e===1?`• *Forma:* Cartao de Credito (A vista)\n• *Pagamento:* A vista no credito - R$ ${i.toFixed(2).replace(`.`,`,`)}`:`• *Forma:* Cartao de Credito (Parcelado)\n• *Parcelamento:* ${e}x de R$ ${(i/e).toFixed(2).replace(`.`,`,`)} sem juros\n• *Total parcelado:* R$ ${i.toFixed(2).replace(`.`,`,`)}`}let f=`*━━━━━━━━━━━━━━━━━━━━━━*\n    *RW JOIAS* - Pedido\n*━━━━━━━━━━━━━━━━━━━━━━*\n\n*📦 PRODUTO*\n• *${a.titulo}*\n• *Material:* ${a.material}\n• *Disponibilidade:* ${a.disponibilidade}\n\n*💳 PAGAMENTO*\n${d}\n\n*🏷️ CUPOM*\n${s?`• *Codigo:* ${s} (${o}% OFF)`:`• Nenhum cupom aplicado`}\n\n*💰 RESUMO*\n• *Subtotal:* R$ ${c.toFixed(2).replace(`.`,`,`)}\n${l}\n${u}\n• *Total:* *R$ ${i.toFixed(2).replace(`.`,`,`)}*\n\n*👤 CLIENTE*\n• *Nome:* ${t}\n• *Endereco:* ${n}\n\n*━━━━━━━━━━━━━━━━━━━━━━*\nOla! Gostaria de finalizar este pedido.\nAguardo confirmacao e instrucoes de pagamento. ✨\n*━━━━━━━━━━━━━━━━━━━━━━*`,p=`https://wa.me/5586994888666?text=${encodeURIComponent(f)}`;window.open(p,`_blank`),setTimeout(()=>{g()},500)}function C(e){let t=document.getElementById(`modal-slider`),n=document.getElementById(`whatsapp-link`);if(!t){console.error(`Slider nao encontrado!`);return}if(!n){console.error(`Botao WhatsApp nao encontrado!`);return}let r=()=>{let n=Math.round(t.scrollLeft/t.offsetWidth),r=e.items[n];if(!r)return;let i=document.getElementById(`dynamic-title`),a=document.getElementById(`dynamic-price`),o=document.getElementById(`dynamic-material`),s=document.getElementById(`dynamic-status`);i&&(i.textContent=r.titulo),a&&(a.textContent=r.preco),o&&(o.textContent=r.material),s&&(s.textContent=r.disponibilidade),document.querySelectorAll(`.modal-dot`).forEach((e,t)=>{e.classList.toggle(`w-6`,t===n),e.classList.toggle(`bg-white`,t===n),e.classList.toggle(`w-2`,t!==n),e.classList.toggle(`bg-white/40`,t!==n)})};t.addEventListener(`scroll`,r,{passive:!0}),r();let i=n.cloneNode(!0);n.parentNode.replaceChild(i,n),i.addEventListener(`click`,n=>{n.preventDefault(),n.stopPropagation();let r=Math.round(t.scrollLeft/t.offsetWidth),i=e.items[r];i?h(i):alert(`Erro: Produto nao encontrado`)})}function w(){let e=document.getElementById(`gallery-track`),n=document.getElementById(`gallery-indicators`);if(!(!e||!n)){if(!r.length){e.innerHTML=`<p class="text-center text-charcoal/50 w-full py-20">Carregando galeria...</p>`;return}e.innerHTML=r.map((e,t)=>`
    <div onclick="openLightbox(${t})" 
         class="gallery-slide flex-shrink-0 cursor-pointer group/slide relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-100">
        <div class="aspect-[3/4] overflow-hidden">
            <img src="${e.src}" 
                 alt="${e.titulo}" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                 loading="lazy">
        </div>

        <div class="gallery-overlay">
            <h3 class="text-amber-50">${e.titulo}</h3>
            <p class="text-amber-100">${e.descricao}</p>
        </div>
    </div>
  `).join(``),n.innerHTML=r.map((e,t)=>`
    <button onclick="goToSlide(${t})" 
            class="gallery-indicator w-2 h-2 rounded-full bg-champagne transition-all duration-300 hover:bg-gold ${t===0?`w-8 bg-gold`:``}">
    </button>
  `).join(``),t=0,e.style.transform=`translateX(0)`,T()}}window.scrollGallery=e=>{let n=document.getElementById(`gallery-track`),r=n?.querySelectorAll(`.gallery-slide`);!n||!r.length||requestAnimationFrame(()=>{let i=r[0].offsetWidth+16;if(i<=16){console.warn(`Slide width é 0 ou inválido`);return}let a=n.parentElement.offsetWidth,o=Math.max(1,Math.ceil(a/i)-1),s=o*e,c=Math.max(0,r.length-o);t=Math.max(0,Math.min(t+s,c)),n.style.transform=`translateX(-${t*i}px)`,T()})},window.goToSlide=e=>{let n=document.getElementById(`gallery-track`),r=n?.querySelector(`.gallery-slide`);!n||!r||requestAnimationFrame(()=>{t=e;let i=r.offsetWidth+16;n.style.transform=`translateX(-${t*i}px)`,T()})};function T(){document.querySelectorAll(`.gallery-indicator`).forEach((e,n)=>{e.classList.toggle(`w-8`,n===t),e.classList.toggle(`bg-gold`,n===t),e.classList.toggle(`w-2`,n!==t),e.classList.toggle(`bg-champagne`,n!==t)})}window.scrollModalSlider=e=>{let t=document.getElementById(`modal-slider`);t&&t.scrollBy({left:e*t.offsetWidth,behavior:`smooth`})},window.closeModal=()=>{let e=document.getElementById(`collection-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``,e.innerHTML=``)};function E(t){e=t;let n=document.getElementById(`lightbox-modal`);n&&(n.innerHTML=`
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
                <h2 id="lightbox-title" class="font-serif text-3xl md:text-4xl text-white mt-2 mb-3 p-2">${r[e].titulo}</h2>
                <p id="lightbox-desc" class="text-white/70 text-lg mb-6">${r[e].descricao}</p>
            </div>
        </div>
    </div>
  `,n.classList.remove(`hidden`),document.body.style.overflow=`hidden`)}function D(){let t=document.getElementById(`lightbox-image`),n=document.getElementById(`lightbox-title`),i=document.getElementById(`lightbox-desc`);t&&n&&i&&(t.style.opacity=`0`,setTimeout(()=>{t.src=r[e].src,n.textContent=r[e].titulo,i.textContent=r[e].descricao,t.style.opacity=`1`},50))}window.navigateLightbox=t=>{e=(e+t+r.length)%r.length,D()},window.closeLightbox=()=>{let e=document.getElementById(`lightbox-modal`);e&&(e.classList.add(`animate-fade-out`),setTimeout(()=>{e.classList.add(`hidden`),e.classList.remove(`animate-fade-out`),document.body.style.overflow=``},300))},document.addEventListener(`keydown`,e=>{document.getElementById(`lightbox-modal`)?.classList.contains(`hidden`)===!1&&(e.key===`Escape`&&closeLightbox(),e.key===`ArrowLeft`&&navigateLightbox(-1),e.key===`ArrowRight`&&navigateLightbox(1))}),document.addEventListener(`DOMContentLoaded`,()=>{f();let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t))},150),O()});function O(){document.querySelectorAll(`input[name="payment"]`).forEach(e=>{e.addEventListener(`change`,function(){_(),v(),x()})}),document.getElementById(`promo-code`)?.addEventListener(`keypress`,function(e){e.key===`Enter`&&b()}),document.getElementById(`parcelamento`)?.addEventListener(`change`,()=>{x()})}window.openModal=m,window.closeModal=closeModal,window.scrollModalSlider=scrollModalSlider,window.openLightbox=E,window.closeLightbox=closeLightbox,window.navigateLightbox=navigateLightbox,window.scrollGallery=scrollGallery,window.goToSlide=goToSlide,window.openCheckoutModal=h,window.closeCheckoutModal=g,window.applyPromoCode=b,window.finalizeOrder=S;