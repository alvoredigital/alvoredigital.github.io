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