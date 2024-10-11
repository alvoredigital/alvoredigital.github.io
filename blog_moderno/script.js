// Dados dos posts do blog
const blogPosts = [
   {
       id: 1,
       title: "5 Estratégias de SEO para Aumentar o Tráfego do seu Site",
       content: "Neste post, discutimos cinco estratégias eficazes de SEO que podem ajudar a aumentar significativamente o tráfego do seu site. Desde a otimização de palavras-chave até a criação de conteúdo de qualidade, estas dicas irão impulsionar sua presença online.",
       image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
       author: "Ana Silva",
       date: "2024-05-15",
       category: "SEO",
       views: 1500
   },
   {
       id: 2,
       title: "Como Criar uma Presença Digital Forte para sua Empresa",
       content: "Descubra os passos essenciais para estabelecer uma presença digital sólida para o seu negócio. Desde a criação de um site profissional até o gerenciamento eficaz das redes sociais, este guia abrangente o ajudará a se destacar no mundo digital.",
       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
       author: "Carlos Mendes",
       date: "2024-05-20",
       category: "Marketing Digital",
       views: 1200
   },
   {
       id: 3,
       title: "Tendências de Web Design para 2024",
       content: "Fique por dentro das últimas tendências em web design que dominarão 2024. De layouts minimalistas a designs interativos, saiba como manter seu site na vanguarda e atrair mais visitantes.",
       image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
       author: "Lúcia Ferreira",
       date: "2024-05-25",
       category: "Web Design",
       views: 980
   },
   {
       id: 4,
       title: "O Impacto da Inteligência Artificial no Marketing Digital",
       content: "Explore como a Inteligência Artificial está revolucionando o marketing digital. Desde chatbots até análise preditiva, descubra como implementar IA em sua estratégia de marketing para obter melhores resultados.",
       image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
       author: "Ricardo Oliveira",
       date: "2024-06-01",
       category: "Inteligência Artificial",
       views: 2200
   },
   {
       id: 5,
       title: "Guia Completo de E-mail Marketing para Pequenas Empresas",
       content: "Aprenda a criar campanhas de e-mail marketing eficazes para sua pequena empresa. Este guia abrange desde a construção de uma lista de e-mails até a criação de conteúdo envolvente e análise de métricas.",
       image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
       author: "Mariana Costa",
       date: "2024-06-07",
       category: "E-mail Marketing",
       views: 1800
   }
];

// Função para renderizar os posts do blog
function renderBlogPosts() {
   const featuredPost = document.getElementById('featured-post');
   const postsContainer = document.getElementById('posts');
   
   // Renderiza o post em destaque
   const featured = blogPosts[0];
   featuredPost.innerHTML = `
       <article class="post featured">
           <img src="${featured.image}" alt="${featured.title}">
           <h2>${featured.title}</h2>
           <p class="meta">Por ${featured.author} | ${new Date(featured.date).toLocaleDateString()} | ${featured.category}</p>
           <p>${featured.content}</p>
           <a href="#" class="read-more">Leia mais</a>
       </article>
   `;

   // Renderiza os demais posts
   postsContainer.innerHTML = '';
   for (let i = 1; i < blogPosts.length; i++) {
       const post = blogPosts[i];
       const postElement = document.createElement('article');
       postElement.classList.add('post');
       postElement.innerHTML = `
           <img src="${post.image}" alt="${post.title}">
           <h2>${post.title}</h2>
           <p class="meta">Por ${post.author} | ${new Date(post.date).toLocaleDateString()} | ${post.category}</p>
           <p>${post.content.substring(0, 150)}...</p>
           <a href="#" class="read-more">Leia mais</a>
       `;
       postsContainer.appendChild(postElement);
   }
}

// Função para renderizar as categorias
function renderCategories() {
   const categoriesContainer = document.getElementById('categories');
   const categories = [...new Set(blogPosts.map(post => post.category))];
   
   categoriesContainer.innerHTML = '';
   categories.forEach(category => {
       const li = document.createElement('li');
       li.textContent = category;
       categoriesContainer.appendChild(li);
   });
}

// Função para renderizar os posts populares
function renderPopularPosts() {
   const popularPostsContainer = document.getElementById('popular-posts');
   const sortedPosts = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 3);
   
   popularPostsContainer.innerHTML = '';
   sortedPosts.forEach(post => {
       const li = document.createElement('li');
       li.innerHTML = `<a href="#">${post.title}</a>`;
       popularPostsContainer.appendChild(li);
   });
}

// Função para alternar o modo escuro
function toggleDarkMode() {
   document.body.classList.toggle('dark-mode');
   const darkModeToggle = document.getElementById('dark-mode-toggle');
   if (document.body.classList.contains('dark-mode')) {
       darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
   } else {
       darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
   }
}

// Função para abrir o modal de contato
function openContactModal() {
   const modal = document.getElementById('contact-modal');
   modal.style.display = 'block';
}

// Função para fechar o modal de contato
function closeContactModal() {
   const modal = document.getElementById('contact-modal');
   modal.style.display = 'none';
}

// Função para lidar com o envio do formulário de contato
function handleContactFormSubmit(event) {
   event.preventDefault();
   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const message = document.getElementById('message').value;
   
   // Aqui você pode adicionar a lógica para enviar o formulário para um servidor
   console.log('Formulário enviado:', { name, email, message });
   
   alert('Obrigado por entrar em contato! Responderemos em breve.');
   closeContactModal();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
   renderBlogPosts();
   renderCategories();
   renderPopularPosts();
   
   const darkModeToggle = document.getElementById('dark-mode-toggle');
   darkModeToggle.addEventListener('click', toggleDarkMode);
   
   const contactLinks = document.querySelectorAll('a[href="#contato"]');
   contactLinks.forEach(link => {
       link.addEventListener('click', (e) => {
           e.preventDefault();
           openContactModal();
       });
   });
   
   const closeModalButton = document.querySelector('.modal .close');
   closeModalButton.addEventListener('click', closeContactModal);
   
   const contactForm = document.getElementById('contact-form');
   contactForm.addEventListener('submit', handleContactFormSubmit);
   
   // Fechar o modal quando clicar fora dele
   window.addEventListener('click', (event) => {
       const modal = document.getElementById('contact-modal');
       if (event.target == modal) {
           closeContactModal();
       }
   });
});