export function setupScrollingText() {
    // Función para verificar si el texto se desborda
    function checkOverflow(element) {
        return element.scrollWidth > element.clientWidth;
    }

    // Función para manejar la animación de un elemento
    function handleScrollAnimation(element) {
        if (checkOverflow(element)) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    }

    // Manejar título
    const titleInput = document.getElementById('tierlist-title');
    titleInput.addEventListener('input', () => handleScrollAnimation(titleInput));
    handleScrollAnimation(titleInput);

    // Manejar nombres de tier
    function setupTierNameAnimations() {
        const tierInputs = document.querySelectorAll('.tier-input');
        tierInputs.forEach(input => {
            input.addEventListener('input', () => handleScrollAnimation(input));
            handleScrollAnimation(input);
        });
    }

    // Configurar observador para detectar nuevos tiers
    const observer = new MutationObserver(() => {
        setupTierNameAnimations();
    });

    observer.observe(document.getElementById('tierlist'), {
        childList: true,
        subtree: true
    });

    // Configuración inicial
    setupTierNameAnimations();
} 