import './style.css';

/* ============================================
   VARIÁVEL GLOBAL DO LIGHTBOX
   ============================================ */
let currentLightboxIndex = 0;

/* ============================================
   DADOS DAS COLEÇÕES
   ============================================ */
const collections = [
    {
        id: 'pulseira',
        name: 'Pulseiras',
        image: 'https://images.unsplash.com/photo-1728647771933-9946a13e29f6?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1633810543462-77c4a3b13f07?q=80&w=800',
            'https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?q=80&w=800',
            'https://images.unsplash.com/photo-1761222101900-9c9e34fac2ce?q=80&w=800',
            'https://images.unsplash.com/photo-1721103428054-6bcf4f655594?q=80&w=800',
        ]
    },
    {
        id: 'colar',
        name: 'Colares',
        image: 'https://images.unsplash.com/photo-1602782574269-8b0ee1844ccf?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1633810542706-90e5ff7557be?q=80&w=800',
            'https://images.unsplash.com/photo-1626422222400-3868e5a7ce33?q=80&w=800',
            'https://images.unsplash.com/photo-1602782574269-8b0ee1844ccf?q=80&w=800',
            'https://images.unsplash.com/photo-1623699654653-5f03c0168a6a?q=80&w=800',
        ]
    },
    {
        id: 'anel',
        name: 'Alianças',
        image: 'https://images.unsplash.com/photo-1677045419114-12f2123e4191?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1627293509201-cd0c780043e6?q=80&w=800',
            'https://images.unsplash.com/photo-1677045419114-12f2123e4191?q=80&w=800',
            'https://images.unsplash.com/photo-1481980235850-66e47651e431?q=80&w=800',
            'https://images.unsplash.com/photo-1591209608777-fb022eac7112?q=80&w=800',
        ]
    },
    {
        id: 'bracelete',
        name: 'Braceletes',
        image: 'https://images.unsplash.com/photo-1628785517892-dbcd2f2719ed?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?q=80&w=800',
            'https://images.unsplash.com/photo-1728646998199-127b357a464d?q=80&w=800',
            'https://images.unsplash.com/photo-1741071520904-37ef3c0fea09?q=80&w=800',
            'https://images.unsplash.com/photo-1740567177735-b3a751eb3891?q=80&w=800',
        ]
    },
    {
        id: 'pingente',
        name: 'Pingentes',
        image: 'https://images.unsplash.com/photo-1763256614647-14abbc578252?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1769615989591-123379ee8f5a?q=80&w=800',
            'https://images.unsplash.com/photo-1763256614647-14abbc578252?q=80&w=800',
            'https://images.unsplash.com/photo-1626085664138-9974ba8fb971?q=80&w=800',
            'https://images.unsplash.com/photo-1623040594055-9afc9b891b04?q=80&w=800',
        ]
    },
    {
        id: 'brinco',
        name: 'Brincos',
        image: 'https://images.unsplash.com/photo-1612720819442-e07b5a486e48?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?q=80&w=800',
            'https://images.unsplash.com/photo-1612720819442-e07b5a486e48?q=80&w=800',
            'https://images.unsplash.com/photo-1708220040824-b273dd0a17cc?q=80&w=800',
            'https://images.unsplash.com/photo-1693212793204-bcea856c75fe?q=80&w=800',
        ]
    }
];

/* ============================================
   DADOS DA GALERIA
   ============================================ */
const galleryImages = [
    'https://images.unsplash.com/photo-1633810543462-77c4a3b13f07?q=80&w=800',
    'https://images.unsplash.com/photo-1633810542706-90e5ff7557be?q=80&w=800',
    'https://images.unsplash.com/photo-1677045419114-12f2123e4191?q=80&w=800',
    'https://images.unsplash.com/photo-1740567177735-b3a751eb3891?q=80&w=800',
    'https://images.unsplash.com/photo-1623040594055-9afc9b891b04?q=80&w=800',
    'https://images.unsplash.com/photo-1625516152414-8f33eef3d660?q=80&w=800',
    'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?q=80&w=800',
    'https://images.unsplash.com/photo-1599458349289-18f0ee82e6ed?q=80&w=800',
];

/* ============================================
   RENDERIZAR COLEÇÕES
   ============================================ */
function renderCollections() {
    const grid = document.getElementById('collections-grid');
    if (!grid) {
        console.warn('⚠️ Elemento #collections-grid não encontrado');
        return;
    }
    
    grid.innerHTML = collections.map((collection, index) => `
        <div class="collection-card reveal group" style="transition-delay: ${index * 100}ms" data-collection-id="${collection.id}">
            <div class="aspect-square overflow-hidden bg-nude">
                <img src="${collection.image}" alt="${collection.name}" class="w-full h-full object-cover">
            </div>
            <div class="overlay"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="font-serif text-xl font-medium mb-1">${collection.name}</h3>
                <p class="text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-gold-light">
                    Ver coleção →
                </p>
            </div>
        </div>
    `).join('');
    
    // Adiciona eventos de clique para as coleções
    setupCollectionListeners();
}

