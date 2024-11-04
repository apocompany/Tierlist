import { handleDragOver, handleDrop, handleDragLeave } from './dragAndDrop.js';
import { saveCurrentState } from '../services/storage.js';

export function createTierFromTemplate(name, color = '#f8f9fa') {
    const template = document.getElementById('tier-template');
    const tier = template.content.cloneNode(true).querySelector('.tier');
    
    tier.querySelector('.tier-name').value = name;
    tier.style.backgroundColor = color;
    setupTierListeners(tier);
    
    return tier;
}

export function setupTierListeners(tier) {
    const items = tier.querySelector('.tier-items');
    const deleteButton = tier.querySelector('.delete-tier');
    const nameInput = tier.querySelector('.tier-name');
    const colorButton = tier.querySelector('.change-tier-color');
    const colorInput = tier.querySelector('.tier-color-input');

    items.addEventListener('dragover', handleDragOver);
    items.addEventListener('drop', handleDrop);
    items.addEventListener('dragleave', handleDragLeave);

    deleteButton.addEventListener('click', () => {
        const elements = tier.querySelectorAll('.element');
        const bench = document.getElementById('bench');
        elements.forEach(el => bench.appendChild(el));
        tier.remove();
        saveCurrentState();
    });

    nameInput.addEventListener('change', saveCurrentState);

    colorButton.addEventListener('click', () => colorInput.click());

    colorInput.addEventListener('change', (e) => {
        tier.style.backgroundColor = e.target.value;
        saveCurrentState();
    });
} 