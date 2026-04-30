import './style.css';

/* ============================================
   VARIAVEIS GLOBAIS
   ============================================ */
let currentLightboxIndex = 0;           // Índice da imagem atual no lightbox
let currentGallerySlide = 0;            // Slide atual da galeria principal
let collections = [];                   // Array que armazena as coleções
let galleryImages = [];                 // Array que armazena as imagens da galeria
let revealObserver = null;              // Observer para animações de scroll

/* ============================================
   VARIAVEIS DO CHECKOUT
   ============================================ */
let currentOrderItem = null;            // Item atual sendo comprado
let appliedDiscount = 0;                // Desconto aplicado em porcentagem
let promoCodeApplied = '';              // Código promocional aplicado
let originalPriceValue = 0;             // Preço original do produto

/* ============================================
   MENU MOBILE - TOGGLE
   ============================================ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    // Toggle do menu mobile ao clicar no botão hamburguer
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fecha o menu ao clicar em qualquer link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

/* ============================================
   REVEAL OBSERVER - ANIMAÇÕES DE SCROLL
   ============================================ */
function setupRevealObserver() {
    if (revealObserver) revealObserver.disconnect();

    // Cria observer para detectar quando elementos entram na viewport
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    // Observa todos os elementos com classe .reveal
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
        // Verifica se já está visível inicialmente
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        }
    });
}

/* ============================================
   CARREGAMENTO DE DADOS DO JSON
   ============================================ */
async function loadData() {
    const grid = document.getElementById('collections-grid');

    // Mostra loading enquanto carrega
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

        // Renderiza coleções e galeria
        renderCollections();
        renderGallery();

        // Inicializa animações de scroll após renderização
        setTimeout(() => {
            setupRevealObserver();
        }, 100);

    } catch (error) {
        console.error('ERRO FATAL:', error);
        // Mostra erro na tela
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

    // Gera HTML das coleções
    const html = collections.map((c, index) => `
        <div onclick="openModal('${c.id}')" 
             class="collection-card reveal group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <div class="aspect-[4/5] overflow-hidden bg-gray-100">
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
   MODAL DE COLECAO - EXIBE PRODUTOS
   ============================================ */
function openModal(collectionId) {
    const modal = document.getElementById('collection-modal');
    const collection = collections.find(c => c.id === collectionId);

    if (!collection || !modal) {
        console.error('Modal ou colecao nao encontrados!');
        return;
    }

    const items = collection.items;

    // HTML completo do modal
    const modalHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()" id="modal-backdrop"></div>

        <div class="relative bg-white w-full max-w-6xl max-h-full rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in" onclick="event.stopPropagation()">

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

            <div class="w-full md:w-2/5 p-4 md:p-6 flex flex-col bg-white overflow-y-auto">
                <div id="modal-info-content">
                    <span class="text-gold font-bold tracking-widest text-[10px] uppercase">Catalogo RW Joias</span>
                    <h2 id="dynamic-title" class="font-serif text-2xl md:text-3xl mt-2 mb-1 text-gray-900">${items[0].titulo}</h2>

                    <div class="mb-4">
                        <span id="dynamic-price" class="text-xl md:text-2xl font-semibold text-charcoal">${items[0].preco}</span>
                        <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Valor aproximado / Consulte gramatura</p>
                    </div>

                    <div class="space-y-2 mb-4">
                        <div class="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Descricao</p>
                                <p id="dynamic-material" class="text-sm font-medium text-gray-800">${items[0].material}</p>
                            </div>
                            <i class="fa-solid fa-gem text-gold/50"></i>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Disponibilidade</p>
                                <p id="dynamic-status" class="text-sm font-medium text-green-600">${items[0].disponibilidade}</p>
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
  `;

    modal.innerHTML = modalHTML;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        setupModalObserver(collection);
    }, 100);
}

