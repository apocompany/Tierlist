export function setupEditMode() {
    const container = document.querySelector('.container');
    const toggleButton = document.getElementById('toggle-edit-mode');
    
    // Cargar el estado anterior del modo de edición
    const isEditMode = localStorage.getItem('editMode') === 'true';
    setEditMode(isEditMode);

    toggleButton.addEventListener('click', () => {
        const newMode = !container.classList.contains('basic-mode');
        setEditMode(newMode);
    });

    function setEditMode(isBasicMode) {
        if (isBasicMode) {
            container.classList.add('basic-mode');
            toggleButton.classList.remove('active');
            toggleButton.innerHTML = '<i class="fas fa-edit"></i> Modo Edición';
        } else {
            container.classList.remove('basic-mode');
            toggleButton.classList.add('active');
            toggleButton.innerHTML = '<i class="fas fa-edit"></i> Modo Básico';
        }
        localStorage.setItem('editMode', !isBasicMode);
        
        // Asegurar que los elementos siguen siendo arrastrables
        const elements = document.querySelectorAll('.element');
        elements.forEach(element => {
            element.draggable = true;
        });
    }
}