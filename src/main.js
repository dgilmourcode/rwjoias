import './style.css';

/* ============================================
   VARIAVEIS GLOBAIS
   ============================================ */
let currentLightboxIndex = 0;
let currentGallerySlide = 0;
let collections = [];
let galleryImages = [];
let revealObserver = null;

/* ============================================
   VARIAVEIS DO CHECKOUT
   ============================================ */
let currentOrderItem = null;
let appliedDiscount = 0;
let promoCodeApplied = '';
let originalPriceValue = 0;

/* ============================================
   MENU MOBILE - TOGGLE
   ============================================ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

/* ============================================
   REVEAL OBSERVER
   ============================================ */
function setupRevealObserver() {
    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        }
    });
}

/* ============================================
   CARREGAMENTO DE DADOS
   ============================================ */
async function loadData() {
    const grid = document.getElementById('collections-grid');

    if (grid) {
        grid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
        <p class="text-charcoal/50 font-medium animate-pulse">Carregando colecoes...</p>
      </div>
    `;
    }

    try {
        const jsonPath = './data.json';
        const response = await fetch(jsonPath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            cache: 'no-cache'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        collections = data.collections || [];
        galleryImages = data.galleryImages || [];

        renderCollections();
        renderGallery();

        setTimeout(() => {
            setupRevealObserver();
        }, 100);

    } catch (error) {
        console.error('ERRO FATAL:', error);
        if (grid) {
            grid.innerHTML = `
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
      `;
        }
    }
}

/* ============================================
   RENDERIZACAO DE COLECOES
   ============================================ */
function renderCollections() {
    const grid = document.getElementById('collections-grid');
    if (!grid) return;
    if (!collections.length) {
        grid.innerHTML = '<p class="text-center text-charcoal/50">Nenhuma colecao disponivel</p>';
        return;
    }

    const html = collections.map((c, index) => `
        <div onclick="openModal('${c.id}')" 
             class="collection-card reveal group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${c.image}" 
                     alt="${c.name}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     loading="${index === 0 ? 'eager' : 'lazy'}"
                     ${index === 0 ? 'fetchpriority="high"' : ''}>
            </div>
            <div class="p-5">
                <h3 class="font-serif text-xl font-medium text-gray-800">${c.name}</h3>
                <p class="text-sm text-gold font-medium mt-1">Explorar <i class="fa-solid fa-arrow-right ml-1"></i></p>
            </div>
        </div>
    `).join('');

    grid.innerHTML = html;
}

/* ============================================
   MODAL DE COLECAO
   ============================================ */
function openModal(collectionId) {
    const modal = document.getElementById('collection-modal');
    const collection = collections.find(c => c.id === collectionId);

    if (!collection || !modal) {
        console.error('Modal ou colecao nao encontrados!');
        return;
    }

    const items = collection.items;

    const modalHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()" id="modal-backdrop"></div>

        <div class="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in" onclick="event.stopPropagation()">

            <button onclick="closeModal()" 
                   class="absolute top-4 right-4 z-[110] w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div class="relative w-full md:w-3/5 bg-[#FBFBFD] h-[350px] md:h-auto overflow-hidden group">
                <div class="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth" id="modal-slider">
                    ${items.map((item, idx) => `
                        <div class="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-6">
                            <img src="${item.src}" 
                                alt="${item.titulo}" 
                                class="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-black/5"
                                loading="${idx === 0 ? 'eager' : 'lazy'}">
                        </div>
                    `).join('')}
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
                    ${items.map((_, i) => `
                        <div class="modal-dot w-2 h-2 rounded-full bg-white/40 transition-all duration-300 ${i === 0 ? 'w-6 bg-white' : ''}"></div>
                    `).join('')}
                </div>
            </div>

            <div class="w-full md:w-2/5 p-6 md:p-12 flex flex-col bg-white overflow-y-auto">
                <div id="modal-info-content">
                    <span class="text-gold font-bold tracking-widest text-[10px] uppercase">Catalogo RW Joias</span>
                    <h2 id="dynamic-title" class="font-serif text-2xl md:text-3xl mt-2 mb-2 text-gray-900">${items[0].titulo}</h2>

                    <div class="mb-6">
                        <span id="dynamic-price" class="text-xl md:text-2xl font-semibold text-charcoal">${items[0].preco}</span>
                        <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Valor aproximado / Consulte gramatura</p>
                    </div>

                    <div class="space-y-3 mb-8">
                        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Descricao</p>
                                <p id="dynamic-material" class="text-sm font-medium text-gray-800">${items[0].material}</p>
                            </div>
                            <i class="fa-solid fa-gem text-gold/50"></i>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Disponibilidade</p>
                                <p id="dynamic-status" class="text-sm font-medium text-green-600">${items[0].disponibilidade}</p>
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
  `;

    modal.innerHTML = modalHTML;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        setupModalObserver(collection);
    }, 100);
}

