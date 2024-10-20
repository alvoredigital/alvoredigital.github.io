document.addEventListener('DOMContentLoaded', function() {
   const contactForm = document.getElementById('contactForm');

   contactForm.addEventListener('submit', function(e) {
       e.preventDefault();
       // Aqui você pode adicionar a lógica para enviar o formulário
       alert('Obrigado pelo seu contato! Retornaremos em breve.');
       this.reset();
   });

   // Função para ajustar a posição do formulário em telas menores
   function adjustFormPosition() {
       const contactFormContainer = document.querySelector('.contact-form-container');
       if (window.innerWidth <= 768) {
           contactFormContainer.style.position = 'static';
       } else {
           contactFormContainer.style.position = 'sticky';
       }
   }

   // Chamar a função inicialmente e adicionar um listener para redimensionamento da janela
   adjustFormPosition();
   window.addEventListener('resize', adjustFormPosition);
});

// script para modal de termos e significado
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('explanatoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = modal.querySelector('.close');

    function showModal(term, description) {
        modalTitle.textContent = term;
        modalDescription.textContent = description;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    document.querySelectorAll('.post-content strong[data-term]').forEach(element => {
        element.addEventListener('click', () => {
            const term = element.getAttribute('data-term');
            const description = element.getAttribute('data-description');
            showModal(term, description);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});