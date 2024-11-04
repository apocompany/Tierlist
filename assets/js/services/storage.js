import { createElementFromTemplate } from '../utils/elementUtils.js';
import { createTierFromTemplate } from '../utils/tierUtils.js';

export function saveCurrentState() {
    const data = {
        title: document.getElementById('tierlist-title').value,
        tiers: [],
        bench: []
    };

    // Guardar tiers
    document.querySelectorAll('.tier').forEach(tier => {
        const tierData = {
            name: tier.querySelector('.tier-name').value,
            color: tier.style.backgroundColor || '#f8f9fa',
            items: []
        };

        tier.querySelectorAll('.element').forEach(element => {
            const img = element.querySelector('.element-image');
            tierData.items.push({
                text: element.querySelector('.element-text').textContent,
                image: img.style.display === 'none' ? 'none' : img.src,
                description: element.dataset.description || '',
                color: element.style.backgroundColor || 'white',
                showOnlyImage: element.dataset.showOnlyImage === 'true'
            });
        });

        data.tiers.push(tierData);
    });

    // Guardar banca
    document.querySelectorAll('#bench .element').forEach(element => {
        const img = element.querySelector('.element-image');
        data.bench.push({
            text: element.querySelector('.element-text').textContent,
            image: img.style.display === 'none' ? 'none' : img.src,
            description: element.dataset.description || '',
            color: element.style.backgroundColor || 'white'
        });
    });

    localStorage.setItem('tierlistData', JSON.stringify(data));
}

export function loadState(data) {
    // Limpiar estado actual
    document.getElementById('tierlist').innerHTML = '';
    document.getElementById('bench').innerHTML = '';
    document.getElementById('tierlist-title').value = data.title;

    // Cargar tiers
    data.tiers.forEach(tierData => {
        const tier = createTierFromTemplate(tierData.name, tierData.color);
        const tierItems = tier.querySelector('.tier-items');
        
        tierData.items.forEach(item => {
            const element = createElementFromTemplate(
                item.text, 
                item.image, 
                item.description || '',
                item.color || 'white',
                item.showOnlyImage || false
            );
            tierItems.appendChild(element);
        });
        
        document.getElementById('tierlist').appendChild(tier);
    });

    // Cargar banca
    data.bench.forEach(item => {
        const element = createElementFromTemplate(
            item.text, 
            item.image, 
            item.description || '',
            item.color || 'white'
        );
        document.getElementById('bench').appendChild(element);
    });
} 