/* ============================================
   CHECKOUT MODERN - CORRIGIDO
   ============================================ */
function openCheckoutModal(item) {
    console.log('Abrindo checkout modal...');

    const collectionModal = document.getElementById('collection-modal');
    if (collectionModal) {
        collectionModal.classList.add('hidden');
        collectionModal.innerHTML = '';
    }

    currentOrderItem = item;
    appliedDiscount = 0;
    promoCodeApplied = '';

    const priceText = item.preco.replace(/[^\d,]/g, '').replace('.', '').replace(',', '.');
    originalPriceValue = parseFloat(priceText);

    const imgEl = document.getElementById('checkout-product-img');
    const nameEl = document.getElementById('checkout-product-name');
    const priceEl = document.getElementById('checkout-product-price');
    const materialEl = document.getElementById('checkout-product-material');
    const totalEl = document.getElementById('checkout-total');

    if (imgEl) imgEl.src = item.src;
    if (nameEl) nameEl.textContent = item.titulo;
    if (priceEl) priceEl.textContent = item.preco;
    if (materialEl) materialEl.textContent = item.material;
    if (totalEl) totalEl.textContent = item.preco;

    const promoInput = document.getElementById('promo-code');
    const nameInput = document.getElementById('customer-name');
    const addressInput = document.getElementById('customer-address');
    const promoMsg = document.getElementById('promo-message');
    const parcelSelect = document.getElementById('parcelamento');

    if (promoInput) promoInput.value = '';
    if (nameInput) nameInput.value = '';
    if (addressInput) addressInput.value = '';
    if (promoMsg) {
        promoMsg.classList.add('hidden');
        promoMsg.textContent = '';
    }
    if (parcelSelect) parcelSelect.value = '1';

    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.checked = radio.value === 'PIX';
    });
    updateRadioVisuals();
    updateParcelamentoState(); // Atualiza estado do parcelamento baseado no pagamento
    updateTotal();

    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function updateRadioVisuals() {
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        const check = radio.closest('label')?.querySelector('.radio-check');
        if (check) {
            check.style.opacity = radio.checked ? '1' : '0';
        }
    });
}

/* ============================================
   PARCELAMENTO - CONTROLE DE ESTADO
   ============================================ */
function updateParcelamentoState() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    const parcelContainer = document.getElementById('parcelamento-container');
    const parcelSelect = document.getElementById('parcelamento');

    if (!parcelContainer || !parcelSelect) return;

    if (paymentMethod === 'CREDITO') {
        // Credito: habilita parcelamento
        parcelContainer.classList.remove('opacity-50', 'pointer-events-none');
        parcelSelect.disabled = false;
        updateParcelamentoOptions();
    } else {
        // PIX ou Debito: desabilita parcelamento
        parcelContainer.classList.add('opacity-50', 'pointer-events-none');
        parcelSelect.disabled = true;
        parcelSelect.innerHTML = '<option value="1">A vista (sem parcelamento)</option>';
    }
}

