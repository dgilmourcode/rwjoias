(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=0,t=[],n=[],r=null,i=null,a=0,o=``,s=0,c=document.getElementById(`mobile-menu-btn`),l=document.getElementById(`mobile-menu`);c&&l&&(c.addEventListener(`click`,()=>{l.classList.toggle(`hidden`)}),l.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{l.classList.add(`hidden`)})}));function u(){r&&r.disconnect(),r=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`active`),r.unobserve(e.target))})},{threshold:.05,rootMargin:`0px 0px -50px 0px`}),document.querySelectorAll(`.reveal`).forEach(e=>{r.observe(e);let t=e.getBoundingClientRect();t.top<window.innerHeight&&t.bottom>0&&e.classList.add(`active`)})}async function d(){let e=document.getElementById(`collections-grid`);e&&(e.innerHTML=`
      <div class="col-span-full flex flex-col items-center justify-center py-20 gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
        <p class="text-charcoal/50 font-medium animate-pulse">Carregando colecoes...</p>
      </div>
    `);try{let e=await fetch(`./data.json`,{method:`GET`,headers:{"Content-Type":`application/json`,Accept:`application/json`},cache:`no-cache`});if(!e.ok)throw Error(`HTTP ${e.status}: ${e.statusText}`);let r=await e.json();t=r.collections||[],n=r.galleryImages||[],f(),T(),setTimeout(()=>{u()},100)}catch(t){console.error(`ERRO FATAL:`,t),e&&(e.innerHTML=`
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
      `)}}function f(){let e=document.getElementById(`collections-grid`);if(e){if(!t.length){e.innerHTML=`<p class="text-center text-charcoal/50">Nenhuma colecao disponivel</p>`;return}e.innerHTML=t.map((e,t)=>`
        <div onclick="openModal('${e.id}')" 
             class="collection-card reveal group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <div class="aspect-[4/5] overflow-hidden bg-gray-100">
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
    `).join(``)}}function p(e){let n=document.getElementById(`collection-modal`),r=t.find(t=>t.id===e);if(!r||!n){console.error(`Modal ou colecao nao encontrados!`);return}let i=r.items;n.innerHTML=`
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()" id="modal-backdrop"></div>

        <div class="relative bg-white w-full max-w-6xl max-h-full rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in" onclick="event.stopPropagation()">

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

            <div class="w-full md:w-2/5 p-4 md:p-6 flex flex-col bg-white overflow-y-auto">
                <div id="modal-info-content">
                    <span class="text-gold font-bold tracking-widest text-[10px] uppercase">Catalogo RW Joias</span>
                    <h2 id="dynamic-title" class="font-serif text-2xl md:text-3xl mt-2 mb-1 text-gray-900">${i[0].titulo}</h2>

                    <div class="mb-4">
                        <span id="dynamic-price" class="text-xl md:text-2xl font-semibold text-charcoal">${i[0].preco}</span>
                        <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Valor aproximado / Consulte gramatura</p>
                    </div>

                    <div class="space-y-2 mb-4">
                        <div class="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Descricao</p>
                                <p id="dynamic-material" class="text-sm font-medium text-gray-800">${i[0].material}</p>
                            </div>
                            <i class="fa-solid fa-gem text-gold/50"></i>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Disponibilidade</p>
                                <p id="dynamic-status" class="text-sm font-medium text-green-600">${i[0].disponibilidade}</p>
                            </div>
                            <i class="fa-solid fa-circle-check text-green-500/30"></i>
                        </div>
                    </div>
                </div>

                <div class="mt-auto pt-3 border-t border-gray-100">
                    <button id="whatsapp-link" type="button"
                    onclick="openCheckoutModal(currentItem)"
                    class="w-full bg-black text-white py-4 rounded-full text-sm font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    style="-webkit-appearance: none; -webkit-tap-highlight-color: transparent;">
                        <i class="fa-brands fa-whatsapp text-xl"></i> 
                        <span>Finalizar Compra</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  `,n.classList.remove(`hidden`),document.body.style.overflow=`hidden`,setTimeout(()=>{C(r)},100)}function m(e){console.log(`Abrindo checkout modal...`);let t=document.getElementById(`collection-modal`);t&&(t.classList.add(`hidden`),t.innerHTML=``),i=e,a=0,o=``;let n=e.preco.replace(/[^\d,]/g,``).replace(`.`,``).replace(`,`,`.`);s=parseFloat(n);let r=document.getElementById(`checkout-modal`);r&&(r.innerHTML=`
    <div class="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeCheckoutModal()" id="modal-backdrop"></div>

        <div class="relative bg-white w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] rounded-t-[28px] md:rounded-[28px] overflow-hidden shadow-2xl flex flex-col animate-modal-in checkout-modal-content" onclick="event.stopPropagation()">
            
            <div class="flex items-center justify-center pt-3 pb-2 bg-gradient-to-b from-gray-50 to-white md:hidden">
                <div class="w-10 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            <button onclick="closeCheckoutModal()" 
                   class="absolute top-4 right-4 z-[110] w-9 h-9 bg-gray-100/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gray-200 transition-all md:flex">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div class="checkout-container">
                
                <div class="checkout-scroll-content" id="checkout-scroll">
                    
                    <div class="checkout-product-header">
                        <img id="checkout-product-img" src="${e.src}" alt="${e.titulo}" class="checkout-product-image">
                        <div class="checkout-product-info">
                            <h3 id="checkout-product-name" class="checkout-product-title">${e.titulo}</h3>
                            <p class="checkout-product-material">
                                <i class="fa-solid fa-gem text-gold/60"></i>
                                ${e.material}
                            </p>
                            <div id="checkout-product-price" class="checkout-product-price">
                                ${e.preco}
                            </div>
                        </div>
                    </div>

                    <div class="checkout-section">
                        <div class="checkout-section-title">
                            <i class="fa-regular fa-user"></i>
                            Dados de Entrega
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nome completo</label>
                            <input type="text" id="customer-name" class="form-input" placeholder="Digite seu nome">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Endereço completo</label>
                            <input type="text" id="customer-address" class="form-input" placeholder="Rua, número, bairro, cidade">
                        </div>
                    </div>

                    <div class="checkout-section">
                        <div class="checkout-section-title">
                            <i class="fa-regular fa-credit-card"></i>
                            Forma de Pagamento
                        </div>
                        <div class="payment-options">
                            <label class="payment-option selected" onclick="selectPayment('PIX')">
                                <input type="radio" name="payment" value="PIX" checked>
                                <div class="payment-option-header">
                                    <div class="payment-option-title">
                                        <i class="fa-brands fa-pix text-green-600"></i>
                                        PIX
                                        <span class="payment-option-badge">5% OFF</span>
                                    </div>
                                    <div class="payment-radio"></div>
                                </div>
                                <p class="payment-option-desc">Aprovação imediata + desconto exclusivo</p>
                            </label>

                            <label class="payment-option" onclick="selectPayment('DEBITO')">
                                <input type="radio" name="payment" value="DEBITO">
                                <div class="payment-option-header">
                                    <div class="payment-option-title">
                                        <i class="fa-solid fa-credit-card text-blue-600"></i>
                                        Cartão de Débito
                                    </div>
                                    <div class="payment-radio"></div>
                                </div>
                                <p class="payment-option-desc">Pagamento na entrega do produto</p>
                            </label>

                            <label class="payment-option" onclick="selectPayment('CREDITO')">
                                <input type="radio" name="payment" value="CREDITO">
                                <div class="payment-option-header">
                                    <div class="payment-option-title">
                                        <i class="fa-solid fa-credit-card text-purple-600"></i>
                                        Cartão de Crédito
                                    </div>
                                    <div class="payment-radio"></div>
                                </div>
                                <p class="payment-option-desc">Parcele em até 10x sem juros</p>
                            </label>
                        </div>

                        <div id="parcelamento-container" class="mt-4 opacity-50 pointer-events-none">
                            <label class="form-label">Parcelamento</label>
                            <select id="parcelamento" class="parcelamento-select">
                                <option value="1">A vista (sem parcelamento)</option>
                            </select>
                        </div>
                    </div>

                    <div class="checkout-section">
                        <div class="checkout-section-title">
                            <i class="fa-solid fa-tag"></i>
                            Cupom de Desconto
                        </div>
                        <div class="promo-container">
                            <input type="text" id="promo-code" class="promo-input" placeholder="Digite o código" maxlength="20">
                            <button onclick="applyPromoCode()" class="promo-button">Aplicar</button>
                        </div>
                        <div id="promo-message" class="promo-message hidden"></div>
                    </div>

                    <div style="height: 100px;"></div>
                </div>

                <div class="checkout-footer visible-footer" id="checkout-footer">
                    <div class="footer-content">
                        <div class="footer-total">
                            <span class="footer-total-label">Total do pedido</span>
                            <span id="checkout-total" class="footer-total-value">${e.preco}</span>
                        </div>
                        <button onclick="finalizeOrder()" class="whatsapp-button">
                            <i class="fa-brands fa-whatsapp"></i>
                            <span>Finalizar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,r.classList.remove(`hidden`),document.body.style.overflow=`hidden`,setTimeout(()=>{h(),v(),x()},100))}window.selectPayment=e=>{document.querySelectorAll(`.payment-option`).forEach(t=>{t.classList.remove(`selected`);let n=t.querySelector(`input[type="radio"]`);n&&n.value===e&&(t.classList.add(`selected`),n.checked=!0)}),v(),x()};function h(){let e=document.getElementById(`checkout-scroll`),t=document.getElementById(`checkout-footer`);!e||!t||(e.addEventListener(`scroll`,()=>{let n=e.scrollTop,r=e.scrollHeight-e.clientHeight;n>100||n>r*.7?(t.classList.remove(`hidden-footer`),t.classList.add(`visible-footer`)):n<50&&r>200&&(t.classList.remove(`visible-footer`),t.classList.add(`hidden-footer`))},{passive:!0}),document.querySelectorAll(`.payment-option`).forEach(e=>{e.addEventListener(`click`,function(){setTimeout(()=>{this.scrollIntoView({behavior:`smooth`,block:`nearest`})},100)})}))}function g(){let e=document.getElementById(`checkout-modal`);e&&(e.classList.add(`animate-fade-out`),setTimeout(()=>{e.classList.add(`hidden`),e.classList.remove(`animate-fade-out`),e.innerHTML=``,document.body.style.overflow=``},300))}function _(){document.querySelectorAll(`input[name="payment"]`).forEach(e=>{let t=e.closest(`label`)?.querySelector(`.radio-check`);t&&(t.style.opacity=e.checked?`1`:`0`)})}function v(){let e=document.querySelector(`input[name="payment"]:checked`)?.value,t=document.getElementById(`parcelamento-container`),n=document.getElementById(`parcelamento`);!t||!n||(e===`CREDITO`?(t.classList.remove(`opacity-50`,`pointer-events-none`),n.disabled=!1,y()):(t.classList.add(`opacity-50`,`pointer-events-none`),n.disabled=!0,n.innerHTML=`<option value="1">A vista (sem parcelamento)</option>`))}function y(){let e=document.getElementById(`parcelamento`);if(!e||!s)return;let t=e.value,n=a>0?s-s*a/100:s,r=document.querySelector(`input[name="payment"]:checked`)?.value,i=n;r===`PIX`&&(i=n*.95);let o=``;o+=`<option value="1">A vista no Credito - R$ ${i.toFixed(2).replace(`.`,`,`)}</option>`;let c=Math.min(10,Math.floor(i/50));for(let e=2;e<=c;e++){let t=(i/e).toFixed(2).replace(`.`,`,`),n=i.toFixed(2).replace(`.`,`,`);o+=`<option value="${e}">${e}x de R$ ${t} sem juros (Total: R$ ${n})</option>`}e.innerHTML=o,t&&e.querySelector(`option[value="${t}"]`)&&(e.value=t),e.onchange=()=>x()}function b(){let e=document.getElementById(`promo-code`),t=document.getElementById(`promo-message`),n=e.value.trim().toUpperCase(),r={PRIMEIRACOMPRA:10,VIP15:15,FRETEGRATIS:0,RWJOIAS20:20,OREI:25};r[n]===void 0?(a=0,o=``,t.textContent=`Cupom invalido ou expirado`,t.className=`mt-2 text-sm text-red-600 font-medium`,t.classList.remove(`hidden`),x(),y()):(a=r[n],o=n,a>0?(t.textContent=`Cupom ${n} aplicado! ${a}% de desconto`,t.className=`mt-2 text-sm text-green-600 font-medium`):(t.textContent=`Cupom ${n} aplicado! Frete gratis`,t.className=`mt-2 text-sm text-green-600 font-medium`),t.classList.remove(`hidden`),x(),y())}function x(){if(!i||s<=0)return;let e=document.getElementById(`checkout-total`),t=document.getElementById(`checkout-product-price`),n=s,r=0;a>0&&(r=s*a/100,n=s-r);let o=document.querySelector(`input[name="payment"]:checked`)?.value,c=0;o===`PIX`&&(c=n*.05,n-=c);let l=`R$ ${s.toFixed(2).replace(`.`,`,`)}`,u=`R$ ${n.toFixed(2).replace(`.`,`,`)}`;if(e&&(e.textContent=u),t&&(a>0||o===`PIX`)){let e=`<span class="line-through text-gray-400 text-sm">${l}</span>`;a>0&&(e+=` <span class="text-green-600 text-xs">(-${a}%)</span>`),o===`PIX`&&(e+=` <span class="text-green-600 text-xs">(-5% PIX)</span>`),e+=`<br><span class="text-gold font-bold text-xl">${u}</span>`,t.innerHTML=e}else t&&(t.textContent=l)}function S(){if(!i)return;let e=document.querySelector(`input[name="payment"]:checked`)?.value,t=document.getElementById(`customer-name`).value.trim(),n=document.getElementById(`customer-address`).value.trim(),r=document.getElementById(`parcelamento`)?.value||`1`;if(!t){alert(`Por favor, digite seu nome`),document.getElementById(`customer-name`).focus();return}if(!n){alert(`Por favor, digite o endereco de entrega`),document.getElementById(`customer-address`).focus();return}let c=s,l=``,u=``;if(a>0){let e=s*a/100;c=s-e,l=`\n*Desconto (${a}%):* -R$ ${e.toFixed(2).replace(`.`,`,`)}`}if(e===`PIX`){let e=c*.05;c-=e,u=`\n*Desconto PIX (5%):* -R$ ${e.toFixed(2).replace(`.`,`,`)}`}let d=``;if(e===`PIX`)d=`• *Forma:* PIX (A vista)
• *Beneficio:* 5% de desconto + Aprovacao imediata`;else if(e===`DEBITO`)d=`• *Forma:* Cartao de Debito (A vista)
• *Pagamento:* Na entrega do produto`;else if(e===`CREDITO`){let e=parseInt(r);d=e===1?`• *Forma:* Cartao de Credito (A vista)\n• *Pagamento:* A vista no credito - R$ ${c.toFixed(2).replace(`.`,`,`)}`:`• *Forma:* Cartao de Credito (Parcelado)\n• *Parcelamento:* ${e}x de R$ ${(c/e).toFixed(2).replace(`.`,`,`)} sem juros\n• *Total parcelado:* R$ ${c.toFixed(2).replace(`.`,`,`)}`}let f=`*━━━━━━━━━━━━━━━━━━━━━━*\n    *RW JOIAS* - Pedido\n*━━━━━━━━━━━━━━━━━━━━━━*\n\n*📦 PRODUTO*\n• *${i.titulo}*\n• *Material:* ${i.material}\n• *Disponibilidade:* ${i.disponibilidade}\n\n*💳 PAGAMENTO*\n${d}\n\n*🏷️ CUPOM*\n${o?`• *Codigo:* ${o} (${a}% OFF)`:`• Nenhum cupom aplicado`}\n\n*💰 RESUMO*\n• *Subtotal:* R$ ${s.toFixed(2).replace(`.`,`,`)}\n${l}\n${u}\n• *Total:* *R$ ${c.toFixed(2).replace(`.`,`,`)}*\n\n*👤 CLIENTE*\n• *Nome:* ${t}\n• *Endereco:* ${n}\n\n*━━━━━━━━━━━━━━━━━━━━━━*\nOla! Gostaria de finalizar este pedido.\nAguardo confirmacao e instrucoes de pagamento. ✨\n*━━━━━━━━━━━━━━━━━━━━━━*`,p=`https://wa.me/5586994888666?text=${encodeURIComponent(f)}`;window.open(p,`_blank`),setTimeout(()=>{g()},500)}function C(e){let t=document.getElementById(`modal-slider`),n=document.getElementById(`whatsapp-link`);if(!t){console.error(`Slider nao encontrado!`);return}if(!n){console.error(`Botao WhatsApp nao encontrado!`);return}let r=()=>{let n=Math.round(t.scrollLeft/t.offsetWidth),r=e.items[n];if(!r)return;let i=document.getElementById(`dynamic-title`),a=document.getElementById(`dynamic-price`),o=document.getElementById(`dynamic-material`),s=document.getElementById(`dynamic-status`);i&&(i.textContent=r.titulo),a&&(a.textContent=r.preco),o&&(o.textContent=r.material),s&&(s.textContent=r.disponibilidade),document.querySelectorAll(`.modal-dot`).forEach((e,t)=>{e.classList.toggle(`w-6`,t===n),e.classList.toggle(`bg-white`,t===n),e.classList.toggle(`w-2`,t!==n),e.classList.toggle(`bg-white/40`,t!==n)})};t.addEventListener(`scroll`,r,{passive:!0}),r();let i=n.cloneNode(!0);n.parentNode.replaceChild(i,n),i.addEventListener(`click`,n=>{n.preventDefault(),n.stopPropagation();let r=Math.round(t.scrollLeft/t.offsetWidth),i=e.items[r];i?m(i):alert(`Erro: Produto nao encontrado`)})}var w={currentSlide:0,slidesPerView:1,totalSlides:0,isDragging:!1,startX:0,currentX:0,translateX:0};function T(){let e=document.getElementById(`gallery-track`),t=document.getElementById(`gallery-indicators`);if(!(!e||!t)){if(!n.length){e.innerHTML=`<p class="text-center text-charcoal/50 w-full py-20">Carregando galeria...</p>`;return}e.innerHTML=n.map((e,t)=>`
        <div class="gallery-slide flex-shrink-0 cursor-pointer group/slide relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-100" 
             data-index="${t}">
            <div class="aspect-[3/4] overflow-hidden">
                <img src="${e.src}" 
                     alt="${e.titulo}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                     loading="lazy")">
            </div>
            <div class="gallery-overlay absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300">
                <h3 class="text-white font-serif text-lg">${e.titulo}</h3>
                <p class="text-white/80 text-sm">${e.descricao}</p>
            </div>
        </div>
    `).join(``),w.totalSlides=n.length,E(),D(t),O(),document.querySelectorAll(`.gallery-slide`).forEach((e,t)=>{e.addEventListener(`click`,()=>{N(t)})})}}function E(){let e=window.innerWidth;e<=640?w.slidesPerView=1:e<=1024?w.slidesPerView=2:w.slidesPerView=3;let t=Math.max(0,w.totalSlides-w.slidesPerView);w.currentSlide>t&&(w.currentSlide=t),O()}function D(e){let t=Math.max(0,w.totalSlides-w.slidesPerView);e.innerHTML=Array.from({length:t+1},(e,t)=>`
        <button class="gallery-indicator w-2 h-2 rounded-full bg-champagne transition-all duration-300 hover:bg-gold ${t===0?`w-8 bg-gold`:``}" 
                onclick="goToSlide(${t})"
                aria-label="Ir para slide ${t+1}">
        </button>
    `).join(``)}window.scrollGallery=e=>{let t=Math.max(0,w.totalSlides-w.slidesPerView),n=w.currentSlide+e*w.slidesPerView;goToSlide(Math.max(0,Math.min(n,t)))},window.goToSlide=e=>{let t=Math.max(0,w.totalSlides-w.slidesPerView);w.currentSlide=Math.max(0,Math.min(e,t)),O(),k()};function O(){let e=document.getElementById(`gallery-track`),t=document.querySelectorAll(`.gallery-slide`);if(!e||t.length===0)return;let n=t[0].offsetWidth+16;w.translateX=-w.currentSlide*n,e.style.transform=`translateX(${w.translateX}px)`}function k(){document.querySelectorAll(`.gallery-indicator`).forEach((e,t)=>{e.classList.toggle(`w-8`,t===w.currentSlide),e.classList.toggle(`bg-gold`,t===w.currentSlide),e.classList.toggle(`w-2`,t!==w.currentSlide),e.classList.toggle(`bg-champagne`,t!==w.currentSlide)})}var A;window.addEventListener(`resize`,()=>{clearTimeout(A),A=setTimeout(()=>{E(),D(document.getElementById(`gallery-indicators`))},250)}),window.scrollModalSlider=e=>{let t=document.getElementById(`modal-slider`);t&&t.scrollBy({left:e*t.offsetWidth,behavior:`smooth`})},window.closeModal=()=>{let e=document.getElementById(`collection-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``,e.innerHTML=``)};var j=0,M=0;function N(t){e=t;let r=document.getElementById(`lightbox-modal`);if(!r){console.error(`Lightbox modal não encontrado!`);return}let i=n[e];r.innerHTML=`
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-0 animate-fade-in">
        <!-- Backdrop com blur -->
        <div class="absolute inset-0 bg-black/95 backdrop-blur-xl" onclick="closeLightbox()"></div>

        <!-- Botão Fechar -->
        <button onclick="closeLightbox()" 
                class="absolute top-4 right-4 md:top-8 md:right-8 z-[110] w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:rotate-90 hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>

        <!-- Botões de Navegação -->
        <button onclick="navigateLightbox(-1)" 
                class="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:-translate-x-0.5 transition-transform">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>
        
        <button onclick="navigateLightbox(1)" 
                class="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:translate-x-0.5 transition-transform">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>

        <!-- Conteúdo Principal -->
        <div class="relative w-full max-w-7xl max-h-[100vh] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 p-4 md:p-12 md:m-6 overflow-hidden"
             onclick="event.stopPropagation()">
            
            <!-- Imagem -->
            <div class="relative flex-1 w-full flex items-center justify-center">
                <div class="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50 bg-black/20">
                    <img id="lightbox-image" 
                        src="${i.src}" 
                        alt="${i.titulo}"
                        class="max-h-[50vh] md:max-h-[70vh] w-auto object-contain transition-all duration-500 ease-out"
                        style="opacity: 0; transform: scale(0.95);"
                        loading="eager">
                </div>
                
                <!-- Contador de imagens -->
                <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
                    ${e+1} / ${n.length}
                </div>
            </div>

            <!-- Informações -->
            <div class="w-full md:w-96 text-center md:text-left px-4 md:px-0 animate-slide-up">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4">
                    <div class="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                    <span class="text-gold text-xs uppercase tracking-widest font-semibold">Galeria RW Joias</span>
                </div>
                
                <h2 id="lightbox-title" 
                    class="font-serif text-3xl md:text-4xl text-white mt-4 mb-4 leading-tight opacity-0 animate-fade-in"
                    style="animation-delay: 0.2s; animation-fill-mode: forwards;">
                    ${i.titulo}
                </h2>
                
                <p id="lightbox-desc" 
                   class="text-white/70 text-base md:text-lg mb-8 leading-relaxed opacity-0 animate-fade-in"
                   style="animation-delay: 0.3s; animation-fill-mode: forwards;">
                    ${i.descricao}
                </p>

                <!-- Indicadores de navegação -->
                <div class="flex items-center justify-center md:justify-start gap-2">
                    ${n.map((t,n)=>`
                        <button onclick="goToLightboxImage(${n})" 
                                class="h-1.5 rounded-full transition-all duration-300 ${n===e?`w-8 bg-gold`:`w-1.5 bg-white/30 hover:bg-white/50`}">
                        </button>
                    `).join(``)}
                </div>
            </div>
        </div>
    </div>
    `,r.classList.remove(`hidden`),document.body.style.overflow=`hidden`,setTimeout(()=>{let e=document.getElementById(`lightbox-image`);e&&(e.style.opacity=`1`,e.style.transform=`scale(1)`)},50),P()}function P(){let e=document.getElementById(`lightbox-modal`);e&&(e.addEventListener(`touchstart`,F,{passive:!0}),e.addEventListener(`touchmove`,I,{passive:!0}),e.addEventListener(`touchend`,L))}function F(e){j=e.touches[0].clientX}function I(e){M=e.touches[0].clientX}function L(){let e=j-M;Math.abs(e)>50&&(e>0?navigateLightbox(1):navigateLightbox(-1))}function R(){let t=document.getElementById(`lightbox-image`),r=document.getElementById(`lightbox-title`),i=document.getElementById(`lightbox-desc`),a=document.getElementById(`lightbox-modal`);if(!t||!r||!i||!a)return;let o=n[e];t.style.opacity=`0`,t.style.transform=`scale(0.95)`,setTimeout(()=>{t.src=o.src,t.alt=o.titulo,r.textContent=o.titulo,i.textContent=o.descricao;let s=a.querySelector(`.absolute.-bottom-8`);s&&(s.textContent=`${e+1} / ${n.length}`),a.querySelectorAll(`button[class*="h-1.5"]`).forEach((t,n)=>{n===e?t.className=`h-1.5 w-8 rounded-full bg-gold transition-all duration-300`:t.className=`h-1.5 w-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300`}),setTimeout(()=>{t.style.opacity=`1`,t.style.transform=`scale(1)`},50)},300)}window.navigateToLightboxImage=e=>{goToLightboxImage(e)},window.goToLightboxImage=t=>{t!==e&&(e=t,R())},window.navigateLightbox=t=>{e=(e+t+n.length)%n.length,R()},window.closeLightbox=()=>{let e=document.getElementById(`lightbox-modal`);e&&(e.classList.add(`animate-fade-out`),setTimeout(()=>{e.classList.add(`hidden`),e.classList.remove(`animate-fade-out`),e.innerHTML=``,document.body.style.overflow=``},300))},document.addEventListener(`keydown`,e=>{let t=document.getElementById(`lightbox-modal`);t&&!t.classList.contains(`hidden`)&&(e.key===`Escape`&&closeLightbox(),e.key===`ArrowLeft`&&navigateLightbox(-1),e.key===`ArrowRight`&&navigateLightbox(1))}),document.addEventListener(`DOMContentLoaded`,()=>{d();let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t))},150),z()});function z(){document.querySelectorAll(`input[name="payment"]`).forEach(e=>{e.addEventListener(`change`,function(){_(),v(),x()})}),document.getElementById(`promo-code`)?.addEventListener(`keypress`,function(e){e.key===`Enter`&&b()}),document.getElementById(`parcelamento`)?.addEventListener(`change`,()=>{x()})}window.openModal=p,window.closeModal=closeModal,window.scrollModalSlider=scrollModalSlider,window.openLightbox=N,window.closeLightbox=closeLightbox,window.navigateLightbox=navigateLightbox,window.goToLightboxImage=goToLightboxImage,window.navigateToLightboxImage=navigateToLightboxImage,window.scrollGallery=scrollGallery,window.goToSlide=goToSlide,window.openCheckoutModal=m,window.closeCheckoutModal=g,window.applyPromoCode=b,window.finalizeOrder=S,window.selectPayment=selectPayment;