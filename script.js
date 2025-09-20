// Animación de burbujas
function createBubble() {
    const bubblesAnimation = document.getElementById('bubblesAnimation');
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Posición aleatoria
    const startPosition = Math.random() * 100;
    bubble.style.left = `${startPosition}vw`;
    
    // Tamaño aleatorio
    const size = Math.random() * 40 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Duración aleatoria de animación
    const duration = Math.random() * 8 + 4;
    bubble.style.animationDuration = `${duration}s`;
    
    // Retraso aleatorio
    const delay = Math.random() * 5;
    bubble.style.animationDelay = `${delay}s`;
    
    bubblesAnimation.appendChild(bubble);
    
    // Eliminar la burbuja después de que termine la animación
    setTimeout(() => {
        bubble.remove();
    }, (duration + delay) * 1000);
}

// Crear burbujas continuamente
function generateBubbles() {
    setInterval(createBubble, 300);
}

// Menu móvil
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll suave para enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Animación de elementos al hacer scroll
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in, .about-image, .about-content, .service-card, .faq-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('in-view');
        }
    });
}

// FAQs acordeón
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        answer.classList.toggle('open');
        
        if (answer.classList.contains('open')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Filtros de contenido en "Tu Guía de Bienestar"
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Actualizar botones activos
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filtrar contenido
        document.querySelectorAll('.content-item').forEach(item => {
            const categories = item.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Click en cards de contenido (placeholder para futura funcionalidad de modal)
document.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('click', () => {
        // Aquí se podría abrir un modal con el contenido completo
        // Por ahora, solo un efecto visual
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Placeholder - aquí iría la lógica para mostrar el video/contenido completo
        console.log('Contenido clickeado:', card.querySelector('h3').textContent);
    });
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el formulario
        alert('¡Gracias por tu mensaje! Te contactaré a la brevedad.');
        contactForm.reset();
    });
}

// Función para filtrar contenido en la guía de bienestar
function filterContent() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const contentItems = document.querySelectorAll('.content-card');
    
    if (filterBtns.length === 0 || contentItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        // Event listener para click normal
        btn.addEventListener('click', handleFilterClick);
        
        // Event listener para touch (móviles)
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleFilterClick.call(btn);
        });
        
        function handleFilterClick() {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            contentItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        }
    });
}

// Función para manejar clicks en elementos de la galería de consejos
function handleMediaClick() {
    const mediaItems = document.querySelectorAll('.content-card');
    const modal = document.getElementById('mediaModal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCategory = document.getElementById('modalCategory');
    const modalConsejos = document.getElementById('modalConsejos');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal) return;
    
    // Función para mostrar contenido en el modal
    function showModalContent(item) {
        const mediaElement = item.querySelector('.media-item');
        const title = item.querySelector('h3')?.textContent || 'Sin título';
        const description = item.getAttribute('data-description') || item.querySelector('p')?.textContent || 'Sin descripción';
        const category = item.querySelector('.category-tag')?.textContent || '';
        const consejos = JSON.parse(item.getAttribute('data-consejos') || '[]');
        const imageSrc = mediaElement?.getAttribute('src');
        
        // Actualizar contenido del modal
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalCategory.textContent = category;
        modalImage.src = imageSrc;
        modalImage.alt = title;
        
        // Limpiar y llenar la lista de consejos
        modalConsejos.innerHTML = '';
        consejos.forEach(consejo => {
            const li = document.createElement('li');
            li.textContent = consejo;
            modalConsejos.appendChild(li);
        });
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Event listeners para abrir modal
    mediaItems.forEach((item) => {
        item.addEventListener('click', () => {
            showModalContent(item);
        });
    });
    
    // Cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    modalClose?.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer click fuera del contenido
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Inicializar
window.addEventListener('load', () => {
    generateBubbles();
    checkScroll();
    filterContent();
    handleMediaClick();
});

window.addEventListener('scroll', checkScroll);