function updateParcelamentoOptions() {
    const select = document.getElementById('parcelamento');
    if (!select || !originalPriceValue) return;

    // 🧠 salva o valor atual antes de resetar
    const currentValue = select.value;

    const finalPrice = appliedDiscount > 0
        ? originalPriceValue - (originalPriceValue * appliedDiscount / 100)
        : originalPriceValue;

    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    let displayPrice = finalPrice;

    if (paymentMethod === 'PIX') {
        displayPrice = finalPrice * 0.95;
    }

    let options = '';

    options += `<option value="1">A vista no Credito - R$ ${displayPrice.toFixed(2).replace('.', ',')}</option>`;

    const maxParcelas = Math.min(12, Math.floor(displayPrice / 50));

    for (let i = 2; i <= maxParcelas; i++) {
        const valorParcela = (displayPrice / i).toFixed(2).replace('.', ',');
        const totalParcelado = displayPrice.toFixed(2).replace('.', ',');
        options += `<option value="${i}">${i}x de R$ ${valorParcela} sem juros (Total: R$ ${totalParcelado})</option>`;
    }

    select.innerHTML = options;

    // 🧠 tenta restaurar o valor anterior
    if (currentValue && select.querySelector(`option[value="${currentValue}"]`)) {
        select.value = currentValue;
    }

    // 🔥 garante que sempre vai atualizar
    select.onchange = () => updateTotal();
}

function applyPromoCode() {
    const codeInput = document.getElementById('promo-code');
    const messageEl = document.getElementById('promo-message');
    const code = codeInput.value.trim().toUpperCase();

    const validCodes = {
        'PRIMEIRACOMPRA': 10,
        'VIP15': 15,
        'FRETEGRATIS': 0,
        'RWJOIAS20': 20,
        'OUREI': 25
    };

    if (validCodes[code] !== undefined) {
        appliedDiscount = validCodes[code];
        promoCodeApplied = code;

        if (appliedDiscount > 0) {
            messageEl.textContent = `Cupom ${code} aplicado! ${appliedDiscount}% de desconto`;
            messageEl.className = 'mt-2 text-sm text-green-600 font-medium';
        } else {
            messageEl.textContent = `Cupom ${code} aplicado! Frete gratis`;
            messageEl.className = 'mt-2 text-sm text-green-600 font-medium';
        }
        messageEl.classList.remove('hidden');

        updateTotal();
        updateParcelamentoOptions();
    } else {
        appliedDiscount = 0;
        promoCodeApplied = '';
        messageEl.textContent = 'Cupom invalido ou expirado';
        messageEl.className = 'mt-2 text-sm text-red-600 font-medium';
        messageEl.classList.remove('hidden');

        updateTotal();
        updateParcelamentoOptions();
    }
}

