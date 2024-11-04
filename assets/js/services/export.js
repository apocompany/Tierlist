export async function exportToPDF() {
    const element = document.querySelector('.container');
    const opt = {
        margin: 10,
        filename: 'tierlist.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    try {
        const actionsElements = element.querySelectorAll('.element-actions, .actions, .delete-tier');
        actionsElements.forEach(el => el.style.display = 'none');

        await html2pdf().set(opt).from(element).save();

        actionsElements.forEach(el => el.style.display = '');
    } catch (error) {
        console.error('Error al exportar a PDF:', error);
        alert('Error al exportar a PDF. Por favor, inténtalo de nuevo.');
    }
}

export function exportToJSON(currentData) {
    const dataStr = JSON.stringify(currentData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tierlist.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
} 