/* ============================================
   CHECKOUT MODERN - MODAL DE FINALIZACAO
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

    const checkoutModal = document.getElementById('checkout-modal');
    if (!checkoutModal) return;

    const modalHTML = `
    <div class="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeCheckoutModal()" id="modal-backdrop"></div>

        <div class="relative bg-white w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] rounded-t-[28px] md:rounded-[28px] overflow-hidden shadow-2xl flex flex-col animate-modal-in checkout-modal-content" onclick="event.stopPropagation()">
            
            <div class="flex items-center justify-center pt-3 pb-2 bg-gradient-to-b from-gray-50 to-white md:hidden">
                <div class="w-10 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            <button onclick="closeCheckoutModal()" 
                   class="absolute top-4 right-4 z-[110] w-9 h-9 bg-gray-100/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gray-200 transition-all md:flex hidden">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div class="checkout-container">
                
                <div class="checkout-scroll-content" id="checkout-scroll">
                    
                    <div class="checkout-product-header">
                        <img id="checkout-product-img" src="${item.src}" alt="${item.titulo}" class="checkout-product-image">
                        <div class="checkout-product-info">
                            <h3 id="checkout-product-name" class="checkout-product-title">${item.titulo}</h3>
                            <p class="checkout-product-material">
                                <i class="fa-solid fa-gem text-gold/60"></i>
                                ${item.material}
                            </p>
                            <div id="checkout-product-price" class="checkout-product-price">
                                ${item.preco}
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
                            <span id="checkout-total" class="footer-total-value">${item.preco}</span>
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
    `;

    checkoutModal.innerHTML = modalHTML;
    checkoutModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        setupCheckoutScroll();
        updateParcelamentoState();
        updateTotal();
    }, 100);
}

// Helper para seleção de pagamento
window.selectPayment = (method) => {
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
        const radio = opt.querySelector('input[type="radio"]');
        if (radio && radio.value === method) {
            opt.classList.add('selected');
            radio.checked = true;
        }
    });
    updateParcelamentoState();
    updateTotal();
};

// Setup do scroll inteligente
function setupCheckoutScroll() {
    const scrollContent = document.getElementById('checkout-scroll');
    const footer = document.getElementById('checkout-footer');

    if (!scrollContent || !footer) return;

    let footerTimeout;

    scrollContent.addEventListener('scroll', () => {
        const currentScroll = scrollContent.scrollTop;
        const maxScroll = scrollContent.scrollHeight - scrollContent.clientHeight;

        if (currentScroll > 100 || currentScroll > maxScroll * 0.7) {
            footer.classList.remove('hidden-footer');
            footer.classList.add('visible-footer');
        } else {
            if (currentScroll < 50 && maxScroll > 200) {
                footer.classList.remove('visible-footer');
                footer.classList.add('hidden-footer');
            }
        }
    }, { passive: true });

    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function () {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    });
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.add('animate-fade-out');
        setTimeout(() => {
            checkoutModal.classList.add('hidden');
            checkoutModal.classList.remove('animate-fade-out');
            checkoutModal.innerHTML = '';
            document.body.style.overflow = '';
        }, 300);
    }
}

function updateRadioVisuals() {
    // Atualiza visual dos radio buttons de pagamento
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
        // Crédito: habilita parcelamento
        parcelContainer.classList.remove('opacity-50', 'pointer-events-none');
        parcelSelect.disabled = false;
        updateParcelamentoOptions();
    } else {
        // PIX ou Débito: desabilita parcelamento
        parcelContainer.classList.add('opacity-50', 'pointer-events-none');
        parcelSelect.disabled = true;
        parcelSelect.innerHTML = '<option value="1">A vista (sem parcelamento)</option>';
    }
}

function updateParcelamentoOptions() {
    const select = document.getElementById('parcelamento');
    if (!select || !originalPriceValue) return;

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

    const maxParcelas = Math.min(10, Math.floor(displayPrice / 50));

    for (let i = 2; i <= maxParcelas; i++) {
        const valorParcela = (displayPrice / i).toFixed(2).replace('.', ',');
        const totalParcelado = displayPrice.toFixed(2).replace('.', ',');
        options += `<option value="${i}">${i}x de R$ ${valorParcela} sem juros (Total: R$ ${totalParcelado})</option>`;
    }

    select.innerHTML = options;

    if (currentValue && select.querySelector(`option[value="${currentValue}"]`)) {
        select.value = currentValue;
    }

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
        'OREI': 25
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
   FINALIZAR PEDIDO - ENVIA WHATSAPP
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
   SETUP MODAL OBSERVER - ATUALIZA INFO PRODUTO
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
   GALERIA - SISTEMA COMPLETO REVISADO
   ============================================ */

// Estado da galeria
const galleryState = {
    currentSlide: 0,           // Slide atual
    slidesPerView: 1,          // Quantos slides visíveis (responsivo)
    totalSlides: 0,            // Total de slides
    isDragging: false,         // Se está arrastando
    startX: 0,                 // Posição X inicial do toque/scroll
    currentX: 0,               // Posição X atual
    translateX: 0              // Transformação X atual
};

/**
 * Renderiza a galeria de imagens
 * Cria os slides HTML e indicadores
 */
