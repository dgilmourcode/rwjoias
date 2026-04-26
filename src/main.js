import './style.css';

/* ============================================
   VARIÁVEIS GLOBAIS
   ============================================ */
let currentLightboxIndex = 0;
let currentGallerySlide = 0;
let collections = [];
let galleryImages = [];
let revealObserver = null;

/* ============================================
MENU MOBILE - TOGGLE
============================================ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fecha o menu ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

/* ============================================
REVEAL OBSERVER - FUNÇÃO REUTILIZÁVEL
============================================ */
function setupRevealObserver() {
    // Limpa observer anterior se existir
    if (revealObserver) {
        revealObserver.disconnect();
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    // Observa TODOS os elementos .reveal, incluindo os novos
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
        // Fallback: se já estiver visível no viewport, ativa imediatamente
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        }
    });
}

/* ============================================
CARREGAMENTO DE DADOS - CORRIGIDO
============================================ */
async function loadData() {
    const grid = document.getElementById('collections-grid');

    console.log('🔄 Iniciando loadData...');
    console.log('📍 BASE_URL:', import.meta.env.BASE_URL);

    // Mostra loading
    if (grid) {
        grid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
        <p class="text-charcoal/50 font-medium animate-pulse">Carregando coleções...</p>
      </div>
    `;
    }

    try {
        // Caminho correto para o JSON
        const jsonPath = './data.json';

        console.log('📦 Buscando JSON em:', jsonPath);

        const response = await fetch(jsonPath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            cache: 'no-cache'
        });

        console.log('📊 Status:', response.status);
        console.log('📊 OK?', response.ok);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        console.log('✅ JSON parseado:', data);
        console.log('📊 Collections:', data.collections?.length);
        console.log('📊 Gallery:', data.galleryImages?.length);

        // Verifica se os dados existem
        if (!data.collections || data.collections.length === 0) {
            console.warn('⚠️ AVISO: collections está vazio ou não existe!');
        }

        if (!data.galleryImages || data.galleryImages.length === 0) {
            console.warn('⚠️ AVISO: galleryImages está vazio ou não existe!');
        }

        collections = data.collections || [];
        galleryImages = data.galleryImages || [];

        console.log('🎨 Chamando renderCollections...');
        renderCollections();

        console.log('🎨 Chamando renderGallery...');
        renderGallery();

        // ⬇️ CORREÇÃO CRÍTICA: Reconfigura o observer APÓS renderizar
        setTimeout(() => {
            setupRevealObserver();
            console.log('✅ Observer reconfigurado após renderização!');
        }, 100);

        console.log('✅ Renderização concluída!');

    } catch (error) {
        console.error('❌ ERRO FATAL:', error);
        console.error('📋 Stack:', error.stack);

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
            🔄 Tentar Novamente
          </button>
        </div>
      `;
        }
    }
}

/* ============================================
RENDERIZAÇÃO DE COLEÇÕES - COM LOGGING
============================================ */
function renderCollections() {
    const grid = document.getElementById('collections-grid');

    console.log('🔍 renderCollections chamada');
    console.log('🔍 grid existe?', !!grid);
    console.log('🔍 collections.length:', collections.length);

    if (!grid) {
        console.error('❌ Elemento #collections-grid NÃO encontrado!');
        return;
    }

    if (!collections.length) {
        console.warn('⚠️ collections está vazio!');
        grid.innerHTML = '<p class="text-center text-charcoal/50">Nenhuma coleção disponível</p>';
        return;
    }

    console.log('✅ Renderizando', collections.length, 'coleções...');

    try {
        const html = collections.map((c, index) => {
            console.log(`  📦 Collection ${index + 1}:`, c.name, '| ID:', c.id);

            return `
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
      `;
        }).join('');

        grid.innerHTML = html;
        console.log('✅ Collections renderizadas com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao renderizar collections:', error);
        grid.innerHTML = '<p class="text-center text-red-500">Erro ao carregar coleções</p>';
    }
}

/* ============================================
   MODAL DE COLEÇÃO - COM WHATSAPP FORMATADO
   ============================================ */
