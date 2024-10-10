// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
       e.preventDefault();

       

       document.querySelector(this.getAttribute('href')).scrollIntoView({
           behavior: 'smooth'
       });
   });
});

// Formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(e) {
   e.preventDefault();
   
   // Aqui você pode adicionar a lógica para enviar o formulário
   // Por exemplo, usando fetch para enviar os dados para um servidor
   
   alert('Mensagem enviada com sucesso!');
   this.reset();
});

// Animação de fade-in para elementos quando entram na viewport
function fadeInElements() {
   const elements = document.querySelectorAll('.service-item, .portfolio-item, .blog-post');
   
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.style.opacity = 1;
               entry.target.style.transform = 'translateY(0)';
           }
       });
   }, { threshold: 0.1 });

   elements.forEach(element => {
       element.style.opacity = 0;
       element.style.transform = 'translateY(20px)';
       element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
       observer.observe(element);
   });
}

// Chamar a função quando a página carregar
window.addEventListener('load', fadeInElements);

// Header fixo com mudança de estilo ao rolar
window.addEventListener('scroll', () => {
   const header = document.querySelector('header');
   if (window.scrollY > 50) {
       header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
       header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
   } else {
       header.style.backgroundColor = '#FFFFFF';
       header.style.boxShadow = 'none';
   }
});