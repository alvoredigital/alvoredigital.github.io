document.addEventListener('DOMContentLoaded', function() {
   // Inicialização do AOS
   AOS.init({
       duration: 1000,
       once: true,
       offset: 100
   });

   // Toggle do menu mobile
   const menuToggle = document.querySelector('.menu-toggle');
   const nav = document.querySelector('nav');

   menuToggle.addEventListener('click', () => {
       nav.classList.toggle('active');
   });

   // Toggle do modo claro/escuro
   const modeToggle = document.querySelector('.mode-toggle');
   const html = document.querySelector('html');

   modeToggle.addEventListener('click', () => {
       html.classList.toggle('dark');
       localStorage.setItem('darkMode', html.classList.contains('dark'));
   });

   // Verifica se o modo escuro está ativado no localStorage
   if (localStorage.getItem('darkMode') === 'true') {
       html.classList.add('dark');
   }

   // Smooth scroll para links internos
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function (e) {
           e.preventDefault();

           document.querySelector(this.getAttribute('href')).scrollIntoView({
               behavior: 'smooth'
           });
       });
   });

   // Formulário de contato
   const contactForm = document.getElementById('contact-form');
   if (contactForm) {
       contactForm.addEventListener('submit', function(e) {
           e.preventDefault();
           // Aqui você pode adicionar a lógica para enviar o formulário
           alert('Mensagem enviada com sucesso!');
           contactForm.reset();
       });
   }

   // Formulário de newsletter
   const newsletterForm = document.getElementById('newsletter-form');
   if (newsletterForm) {
       newsletterForm.addEventListener('submit', function(e) {
           e.preventDefault();
           // Aqui você pode adicionar a lógica para assinar a newsletter
           alert('Assinatura realizada com sucesso!');
           newsletterForm.reset();
       });
   }
});

// Gerenciamento de cookies
function setCookie(name, value, days) {
   let expires = "";
   if (days) {
       const date = new Date();
       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
       expires = "; expires=" + date.toUTCString();
   }
   document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
   const nameEQ = name + "=";
   const ca = document.cookie.split(';');
   for (let i = 0; i < ca.length; i++) {
       let c = ca[i];
       while (c.charAt(0) == ' ') c = c.substring(1, c.length);
       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
   }
   return null;
}

// Banner de cookies
function showCookieBanner() {
   const banner = document.createElement('div');
   banner.className = 'cookie-banner';
   banner.innerHTML = `
       <p>Usamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com nossa <a href="politica-de-privacidade.html">Política de Privacidade</a>.</p>
       <button id="accept-cookies">Aceitar</button>
   `;
   document.body.appendChild(banner);

   setTimeout(() => {
       banner.classList.add('show');
   }, 1000);

   document.getElementById('accept-cookies').addEventListener('click', () => {
       setCookie('cookies-accepted', 'true', 365);
       banner.remove();
   });
}

// Verificar se o usuário já aceitou os cookies
if (!getCookie('cookies-accepted')) {
   showCookieBanner();
}