export function handleDragStart(e) {
    e.target.classList.add('dragging');
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
        e.currentTarget.appendChild(draggingElement);
    }
} 