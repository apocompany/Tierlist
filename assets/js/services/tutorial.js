export function setupTutorial() {
    const intro = introJs();
    intro.setOptions({
        steps: [
            {
                element: '#tierlist-title',
                intro: 'Aquí puedes editar el título de tu TierList'
            },
            {
                element: '#add-tier',
                intro: 'Haz clic aquí para añadir un nuevo tier'
            },
            {
                element: '#add-element',
                intro: 'Añade nuevos elementos a la banca desde aquí'
            },
            {
                element: '.bench',
                intro: 'Esta es la banca donde puedes dejar elementos sin clasificar'
            },
            {
                element: '.tier',
                intro: 'Arrastra y suelta elementos entre los diferentes tiers'
            },
            {
                element: '.element',
                intro: 'Cada elemento puede ser editado, eliminado o puedes añadirle una imagen'
            },
            {
                element: '.view-detail',
                intro: 'Haz clic aquí para ver más detalles y añadir una descripción'
            },
            {
                element: '.change-color',
                intro: 'Cambia el color del elemento'
            },
            {
                element: '.change-tier-color',
                intro: 'Cambia el color del tier completo'
            },
            {
                element: '#save-json',
                intro: 'Guarda tu progreso en cualquier momento'
            },
            {
                element: '#export-pdf',
                intro: 'Exporta tu TierList como PDF cuando hayas terminado'
            },
            {
                element: '#reset-tierlist',
                intro: 'Vuelve a la configuración inicial'
            },
            {
                element: '#clear-tierlist',
                intro: 'Elimina todos los elementos'
            },
            {
                element: '#toggle-edit-mode',
                intro: 'Alterna entre el modo básico (solo arrastrar elementos) y el modo edición (todas las funciones)'
            }
        ],
        nextLabel: 'Siguiente >',
        prevLabel: '< Anterior',
        skipLabel: 'Saltar',
        doneLabel: 'Finalizar'
    });
    return intro;
} 