function setupCollectionListeners() {
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('click', () => {
            const collectionId = card.dataset.collectionId;
            if (collectionId) openModal(collectionId);
        });
    });
}

/* ============================================
   RENDERIZAR GALERIA
   ============================================ */
function renderGallery() {
    const container = document.getElementById('gallery-horizontal');
    if (!container) {
        console.warn('⚠️ Elemento #gallery-horizontal não encontrado');
        return;
    }
    
    container.innerHTML = galleryImages.map((image, index) => `
        <div class="gallery-item-horizontal reveal cursor-pointer" 
             style="transition-delay: ${index * 50}ms"
             data-gallery-index="${index}">
            <img src="${image}" alt="Galeria RW Joias" loading="lazy">
            <div class="absolute inset-0 bg-charcoal/0 hover:bg-charcoal/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <div class="w-12 h-12 rounded-full bg-white/0 hover:bg-white/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 scale-50 hover:scale-100">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </div>
            </div>
        </div>
    `).join('');
    
    setupGalleryListeners();
}

function setupGalleryListeners() {
    document.querySelectorAll('.gallery-item-horizontal').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('svg')) return;
            const index = parseInt(item.dataset.galleryIndex);
            if (!isNaN(index)) openLightbox(index);
        });
    });
}

/* ============================================
   LIGHTBOX FUNCTIONS
   ============================================ */
function openLightbox(index) {
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const image = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');
    
    if (!modal || !image) {
        console.warn('⚠️ Elementos do lightbox não encontrados');
        return;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    updateLightboxImage();
    
    image.style.transition = 'none';
    image.style.transform = 'scale(0.9)';
    image.style.opacity = '0';
    
    setTimeout(() => {
        image.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
        image.style.transform = 'scale(1)';
        image.style.opacity = '1';
    }, 10);
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const image = document.getElementById('lightbox-image');
    
    if (!modal || !image) return;
    
    image.style.transform = 'scale(0.95)';
    image.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    } else if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    }
    
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');
    
    if (!image) return;
    
    image.style.opacity = '0.5';
    
    setTimeout(() => {
        image.src = galleryImages[currentLightboxIndex];
        counter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
        image.style.opacity = '1';
    }, 150);
}

/* ============================================
   MODAL DE COLEÇÕES
   ============================================ */
function openModal(collectionId) {
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return;

    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modal = document.getElementById('collection-modal');

    if (!modalTitle || !modalContent || !modal) return;

    modalTitle.textContent = collection.name;
    modalContent.innerHTML = collection.images.map(img => `
        <div class="aspect-square rounded-xl overflow-hidden bg-nude">
            <img src="${img}" alt="${collection.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
        </div>
    `).join('');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('collection-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

/* ============================================
   EXPOSIÇÃO GLOBAL (PARA HTML onclick)
   ============================================ */
window.openModal = openModal;
window.closeModal = closeModal;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;

/* ============================================
   EVENT LISTENERS GLOBAIS
   ============================================ */
// Fechar modais com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightboxModal = document.getElementById('lightbox-modal');
        const collectionModal = document.getElementById('collection-modal');
        
        if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
            closeLightbox();
        } else if (collectionModal && !collectionModal.classList.contains('hidden')) {
            closeModal();
        }
    }
});

// Lightbox: clique no backdrop fecha
document.addEventListener('click', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && !modal.classList.contains('hidden') && e.target === modal.querySelector('[onclick]')) {
        closeLightbox();
    }
});

// Lightbox: navegação por botões
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    prevBtn?.addEventListener('click', () => navigateLightbox(-1));
    nextBtn?.addEventListener('click', () => navigateLightbox(1));
});

// Swipe para mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    touchEndX = e.changedTouches[0].screenX;
    
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? navigateLightbox(1) : navigateLightbox(-1);
    }
}, { passive: true });

/* ============================================
   ANIMAÇÕES E UTILITÁRIOS
   ============================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

/* ============================================
   NAVBAR E MENU MOBILE
   ============================================ */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.pageYOffset > 50) {
        navbar.classList.add('shadow-lg', 'shadow-charcoal/5');
    } else {
        navbar.classList.remove('shadow-lg', 'shadow-charcoal/5');
    }
}, { passive: true });

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ RW Joias - Iniciando...');
    
    renderCollections();
    renderGallery();
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    document.querySelectorAll('.grid').forEach(grid => {
        grid.querySelectorAll('.reveal').forEach((item, index) => {
            item.style.transitionDelay = `${index * 100}ms`;
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    console.log('✅ RW Joias - Pronto!');
});