function renderGallery() {
    const track = document.getElementById('gallery-track');
    const indicatorsContainer = document.getElementById('gallery-indicators');

    if (!track || !indicatorsContainer) return;

    if (!galleryImages.length) {
        track.innerHTML = '<p class="text-center text-charcoal/50 w-full py-20">Carregando galeria...</p>';
        return;
    }

    // Cria HTML dos slides
    track.innerHTML = galleryImages.map((img, i) => `
        <div class="gallery-slide flex-shrink-0 cursor-pointer group/slide relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-100" 
             data-index="${i}">
            <div class="aspect-[3/4] overflow-hidden">
                <img src="${img.src}" 
                     alt="${img.titulo}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                     loading="lazy")">
            </div>
            <div class="gallery-overlay absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300">
                <h3 class="text-white font-serif text-lg">${img.titulo}</h3>
                <p class="text-white/80 text-sm">${img.descricao}</p>
            </div>
        </div>
    `).join('');

    galleryState.totalSlides = galleryImages.length;

    // Detecta quantos slides mostrar por tela
    updateSlidesPerView();

    // Cria indicadores (dots)
    createIndicators(indicatorsContainer);

    // Posiciona no slide inicial
    updateGalleryPosition();

    document.querySelectorAll('.gallery-slide').forEach((slide, i) => {
        slide.addEventListener('click', () => {
            openLightbox(i);
        });
    });
}

/**
 * Atualiza quantos slides são visíveis baseado no tamanho da tela
 * Mobile: 1 slide | Tablet: 2 slides | Desktop: 3 slides
 */
function updateSlidesPerView() {
    const width = window.innerWidth;

    if (width <= 640) {
        galleryState.slidesPerView = 1;
    } else if (width <= 1024) {
        galleryState.slidesPerView = 2;
    } else {
        galleryState.slidesPerView = 3;
    }

    // Garante que o slide atual não ultrapasse o limite
    const maxSlide = Math.max(0, galleryState.totalSlides - galleryState.slidesPerView);
    if (galleryState.currentSlide > maxSlide) {
        galleryState.currentSlide = maxSlide;
    }

    updateGalleryPosition();
}

/**
 * Cria os indicadores (bolinhas) de navegação
 */
function createIndicators(container) {
    const maxIndex = Math.max(0, galleryState.totalSlides - galleryState.slidesPerView);

    container.innerHTML = Array.from({ length: maxIndex + 1 }, (_, i) => `
        <button class="gallery-indicator w-2 h-2 rounded-full bg-champagne transition-all duration-300 hover:bg-gold ${i === 0 ? 'w-8 bg-gold' : ''}" 
                onclick="goToSlide(${i})"
                aria-label="Ir para slide ${i + 1}">
        </button>
    `).join('');
}

/**
 * Rola a galeria para esquerda ou direita (botões)
 */
window.scrollGallery = (direction) => {
    const maxSlide = Math.max(0, galleryState.totalSlides - galleryState.slidesPerView);
    const newSlide = galleryState.currentSlide + (direction * galleryState.slidesPerView);

    goToSlide(Math.max(0, Math.min(newSlide, maxSlide)));
};

/**
 * Vai para um slide específico (indicadores)
 */
window.goToSlide = (index) => {
    const maxSlide = Math.max(0, galleryState.totalSlides - galleryState.slidesPerView);
    galleryState.currentSlide = Math.max(0, Math.min(index, maxSlide));

    updateGalleryPosition();
    updateIndicators();
};

/**
 * Atualiza a posição do slider (transform translateX)
 */
function updateGalleryPosition() {
    const track = document.getElementById('gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');

    if (!track || slides.length === 0) return;

    const slideWidth = slides[0].offsetWidth + 16; // 16px é o gap
    galleryState.translateX = -galleryState.currentSlide * slideWidth;

    track.style.transform = `translateX(${galleryState.translateX}px)`;
}

/**
 * Atualiza indicadores ativos
 */
function updateIndicators() {
    document.querySelectorAll('.gallery-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('w-8', index === galleryState.currentSlide);
        indicator.classList.toggle('bg-gold', index === galleryState.currentSlide);
        indicator.classList.toggle('w-2', index !== galleryState.currentSlide);
        indicator.classList.toggle('bg-champagne', index !== galleryState.currentSlide);
    });
}

// Atualiza galeria ao redimensionar tela
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateSlidesPerView();
        createIndicators(document.getElementById('gallery-indicators'));
    }, 250);
});

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
   LIGHTBOX MODERNO - ESTILO APPLE PREMIUM
   ============================================ */

