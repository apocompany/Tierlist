import { createElementFromTemplate } from './elementUtils.js';
import { saveCurrentState } from '../services/storage.js';

export function handleDragStart(e) {
    e.target.classList.add('dragging');
    document.querySelectorAll('.dragging').forEach(el => {
        if (el !== e.target) el.classList.remove('dragging');
    });
    e.dataTransfer.setData('text/plain', '');
}

export function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

export function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

export function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

export function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement) {
        // Capturar todos los datos del elemento, incluyendo el estado de visualización
        const textElement = draggingElement.querySelector('.element-text');
        const imgElement = draggingElement.querySelector('.element-image');
        
        const elementData = {
            text: textElement.textContent,
            image: imgElement.style.display === 'none' ? 'none' : imgElement.src,
            description: draggingElement.dataset.description || '',
            color: draggingElement.style.backgroundColor || 'white',
            showOnlyImage: draggingElement.dataset.showOnlyImage === 'true'
        };

        // Crear el nuevo elemento con todas las propiedades
        const newElement = createElementFromTemplate(
            elementData.text,
            elementData.image,
            elementData.description,
            elementData.color,
            elementData.showOnlyImage
        );

        // Asegurarse de que el estado visual sea correcto
        if (elementData.showOnlyImage) {
            const newTextElement = newElement.querySelector('.element-text');
            const newImgElement = newElement.querySelector('.element-image');
            if (newTextElement) newTextElement.style.display = 'none';
            if (newImgElement) newImgElement.style.display = 'block';
        }

        // Añadir el nuevo elemento al destino
        e.currentTarget.appendChild(newElement);

        // Remover el elemento original
        draggingElement.remove();

        // Guardar el estado
        saveCurrentState();
    }
} 