function updateTotal() {
    if (!currentOrderItem || originalPriceValue <= 0) return;

    const totalEl = document.getElementById('checkout-total');
    const priceEl = document.getElementById('checkout-product-price');

    let finalPrice = originalPriceValue;
    let discountAmount = 0;

    if (appliedDiscount > 0) {
        discountAmount = (originalPriceValue * appliedDiscount) / 100;
        finalPrice = originalPriceValue - discountAmount;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    let pixDiscount = 0;

    if (paymentMethod === 'PIX') {
        pixDiscount = finalPrice * 0.05;
        finalPrice = finalPrice - pixDiscount;
    }

    const formattedOriginal = `R$ ${originalPriceValue.toFixed(2).replace('.', ',')}`;
    const formattedFinal = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;

    if (totalEl) totalEl.textContent = formattedFinal;

    if (priceEl && (appliedDiscount > 0 || paymentMethod === 'PIX')) {
        let priceHTML = `<span class="line-through text-gray-400 text-sm">${formattedOriginal}</span>`;
        if (appliedDiscount > 0) {
            priceHTML += ` <span class="text-green-600 text-xs">(-${appliedDiscount}%)</span>`;
        }
        if (paymentMethod === 'PIX') {
            priceHTML += ` <span class="text-green-600 text-xs">(-5% PIX)</span>`;
        }
        priceHTML += `<br><span class="text-gold font-bold text-xl">${formattedFinal}</span>`;
        priceEl.innerHTML = priceHTML;
    } else if (priceEl) {
        priceEl.textContent = formattedOriginal;
    }
}

/* ============================================
   FINALIZAR PEDIDO - CORRIGIDO COM PARCELAS
   ============================================ */
function finalizeOrder() {
    if (!currentOrderItem) return;

    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    const customerName = document.getElementById('customer-name').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    const parcelas = document.getElementById('parcelamento')?.value || '1';

    if (!customerName) {
        alert('Por favor, digite seu nome');
        document.getElementById('customer-name').focus();
        return;
    }

    if (!customerAddress) {
        alert('Por favor, digite o endereco de entrega');
        document.getElementById('customer-address').focus();
        return;
    }

    let finalPrice = originalPriceValue;
    let discountText = '';
    let pixDiscountText = '';

    if (appliedDiscount > 0) {
        const discount = (originalPriceValue * appliedDiscount) / 100;
        finalPrice = originalPriceValue - discount;
        discountText = `\n*Desconto (${appliedDiscount}%):* -R$ ${discount.toFixed(2).replace('.', ',')}`;
    }

    if (paymentMethod === 'PIX') {
        const pixDiscount = finalPrice * 0.05;
        finalPrice = finalPrice - pixDiscount;
        pixDiscountText = `\n*Desconto PIX (5%):* -R$ ${pixDiscount.toFixed(2).replace('.', ',')}`;
    }

    // ==========================================
    // PAGAMENTO - COM PARCELAS CORRETAS
    // ==========================================
    let pagamentoTexto = '';

    if (paymentMethod === 'PIX') {
        pagamentoTexto = `• *Forma:* PIX (A vista)\n• *Beneficio:* 5% de desconto + Aprovacao imediata`;
    } else if (paymentMethod === 'DEBITO') {
        pagamentoTexto = `• *Forma:* Cartao de Debito (A vista)\n• *Pagamento:* Na entrega do produto`;
    } else if (paymentMethod === 'CREDITO') {
        const numParcelas = parseInt(parcelas);
        if (numParcelas === 1) {
            pagamentoTexto = `• *Forma:* Cartao de Credito (A vista)\n• *Pagamento:* A vista no credito - R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
        } else {
            const valorParcela = (finalPrice / numParcelas).toFixed(2).replace('.', ',');
            pagamentoTexto = `• *Forma:* Cartao de Credito (Parcelado)\n• *Parcelamento:* ${numParcelas}x de R$ ${valorParcela} sem juros\n• *Total parcelado:* R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
        }
    }

    const message =
        `*━━━━━━━━━━━━━━━━━━━━━━*\n    *RW JOIAS* - Pedido\n*━━━━━━━━━━━━━━━━━━━━━━*\n\n*📦 PRODUTO*\n• *${currentOrderItem.titulo}*\n• *Material:* ${currentOrderItem.material}\n• *Disponibilidade:* ${currentOrderItem.disponibilidade}\n\n*💳 PAGAMENTO*\n${pagamentoTexto}\n\n*🏷️ CUPOM*\n${promoCodeApplied ? `• *Codigo:* ${promoCodeApplied} (${appliedDiscount}% OFF)` : '• Nenhum cupom aplicado'}\n\n*💰 RESUMO*\n• *Subtotal:* R$ ${originalPriceValue.toFixed(2).replace('.', ',')}\n${discountText}\n${pixDiscountText}\n• *Total:* *R$ ${finalPrice.toFixed(2).replace('.', ',')}*\n\n*👤 CLIENTE*\n• *Nome:* ${customerName}\n• *Endereco:* ${customerAddress}\n\n*━━━━━━━━━━━━━━━━━━━━━━*\nOla! Gostaria de finalizar este pedido.\nAguardo confirmacao e instrucoes de pagamento. ✨\n*━━━━━━━━━━━━━━━━━━━━━━*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5586994888666?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
        closeCheckoutModal();
    }, 500);
}

/* ============================================
   SETUP MODAL OBSERVER
   ============================================ */
function setupModalObserver(collection) {
    const slider = document.getElementById('modal-slider');
    const whatsappLink = document.getElementById('whatsapp-link');

    if (!slider) {
        console.error('Slider nao encontrado!');
        return;
    }

    if (!whatsappLink) {
        console.error('Botao WhatsApp nao encontrado!');
        return;
    }

    const updateUI = () => {
        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        const item = collection.items[index];

        if (!item) return;

        const titleEl = document.getElementById('dynamic-title');
        const priceEl = document.getElementById('dynamic-price');
        const materialEl = document.getElementById('dynamic-material');
        const statusEl = document.getElementById('dynamic-status');

        if (titleEl) titleEl.textContent = item.titulo;
        if (priceEl) priceEl.textContent = item.preco;
        if (materialEl) materialEl.textContent = item.material;
        if (statusEl) statusEl.textContent = item.disponibilidade;

        const dots = document.querySelectorAll('.modal-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('w-6', i === index);
            dot.classList.toggle('bg-white', i === index);
            dot.classList.toggle('w-2', i !== index);
            dot.classList.toggle('bg-white/40', i !== index);
        });
    };

    slider.addEventListener('scroll', updateUI, { passive: true });
    updateUI();

    const newWhatsappLink = whatsappLink.cloneNode(true);
    whatsappLink.parentNode.replaceChild(newWhatsappLink, whatsappLink);

    newWhatsappLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const currentIndex = Math.round(slider.scrollLeft / slider.offsetWidth);
        const currentItem = collection.items[currentIndex];

        if (currentItem) {
            openCheckoutModal(currentItem);
        } else {
            alert('Erro: Produto nao encontrado');
        }
    });
}

/* ============================================
   GALERIA
   ============================================ */
function renderGallery() {
    const track = document.getElementById('gallery-track');
    const indicatorsContainer = document.getElementById('gallery-indicators');
    if (!track || !indicatorsContainer) return;

    if (!galleryImages.length) {
        track.innerHTML = '<p class="text-center text-charcoal/50 w-full py-20">Carregando galeria...</p>';
        return;
    }

    track.innerHTML = galleryImages.map((img, i) => `
    <div onclick="openLightbox(${i})" 
         class="gallery-slide flex-shrink-0 cursor-pointer group/slide relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-100">
        <div class="aspect-[3/4] overflow-hidden">
            <img src="${img.src}" 
                 alt="${img.titulo}" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                 loading="lazy">
        </div>

        <div class="gallery-overlay">
            <h3 class="text-amber-50">${img.titulo}</h3>
            <p class="text-amber-100">${img.descricao}</p>
        </div>
    </div>
  `).join('');

    indicatorsContainer.innerHTML = galleryImages.map((_, i) => `
    <button onclick="goToSlide(${i})" 
            class="gallery-indicator w-2 h-2 rounded-full bg-champagne transition-all duration-300 hover:bg-gold ${i === 0 ? 'w-8 bg-gold' : ''}">
    </button>
  `).join('');

    currentGallerySlide = 0;
    track.style.transform = 'translateX(0)';
    updateGalleryIndicators();
}

/* ============================================
   NAVEGACAO DA GALERIA
   ============================================ */
window.scrollGallery = (direction) => {
    const track = document.getElementById('gallery-track');
    const slides = track?.querySelectorAll('.gallery-slide');
    if (!track || !slides.length) return;

    // Aguarda o próximo frame para garantir que os elementos estão renderizados
    requestAnimationFrame(() => {
        const slide = slides[0];
        const slideWidth = slide.offsetWidth + 16; // 16px é o gap

        if (slideWidth <= 16) {
            console.warn('Slide width é 0 ou inválido');
            return;
        }

        const containerWidth = track.parentElement.offsetWidth;
        const visibleSlides = Math.max(1, Math.ceil(containerWidth / slideWidth) - 1);

        const scrollAmount = visibleSlides * direction;
        const maxIndex = Math.max(0, slides.length - visibleSlides);

        currentGallerySlide = Math.max(0, Math.min(
            currentGallerySlide + scrollAmount,
            maxIndex
        ));

        track.style.transform = `translateX(-${currentGallerySlide * slideWidth}px)`;
        updateGalleryIndicators();
    });
};

window.goToSlide = (index) => {
    const track = document.getElementById('gallery-track');
    const slide = track?.querySelector('.gallery-slide');
    if (!track || !slide) return;

    requestAnimationFrame(() => {
        currentGallerySlide = index;
        const slideWidth = slide.offsetWidth + 16;
        track.style.transform = `translateX(-${currentGallerySlide * slideWidth}px)`;
        updateGalleryIndicators();
    });
};

function updateGalleryIndicators() {
    document.querySelectorAll('.gallery-indicator').forEach((ind, i) => {
        ind.classList.toggle('w-8', i === currentGallerySlide);
        ind.classList.toggle('bg-gold', i === currentGallerySlide);
        ind.classList.toggle('w-2', i !== currentGallerySlide);
        ind.classList.toggle('bg-champagne', i !== currentGallerySlide);
    });
}

/* ============================================
   FUNCOES DO MODAL DE COLECAO
   ============================================ */
window.scrollModalSlider = (direction) => {
    const slider = document.getElementById('modal-slider');
    if (slider) slider.scrollBy({ left: direction * slider.offsetWidth, behavior: 'smooth' });
};

window.closeModal = () => {
    const modal = document.getElementById('collection-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        modal.innerHTML = '';
    }
};

/* ============================================
   LIGHTBOX
   ============================================ */
function openLightbox(index) {
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    modal.innerHTML = `
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
                        src="${galleryImages[currentLightboxIndex].src}" 
                        alt="${galleryImages[currentLightboxIndex].titulo}"
                        class="max-h-[60vh] md:max-h-[70vh] w-auto object-contain animate-image-load"
                        loading="eager">
                </div>
            </div>

            <div class="w-full md:w-80 text-center md:text-left animate-slide-up">
                <span class="text-gold/80 text-sm uppercase tracking-widest">Galeria RW Joias</span>
                <h2 id="lightbox-title" class="font-serif text-3xl md:text-4xl text-white mt-2 mb-3 p-2">${galleryImages[currentLightboxIndex].titulo}</h2>
                <p id="lightbox-desc" class="text-white/70 text-lg mb-6">${galleryImages[currentLightboxIndex].descricao}</p>
            </div>
        </div>
    </div>
  `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function updateLightboxContent() {
    const img = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');

    if (img && title && desc) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = galleryImages[currentLightboxIndex].src;
            title.textContent = galleryImages[currentLightboxIndex].titulo;
            desc.textContent = galleryImages[currentLightboxIndex].descricao;
            img.style.opacity = '1';
        }, 50);
    }
}

window.navigateLightbox = (dir) => {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
    updateLightboxContent();
};

window.closeLightbox = () => {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('animate-fade-out');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('animate-fade-out');
            document.body.style.overflow = '';
        }, 300);
    }
};

// Suporte teclado
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal?.classList.contains('hidden') === false) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});

/* ============================================
   INICIALIZACAO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 150);

    setupCheckoutListeners();
});

function setupCheckoutListeners() {
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function () {
            updateRadioVisuals();
            updateParcelamentoState(); // Atualiza estado do parcelamento
            updateTotal();
        });
    });

    document.getElementById('promo-code')?.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            applyPromoCode();
        }
    });

    document.getElementById('parcelamento')?.addEventListener('change', () => {
        updateTotal();
    });
}

/* ============================================
   EXPORTS PARA ONCLICK INLINE
   ============================================ */
window.openModal = openModal;
window.closeModal = closeModal;
window.scrollModalSlider = scrollModalSlider;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.scrollGallery = scrollGallery;
window.goToSlide = goToSlide;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.applyPromoCode = applyPromoCode;
window.finalizeOrder = finalizeOrder;