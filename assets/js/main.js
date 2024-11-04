import { initialData } from './config/initialData.js';
import { loadState } from './services/storage.js';
import { setupEventListeners } from './events/eventHandlers.js';
import { setupScrollingText } from './utils/scrollingText.js';
import { setupEditMode } from './services/editMode.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentData = JSON.parse(localStorage.getItem('tierlistData')) || initialData;
    loadState(currentData);
    setupEventListeners();
    setupScrollingText();
    setupEditMode();
}); 