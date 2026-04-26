import './style.css';

/* ============================================
   VARIÁVEIS GLOBAIS
   ============================================ */
let currentLightboxIndex = 0;
let collections = [];
let galleryImages = [];

/* ============================================
   CARREGAMENTO DE DADOS
   ============================================ */
async function loadData() {
    try {
        // Caminho relativo funciona tanto em dev quanto em production
        const response = await fetch('./data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        collections = data.collections || [];
        galleryImages = data.galleryImages || [];

        console.log('Dados carregados com sucesso:', {
            collections: collections.length,
            gallery: galleryImages.length
        });

        // Renderiza após carregar os dados
        renderCollections();
        renderGallery();

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback para não quebrar a página
        collections = [];
        galleryImages = [];
    }
}

/* ============================================
   RENDERIZAÇÃO DE COLEÇÕES
   ============================================ */
function renderCollections() {
    const grid = document.getElementById('collections-grid');
    if (!grid) return;

    if (collections.length === 0) {
        grid.innerHTML = '<p class="text-center text-gray-500">Carregando coleções...</p>';
        return;
    }

    grid.innerHTML = collections.map((c) => `
        <div onclick="openModal('${c.id}')" class="collection-card reveal group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${c.image}" alt="${c.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
            </div>
            <div class="p-5">
                <h3 class="font-serif text-xl font-medium text-gray-800">${c.name}</h3>
                <p class="text-sm text-gold font-medium mt-1">Explorar <i class="fa-solid fa-arrow-right ml-1"></i></p>
            </div>
        </div>
    `).join('');
}

/* ============================================
   LÓGICA DO MODAL
   ============================================ */
function openModal(collectionId) {
    const modal = document.getElementById('collection-modal');
    const collection = collections.find(c => c.id === collectionId);

    if (!collection || !modal) {
        console.error('Coleção não encontrada:', collectionId);
        return;
    }

    const items = collection.items;

    modal.innerHTML = `
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeModal()"></div>

            <div class="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-in">
                
                <button onclick="closeModal()" class="absolute top-4 right-4 z-[110] w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>

                <div class="relative w-full md:w-3/5 bg-[#FBFBFD] h-[350px] md:h-auto overflow-hidden group">
                    <div class="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth" id="modal-slider">
                        ${items.map((item) => `
                            <div class="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-6">
                                <img src="${item.src}" alt="${item.titulo}" class="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-black/5" loading="lazy">
                            </div>
                        `).join('')}
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
                        <h2 id="dynamic-title" class="font-serif text-3xl mt-2 mb-2 text-gray-900">${items[0].titulo}</h2>
                        
                        <div class="mb-6">
                            <span id="dynamic-price" class="text-2xl font-semibold text-charcoal">${items[0].preco}</span>
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

        if (item) {
            document.getElementById('dynamic-title').textContent = item.titulo;
            document.getElementById('dynamic-price').textContent = item.preco;
            document.getElementById('dynamic-material').textContent = item.material;
            document.getElementById('dynamic-status').textContent = item.disponibilidade;

            const notaPedido = `*NOTA DE PEDIDO - RW JOIAS*%0A%0A` +
                `*Nome:* ${item.titulo}%0A` +
                `*Preço:* ${item.preco}%0A` +
                `*Descrição:* ${item.material}%0A` +
                `*Status:* ${item.disponibilidade}%0A%0A` +
                `--------------------------------%0A` +
                `Olá! Gostaria de finalizar a compra deste item.`;

            const waLink = document.getElementById('whatsapp-link');
            waLink.href = `https://wa.me/5586994888666?text=${notaPedido}`;
        }
    };

    slider.addEventListener('scroll', updateUI);
    updateUI();
}

window.scrollSlider = (direction) => {
    const slider = document.getElementById('modal-slider');
    if (slider) {
        slider.scrollBy({ left: direction * slider.offsetWidth, behavior: 'smooth' });
    }
};

window.closeModal = () => {
    const modal = document.getElementById('collection-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

/* ============================================
   GALERIA E LIGHTBOX
   ============================================ */
function renderGallery() {
    const container = document.getElementById('gallery-horizontal');
    if (!container) return;

    if (galleryImages.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">Carregando galeria...</p>';
        return;
    }

    container.innerHTML = galleryImages.map((img, i) => `
        <div onclick="openLightbox(${i})" class="gallery-item-horizontal reveal cursor-pointer overflow-hidden rounded-xl">
            <img src="${img}" alt="Galeria ${i + 1}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy">
        </div>
    `).join('');
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const image = document.getElementById('lightbox-image');
    if (!modal || !image) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');
    if (image) {
        image.src = galleryImages[currentLightboxIndex];
        if (counter) counter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
    }
}

window.navigateLightbox = (dir) => {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
};

window.closeLightbox = () => {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
};

/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Carrega dados do JSON primeiro
    loadData();

    // Setup do observer para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    // Observer será aplicado após renderização
    const setupObserver = () => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    // Re-setup observer quando conteúdo for renderizado
    setTimeout(setupObserver, 100);
});

// Exporta funções para o window (necessário para onclick inline)
window.openModal = openModal;
window.closeModal = closeModal;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = window.navigateLightbox;
window.scrollSlider = window.scrollSlider;