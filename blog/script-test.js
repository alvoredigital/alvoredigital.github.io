document.addEventListener('DOMContentLoaded', function() {
   const toggleButton = document.getElementById('darkModeToggle');

   // Verifica o modo salvo anteriormente no localStorage
   const currentMode = localStorage.getItem('theme') || 'light';
   if (currentMode === 'dark') {
       document.documentElement.classList.add('dark-mode');
       toggleButton.innerText = 'Light Mode';
   }

   toggleButton.addEventListener('click', function() {
       document.documentElement.classList.toggle('dark-mode');
       const isDarkMode = document.documentElement.classList.contains('dark-mode');
       toggleButton.innerText = isDarkMode ? 'Light Mode' : 'Dark Mode';
       localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
   });
});


// Dados dos posts
const posts = [
   {
       id: 1,
       title: "10 Dicas de SEO para Aumentar o Tráfego Orgânico",
       excerpt: "Aprenda estratégias eficazes para melhorar o SEO do seu site e aumentar o tráfego orgânico.",
       category: "SEO",
       date: "2024-03-01",
       author: "Ana Silva",
       url: "posts/post1.html"
   },
   {
       id: 2,
       title: "Como Criar uma Estratégia de Redes Sociais Eficiente",
       excerpt: "Descubra as melhores práticas para desenvolver uma estratégia de redes sociais que gera resultados.",
       category: "Redes Sociais",
       date: "2024-03-05",
       author: "Carlos Santos",
       url: "posts/post2.html"
   },
   {
       id: 3,
       title: "E-mail Marketing: 5 Táticas para Aumentar suas Taxas de Conversão",
       excerpt: "Aprenda táticas comprovadas para melhorar suas campanhas de e-mail marketing e aumentar as conversões.",
       category: "E-mail Marketing",
       date: "2024-03-10",
       author: "Mariana Oliveira",
       url: "posts/post3.html"
   },
   {
       id: 4,
       title: "A Importância da Análise de Dados no Marketing Digital",
       excerpt: "Entenda como a análise de dados pode impulsionar suas estratégias de marketing digital e melhorar os resultados.",
       category: "Análise de Dados",
       date: "2024-03-15",
       author: "Pedro Almeida",
       url: "posts/post4.html"
   },
   {
       id: 5,
       title: "Content Marketing: Como Criar Conteúdo que Engaja e Converte",
       excerpt: "Descubra as melhores práticas para criar conteúdo relevante que atrai, engaja e converte sua audiência.",
       category: "Content Marketing",
       date: "2024-03-20",
       author: "Juliana Costa",
       url: "posts/post5.html"
   },
   {
       id: 6,
       title: "Otimização de Conversão: Técnicas para Melhorar suas Taxas de Conversão",
       excerpt: "Aprenda técnicas eficazes para otimizar seu site e aumentar as taxas de conversão.",
       category: "SEO",
       date: "2024-03-25",
       author: "Rafael Mendes",
       url: "posts/post6.html"
   },
   {
       id: 7,
       title: "Marketing de Influência: Como Escolher os Influenciadores Certos",
       excerpt: "Saiba como identificar e colaborar com os influenciadores mais adequados para sua marca.",
       category: "Redes Sociais",
       date: "2024-03-30",
       author: "Fernanda Lima",
       url: "posts/post7.html"
   },
   {
       id: 8,
       title: "Tendências de Marketing Digital para 2024",
       excerpt: "Fique por dentro das principais tendências de marketing digital que dominarão o cenário em 2024.",
       category: "Marketing Digital",
       date: "2024-04-01",
       author: "Lucas Ferreira",
       url: "posts/post8.html"
   }
];

// Funções para criar e carregar os posts, categorias e posts recentes (como antes)
function createPostCard(post) {
   return `
       <div class="post-card">
           <div class="post-card-content">
               <h3>${post.title}</h3>
               <div class="post-meta">
                   <span>${post.date}</span> | <span>${post.author}</span> | <span>${post.category}</span>
               </div>
               <p>${post.excerpt}</p>
               <a href="${post.url}">Ler mais</a>
           </div>
       </div>
   `;
}

function loadPosts(start, limit) {
   const postContainer = document.getElementById('postContainer');
   const postsToShow = posts.slice(start, start + limit);
   
   postsToShow.forEach(post => {
       postContainer.innerHTML += createPostCard(post);
   });

   if (start + limit >= posts.length) {
       document.getElementById('loadMore').style.display = 'none';
   }
}

loadPosts(0, 5);

let currentPostCount = 5;
document.getElementById('loadMore').addEventListener('click', () => {
   loadPosts(currentPostCount, 5);
   currentPostCount += 5;
});

function loadRecentPosts() {
   const recentPostsList = document.getElementById('recentPosts');
   const recentPosts = posts.slice(0, 5);

   recentPosts.forEach(post => {
       recentPostsList.innerHTML += `<li><a href="${post.url}">${post.title}</a></li>`;
   });
}

function loadCategories() {
   const categoriesList = document.getElementById('categoriesList');
   const categories = [...new Set(posts.map(post => post.category))];

   categories.forEach(category => {
       categoriesList.innerHTML += `<li><a href="category.html?category=${encodeURIComponent(category)}">${category}</a></li>`;
   });
}

loadRecentPosts();
loadCategories();
