import { saveCurrentState, loadState } from '../services/storage.js';
import { exportToPDF, exportToJSON } from '../services/export.js';
import { setupTutorial } from '../services/tutorial.js';
import { initialData } from '../config/initialData.js';
import { createElementFromTemplate } from '../utils/elementUtils.js';
import { createTierFromTemplate } from '../utils/tierUtils.js';

export function setupEventListeners() {
    // Botones principales
    document.getElementById('add-tier').addEventListener('click', () => {
        const tier = createTierFromTemplate('Nuevo');
        document.getElementById('tierlist').appendChild(tier);
        saveCurrentState();
    });

    document.getElementById('add-element').addEventListener('click', () => {
        const text = prompt('Introduce el texto del nuevo elemento:');
        if (text) {
            const element = createElementFromTemplate(text);
            document.getElementById('bench').appendChild(element);
            saveCurrentState();
        }
    });

    document.getElementById('save-json').addEventListener('click', () => {
        exportToJSON(JSON.parse(localStorage.getItem('tierlistData')));
    });

    document.getElementById('export-pdf').addEventListener('click', exportToPDF);

    document.getElementById('start-tutorial').addEventListener('click', () => {
        const intro = setupTutorial();
        intro.start();
    });

    // Configurar botones de reseteo y vaciado
    document.getElementById('reset-tierlist').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres resetear la tierlist a su estado inicial?')) {
            loadState(initialData);
            saveCurrentState();
        }
    });

    document.getElementById('clear-tierlist').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres vaciar completamente la tierlist?')) {
            const emptyData = {
                title: document.getElementById('tierlist-title').value,
                tiers: [],
                bench: []
            };
            loadState(emptyData);
            saveCurrentState();
        }
    });

    // Configurar carga de JSON
    document.getElementById('load-json').addEventListener('click', () => {
        document.getElementById('json-file').click();
    });

    document.getElementById('json-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    loadState(data);
                    saveCurrentState();
                } catch (error) {
                    console.error('Error al cargar el archivo JSON:', error);
                    alert('Error al cargar el archivo. Asegúrate de que es un JSON válido.');
                }
            };
            reader.readAsText(file);
        }
    });

    // Guardar el título cuando cambie
    document.getElementById('tierlist-title').addEventListener('change', saveCurrentState);
} 