let lightboxTouchStartX = 0;
let lightboxTouchEndX = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    if (!modal) {
        console.error('Lightbox modal não encontrado!');
        return;
    }

    const currentImage = galleryImages[currentLightboxIndex];

    modal.innerHTML = `
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
                        src="${currentImage.src}" 
                        alt="${currentImage.titulo}"
                        class="max-h-[50vh] md:max-h-[70vh] w-auto object-contain transition-all duration-500 ease-out"
                        style="opacity: 0; transform: scale(0.95);"
                        loading="eager">
                </div>
                
                <!-- Contador de imagens -->
                <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
                    ${currentLightboxIndex + 1} / ${galleryImages.length}
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
                    ${currentImage.titulo}
                </h2>
                
                <p id="lightbox-desc" 
                   class="text-white/70 text-base md:text-lg mb-8 leading-relaxed opacity-0 animate-fade-in"
                   style="animation-delay: 0.3s; animation-fill-mode: forwards;">
                    ${currentImage.descricao}
                </p>

                <!-- Indicadores de navegação -->
                <div class="flex items-center justify-center md:justify-start gap-2">
                    ${galleryImages.map((_, i) => `
                        <button onclick="goToLightboxImage(${i})" 
                                class="h-1.5 rounded-full transition-all duration-300 ${i === currentLightboxIndex ? 'w-8 bg-gold' : 'w-1.5 bg-white/30 hover:bg-white/50'}">
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Animação de entrada da imagem
    setTimeout(() => {
        const img = document.getElementById('lightbox-image');
        if (img) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    }, 50);

    // Setup do touch/swipe
    setupLightboxTouch();
}

function setupLightboxTouch() {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    // Touch events para swipe
    modal.addEventListener('touchstart', handleLightboxTouchStart, { passive: true });
    modal.addEventListener('touchmove', handleLightboxTouchMove, { passive: true });
    modal.addEventListener('touchend', handleLightboxTouchEnd);
}

function handleLightboxTouchStart(e) {
    lightboxTouchStartX = e.touches[0].clientX;
}

function handleLightboxTouchMove(e) {
    lightboxTouchEndX = e.touches[0].clientX;
}

function handleLightboxTouchEnd() {
    const swipeThreshold = 50;
    const diff = lightboxTouchStartX - lightboxTouchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para esquerda - próxima imagem
            navigateLightbox(1);
        } else {
            // Swipe para direita - imagem anterior
            navigateLightbox(-1);
        }
    }
}

function updateLightboxContent() {
    const img = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');
    const modal = document.getElementById('lightbox-modal');

    if (!img || !title || !desc || !modal) return;

    const currentImage = galleryImages[currentLightboxIndex];

    // Fade out
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';

    setTimeout(() => {
        // Atualiza conteúdo
        img.src = currentImage.src;
        img.alt = currentImage.titulo;
        title.textContent = currentImage.titulo;
        desc.textContent = currentImage.descricao;

        // Atualiza contador
        const counter = modal.querySelector('.absolute.-bottom-8');
        if (counter) {
            counter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
        }

        // Atualiza indicadores
        modal.querySelectorAll('button[class*="h-1.5"]').forEach((btn, i) => {
            if (i === currentLightboxIndex) {
                btn.className = 'h-1.5 w-8 rounded-full bg-gold transition-all duration-300';
            } else {
                btn.className = 'h-1.5 w-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300';
            }
        });

        // Fade in
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 50);
    }, 300);
}

window.navigateToLightboxImage = (index) => {
    goToLightboxImage(index);
};

window.goToLightboxImage = (index) => {
    if (index === currentLightboxIndex) return;
    currentLightboxIndex = index;
    updateLightboxContent();
};

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
            modal.innerHTML = '';
            document.body.style.overflow = '';
        }, 300);
    }
};

// Suporte teclado
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && !modal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});

/* ============================================
   INICIALIZACAO - DOMContentLoaded
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
            updateParcelamentoState();
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
   EXPORTS PARA ONCLICK INLINE (HTML)
   ============================================ */

// Garante que TODAS as funções estejam no window
window.openModal = openModal;
window.closeModal = closeModal;
window.scrollModalSlider = scrollModalSlider;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.goToLightboxImage = goToLightboxImage;
window.navigateToLightboxImage = navigateToLightboxImage;
window.scrollGallery = scrollGallery;
window.goToSlide = goToSlide;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.applyPromoCode = applyPromoCode;
window.finalizeOrder = finalizeOrder;
window.selectPayment = selectPayment;

