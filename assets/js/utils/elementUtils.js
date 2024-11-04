import { handleDragStart, handleDragEnd } from './dragAndDrop.js';
import { saveCurrentState } from '../services/storage.js';

export function createElementFromTemplate(text, image = 'none', description = '', color = 'white', showOnlyImage = false) {
    const template = document.getElementById('element-template');
    const element = template.content.cloneNode(true).querySelector('.element');
    
    const textElement = element.querySelector('.element-text');
    const imgElement = element.querySelector('.element-image');
    
    textElement.textContent = text;
    element.style.backgroundColor = color;
    
    if (image && image !== 'none') {
        imgElement.src = image;
        imgElement.style.display = 'block';
        
        // Aplicar el modo de visualización según showOnlyImage
        if (showOnlyImage) {
            textElement.style.display = 'none';
            element.dataset.showOnlyImage = 'true';
        }
    }
    
    element.dataset.description = description;
    element.draggable = true;
    setupElementListeners(element);
    
    return element;
}

export function setupElementListeners(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);

    const editButton = element.querySelector('.edit-element');
    const uploadButton = element.querySelector('.upload-image');
    const deleteButton = element.querySelector('.delete-element');
    const imageInput = element.querySelector('.image-input');
    const viewDetailButton = element.querySelector('.view-detail');
    const colorButton = element.querySelector('.change-color');
    const colorInput = element.querySelector('.color-input');

    editButton.addEventListener('click', () => {
        const textSpan = element.querySelector('.element-text');
        const newText = prompt('Editar texto:', textSpan.textContent);
        if (newText) {
            textSpan.textContent = newText;
            saveCurrentState();
        }
    });

    uploadButton.addEventListener('click', () => imageInput.click());

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = element.querySelector('.element-image');
                img.src = event.target.result;
                img.style.display = 'block';
                saveCurrentState();
            };
            reader.readAsDataURL(file);
        }
    });

    deleteButton.addEventListener('click', () => {
        element.remove();
        saveCurrentState();
    });

    viewDetailButton.addEventListener('click', () => {
        const modal = document.getElementById('element-detail-modal');
        const titleEl = document.getElementById('detail-title');
        const imageEl = document.getElementById('detail-image');
        const descriptionEl = document.getElementById('detail-description');
        const showOnlyImageCheckbox = document.getElementById('show-only-image');

        const textElement = element.querySelector('.element-text');
        const elementImage = element.querySelector('.element-image');
        
        titleEl.textContent = textElement.textContent;
        
        if (elementImage.style.display !== 'none') {
            imageEl.src = elementImage.src;
            imageEl.style.display = 'block';
            
            showOnlyImageCheckbox.style.display = 'block';
            showOnlyImageCheckbox.checked = element.dataset.showOnlyImage === 'true';
            
            showOnlyImageCheckbox.onchange = () => {
                if (showOnlyImageCheckbox.checked) {
                    textElement.style.display = 'none';
                    element.dataset.showOnlyImage = 'true';
                } else {
                    textElement.style.display = 'block';
                    element.dataset.showOnlyImage = 'false';
                }
                saveCurrentState();
            };
        } else {
            imageEl.style.display = 'none';
            showOnlyImageCheckbox.style.display = 'none';
        }
        
        descriptionEl.value = element.dataset.description || '';
        modal.classList.add('active');

        const saveDescription = () => {
            element.dataset.description = descriptionEl.value;
            saveCurrentState();
        };

        descriptionEl.onchange = saveDescription;
        modal.querySelector('.close-detail').onclick = () => {
            saveDescription();
            modal.classList.remove('active');
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                saveDescription();
                modal.classList.remove('active');
            }
        };
    });

    colorButton.addEventListener('click', () => colorInput.click());

    colorInput.addEventListener('change', (e) => {
        element.style.backgroundColor = e.target.value;
        saveCurrentState();
    });
} 