function openModal(collectionId) {
    const modal = document.getElementById('collection-modal');
    const collection = collections.find(c => c.id === collectionId);

    if (!collection || !modal) return;

    const items = collection.items;

    modal.innerHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()"></div>

        <div class="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in">

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
                    ${items.map((_, i) => `
                        <div class="modal-dot w-2 h-2 rounded-full bg-white/40 transition-all duration-300 ${i === 0 ? 'w-6 bg-white' : ''}"></div>
                    `).join('')}
                </div>
            </div>

            <div class="w-full md:w-2/5 p-6 md:p-12 flex flex-col bg-white overflow-y-auto">
                <div id="modal-info-content">
                    <span class="text-gold font-bold tracking-widest text-[10px] uppercase">Catálogo RW Joias</span>
                    <h2 id="dynamic-title" class="font-serif text-2xl md:text-3xl mt-2 mb-2 text-gray-900">${items[0].titulo}</h2>

                    <div class="mb-6">
                        <span id="dynamic-price" class="text-xl md:text-2xl font-semibold text-charcoal">${items[0].preco}</span>
                        <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Valor aproximado / Consulte gramatura</p>
                    </div>

                    <div class="space-y-3 mb-8">
                        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p class="text-[9px] uppercase text-gray-400 font-bold">Descrição</p>
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
                    <a id="whatsapp-link" href="#" target="_blank" 
                       class="w-full bg-black text-white py-4 rounded-full text-sm font-bold hover:bg-gold transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 active:scale-95">
                        <i class="fa-brands fa-whatsapp text-lg"></i> Finalizar Compra
                    </a>
                </div>
            </div>
        </div>
    </div>
  `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setupModalObserver(collection);
}

function setupModalObserver(collection) {
    const slider = document.getElementById('modal-slider');
    if (!slider) return;

    const updateUI = () => {
        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        const item = collection.items[index];
        if (!item) return;

        // Atualiza textos
        document.getElementById('dynamic-title').textContent = item.titulo;
        document.getElementById('dynamic-price').textContent = item.preco;
        document.getElementById('dynamic-material').textContent = item.material;
        document.getElementById('dynamic-status').textContent = item.disponibilidade;

        // Atualiza dots
        const dots = document.querySelectorAll('.modal-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('w-6', i === index);
            dot.classList.toggle('bg-white', i === index);
            dot.classList.toggle('w-2', i !== index);
            dot.classList.toggle('bg-white/40', i !== index);
        });

        // WhatsApp link formatado - NOTA DE PEDIDO COMPLETA
        const notaPedido = `*NOTA DE PEDIDO - RW JOIAS*%0A%0A` +
            `*Nome:* ${item.titulo}%0A` +
            `*Preço:* ${item.preco}%0A` +
            `*Descrição:* ${item.material}%0A` +
            `*Status:* ${item.disponibilidade}%0A%0A` +
            `--------------------------------%0A` +
            `Olá! Gostaria de finalizar a compra deste item.`;

        document.getElementById('whatsapp-link').href = `https://wa.me/5586994888666?text=${notaPedido}`;
    };

    slider.addEventListener('scroll', updateUI, { passive: true });
    updateUI();
}

/* ============================================
   GALERIA COM OVERLAY HOVER
   ============================================ */
function renderGallery() {
    const track = document.getElementById('gallery-track');
    const indicatorsContainer = document.getElementById('gallery-indicators');
    if (!track || !indicatorsContainer) return;

    if (!galleryImages.length) {
        track.innerHTML = '<p class="text-center text-charcoal/50 w-full py-20">Carregando galeria...</p>';
        return;
    }

    // Renderiza as imagens COM OVERLAY
    track.innerHTML = galleryImages.map((img, i) => `
    <div onclick="openLightbox(${i})" 
         class="gallery-slide flex-shrink-0 cursor-pointer group/slide relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-100">
        <div class="aspect-[3/4] overflow-hidden">
            <img src="${img.src}" 
                 alt="${img.titulo}" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                 loading="lazy">
        </div>

        <!-- Overlay com descrição - HOVER SUAVE -->
        <div class="gallery-overlay">
            <h3>${img.titulo}</h3>
            <p>${img.descricao}</p>
        </div>
    </div>
  `).join('');

    // Renderiza indicadores
    indicatorsContainer.innerHTML = galleryImages.map((_, i) => `
    <button onclick="goToSlide(${i})" 
            class="gallery-indicator w-2 h-2 rounded-full bg-champagne transition-all duration-300 hover:bg-gold ${i === 0 ? 'w-8 bg-gold' : ''}">
    </button>
  `).join('');

    // Reseta posição
    currentGallerySlide = 0;
    track.style.transform = 'translateX(0)';
    updateGalleryIndicators();
}

/* ============================================
   FUNÇÕES DE NAVEGAÇÃO DA GALERIA
   ============================================ */
window.scrollGallery = (direction) => {
    const track = document.getElementById('gallery-track');
    const slide = track?.querySelector('.gallery-slide');
    if (!track || !slide) return;

    const slideWidth = slide.offsetWidth + 16;
    const containerWidth = track.parentElement.offsetWidth;

    currentGallerySlide = Math.max(0, Math.min(
        currentGallerySlide + direction,
        galleryImages.length - Math.ceil(containerWidth / slideWidth)
    ));

    track.style.transform = `translateX(-${currentGallerySlide * slideWidth}px)`;
    updateGalleryIndicators();
};

window.goToSlide = (index) => {
    const track = document.getElementById('gallery-track');
    const slide = track?.querySelector('.gallery-slide');
    if (!track || !slide) return;

    currentGallerySlide = index;
    const slideWidth = slide.offsetWidth + 16;
    track.style.transform = `translateX(-${currentGallerySlide * slideWidth}px)`;
    updateGalleryIndicators();
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
   FUNÇÕES DO MODAL DE COLEÇÃO
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
                <h2 id="lightbox-title" class="font-serif text-3xl md:text-4xl text-white mt-2 mb-3">${galleryImages[currentLightboxIndex].titulo}</h2>
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
        // Reseta a animação antes de trocar a imagem
        img.classList.add('animate-lightbox-reset');
        void img.offsetWidth; // força reflow do navegador
        img.classList.remove('animate-lightbox-reset');

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
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    // Observer inicial para elementos estáticos do HTML
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 150);
});

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