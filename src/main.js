/* ============================================
   IMPORTAR ESTILOS (Padrão Vite)
   ============================================ */
import './style.css';

/* ============================================
   DADOS DAS COLEÇÕES
   ============================================ */
const collections = [
    {
        id: 'pulseira',
        name: 'Pulseiras',
        image: 'https://images.unsplash.com/photo-1725368844213-c167fe556f98?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1633810543462-77c4a3b13f07?q=80&w=800',
            'https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?q=80&w=800',
            'https://images.unsplash.com/photo-1761222101900-9c9e34fac2ce?q=80&w=800',
            'https://images.unsplash.com/photo-1721103428054-6bcf4f655594?q=80&w=800',
            'https://images.unsplash.com/photo-1721206624468-2b3496c3bcfc?q=80&w=800',
            'https://images.unsplash.com/photo-1725368844213-c167fe556f98?q=80&w=800'
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
            'https://images.unsplash.com/photo-1731406322264-dac59f83828b?q=80&w=800',
            'https://images.unsplash.com/photo-1728647771865-636b715674f4?q=80&w=800'
        ]
    },
    {
        id: 'anel',
        name: 'Anéis',
        image: 'https://images.unsplash.com/photo-1627293509201-cd0c780043e6?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1627293509201-cd0c780043e6?q=80&w=800',
            'https://images.unsplash.com/photo-1677045419114-12f2123e4191?q=80&w=800',
            'https://images.unsplash.com/photo-1481980235850-66e47651e431?q=80&w=800',
            'https://images.unsplash.com/photo-1591209608777-fb022eac7112?q=80&w=800',
            'https://images.unsplash.com/photo-1686538246844-f3ca82434d95?q=80&w=800',
            'https://images.unsplash.com/photo-1614606140245-2c33ece9e2cf?q=80&w=800'
        ]
    },
    {
        id: 'bracelete',
        name: 'Braceletes',
        image: 'https://images.unsplash.com/photo-1508022909583-69228d7b2f8f?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1708221235482-a6e2a807198f?q=80&w=800',
            'https://images.unsplash.com/photo-1728646998199-127b357a464d?q=80&w=800',
            'https://images.unsplash.com/photo-1741071520904-37ef3c0fea09?q=80&w=800',
            'https://images.unsplash.com/photo-1597006354775-2955b15ec026?q=80&w=800',
            'https://images.unsplash.com/photo-1740567177735-b3a751eb3891?q=80&w=800',
            'https://images.unsplash.com/photo-1508022909583-69228d7b2f8f?q=80&w=800'
        ]
    },
    {
        id: 'pingente',
        name: 'Pingentes',
        image: 'https://images.unsplash.com/photo-1763256614647-14abbc578252?q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1769615989591-123379ee8f5a?q=80&w=800',
            'https://images.unsplash.com/photo-1763256614647-14abbc578252?q=80&w=800',
            'https://images.unsplash.com/photo-1771660715521-49e21698862c?q=80&w=800',
            'https://images.unsplash.com/photo-1623040594055-9afc9b891b04?q=80&w=800',
            'https://images.unsplash.com/photo-1769615989587-0c15241194d7?q=80&w=800',
            'https://images.unsplash.com/photo-1606906957131-ecf341381519?q=80&w=800'
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
            'https://images.unsplash.com/photo-1625516152414-8f33eef3d660?q=80&w=800',
            'https://images.unsplash.com/photo-1713004539634-a6694a83f3d9?q=80&w=800'
        ]
    }
];

/* ============================================
   DADOS DA GALERIA (IMAGENS ESTÁVEIS)
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
    'https://images.unsplash.com/photo-1643898191301-827756a7c855?q=80&w=800',
    'https://images.unsplash.com/photo-1641284373694-f80eed6d29c7?q=80&w=800',
    'https://images.unsplash.com/photo-1628785517892-dbcd2f2719ed?q=80&w=800',
    'https://images.unsplash.com/photo-1575863062476-51cd2be1af0f?q=80&w=800',
];


/* ============================================
   RENDERIZAR COLEÇÕES
   ============================================ */
function renderCollections() {
    const grid = document.getElementById('collections-grid');
    if (!grid) return;
    
    grid.innerHTML = collections.map((collection, index) => `
        <div class="group relative overflow-hidden rounded-xl cursor-pointer card-hover reveal" 
             style="transition-delay: ${index * 50}ms"
             onclick="window.openModal('${collection.id}')">
            <div class="aspect-square overflow-hidden">
                <img src="${collection.image}" alt="${collection.name}" 
                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="font-cinzel text-xl font-bold text-white mb-1">${collection.name}</h3>
                <p class="text-gold-400 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Ver coleção →
                </p>
            </div>
            <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold-500/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
            </div>
        </div>
    `).join('');
}

/* ============================================
   RENDERIZAR GALERIA
   ============================================ */
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryImages.map((image, index) => `
        <div class="group relative overflow-hidden rounded-lg reveal" style="transition-delay: ${index * 50}ms">
            <div class="aspect-square overflow-hidden bg-dark-700">
                <img src="${image}" alt="Galeria RW Joias" 
                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/20 transition-colors duration-300"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                </div>
            </div>
        </div>
    `).join('');
}

/* ============================================
   FUNÇÕES DE MODAL (Expostas globalmente)
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
        <div class="aspect-square rounded-lg overflow-hidden bg-dark-700">
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

/* Expor funções globalmente para onclick do HTML */
window.openModal = openModal;
window.closeModal = closeModal;

/* ============================================
   FECHAR MODAL COM TECLA ESC
   ============================================ */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

/* ============================================
   EFEITO DE SCROLL NA NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');
const floatingCta = document.getElementById('floating-cta');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.remove('opacity-0', '-translate-y-full');
        } else {
            navbar.classList.add('opacity-0', '-translate-y-full');
        }
    }

    if (floatingCta) {
        if (currentScroll > 100) {
            floatingCta.classList.remove('opacity-0', 'translate-y-10');
        } else {
            floatingCta.classList.add('opacity-0', 'translate-y-10');
        }
    }
});

/* ============================================
   MENU MOBILE
   ============================================ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fechar menu ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

/* ============================================
   ANIMAÇÃO DE SCROLL REVEAL
   ============================================ */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/* ============================================
   ENVIO DE FORMULÁRIO
   ============================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = e.target.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Mensagem Enviada!</span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
        btn.classList.add('bg-green-600');
        btn.classList.remove('bg-gradient-gold');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-green-600');
            btn.classList.add('bg-gradient-gold');
            e.target.reset();
        }, 3000);
    });
}

/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderCollections();
    renderGallery();
    
    // Observar todos os elementos com classe 'reveal'
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});

/* ============================================
   SCROLL SUAVE PARA LINKS ÂNCORA
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
