// Dados dos posts
const posts = [
    {
        id: 1,
        title: "10 Dicas de SEO para Aumentar o Tráfego Orgânico",
        excerpt: "Aprenda estratégias eficazes para melhorar o SEO do seu site e aumentar o tráfego orgânico.",
        category: "SEO",
        date: "2024-03-01",
        author: "Ana Silva",
        image: "/placeholder.svg?height=300&width=800"
    },
    {
        id: 2,
        title: "Como Criar uma Estratégia de Redes Sociais Eficiente",
        excerpt: "Descubra as melhores práticas para desenvolver uma estratégia de redes sociais que gera resultados.",
        category: "Redes Sociais",
        date: "2024-03-05",
        author: "Carlos Santos",
        image: "/placeholder.svg?height=300&width=800"
    },
    {
        id: 3,
        title: "E-mail Marketing: 5 Táticas para Aumentar suas Taxas de Conversão",
        excerpt: "Aprenda táticas comprovadas para melhorar suas campanhas de e-mail marketing e aumentar as conversões.",
        category: "E-mail Marketing",
        date: "2024-03-10",
        author: "Mariana Oliveira",
        image: "/placeholder.svg?height=300&width=800"
    },
    {
        id: 4,
        title: "A Importância da Análise de Dados no Marketing Digital",
        excerpt: "Entenda como a análise de dados pode impulsionar suas estratégias de marketing digital e melhorar os resultados.",
        category: "Análise de Dados",
        date: "2024-03-15",
        author: "Pedro Almeida",
        image: "/placeholder.svg?height=300&width=800"
    },
    {
        id: 5,
        title: "Content Marketing: Como Criar Conteúdo que Engaja e Converte",
        excerpt: "Descubra as melhores práticas para criar conteúdo relevante que atrai, engaja e converte sua audiência.",
        category: "Content Marketing",
        date: "2024-03-20",
        author: "Juliana Costa",
        image: "/placeholder.svg?height=300&width=800"
    },
    {
        id: 6,
        title: "Otimização de Conversão: Técnicas para Melhorar suas Taxas de Conversão",
        excerpt: "Aprenda técnicas eficazes para otimizar seu site e aumentar as taxas de conversão.",
        category: "SEO",
        date: "2024-03-25",
        author: "Rafael Mendes",
        image: "/placeholder.svg?height=300&width=800"
    },
    {
        id: 7,
        title: "Marketing de Influência: Como Escolher os Influenciadores Certos",
        excerpt: "Saiba como identificar e colaborar com os influenciadores mais adequados para sua marca.",
        category: "Redes Sociais",
        date: "2024-03-30",
        author: "Fernanda Lima",
        image: "/placeholder.svg?height=300&width=800"
    },
    {
        id: 8,
        title: "Tendências de Marketing Digital para 2024",
        excerpt: "Fique por dentro das principais tendências de marketing digital que dominarão o cenário em 2024.",
        category: "Marketing Digital",
        date: "2024-04-01",
        author: "Lucas Ferreira",
        image: "/placeholder.svg?height=300&width=800"
    }
];

// Função para criar um card de post

function createPostCard(post) {
    return `
        <div class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-card-image">
            <div class="post-card-content">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span>${post.date}</span> | <span>${post.author}</span> | <span>${post.category}</span>
                </div>
                <p>${post.excerpt}</p>
                <a href="posts/post${post.id}.html">Ler mais</a>
            </div>
        </div>
    `;
}

// Função para carregar posts
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

// Carregar posts iniciais
loadPosts(0, 4);

// Evento de clique no botão "Carregar mais"
let currentPostCount = 4;
document.getElementById('loadMore').addEventListener('click', () => {
    loadPosts(currentPostCount, 4);
    currentPostCount += 4;
});

// Carregar posts recentes no sidebar
function loadRecentPosts() {
    const recentPostsList = document.getElementById('recentPosts');
    const recentPosts = posts.slice(0, 5);

    recentPosts.forEach(post => {
        recentPostsList.innerHTML += `<li><a href="posts/post${post.id}.html">${post.title}</a></li>`;
    });
}

// Carregar categorias no sidebar
function loadCategories() {
    const categoriesList = document.getElementById('categoriesList');
    const categories = {};
    
    // Contar posts por categoria
    posts.forEach(post => {
        if (categories[post.category]) {
            categories[post.category]++;
        } else {
            categories[post.category] = 1;
        }
    });

    // Criar lista de categorias com contagem
    Object.entries(categories).forEach(([category, count]) => {
        categoriesList.innerHTML += `
            <li>
                <a href="category.html?category=${encodeURIComponent(category)}">
                    ${category}
                    <span class="category-count">${count}</span>
                </a>
            </li>
        `;
    });
}

// O resto do seu código JavaScript permanece o mesmo

// Alternar modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferência de modo escuro
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Adicionar evento de clique ao botão de modo escuro
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

loadRecentPosts();
loadCategories();