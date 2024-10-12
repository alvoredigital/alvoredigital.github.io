document.addEventListener('DOMContentLoaded', function() {
    // Seletor para o botão de alternância do modo escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Função para aplicar o modo escuro
    function applyDarkMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Verificar a preferência salva no localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    applyDarkMode(isDarkMode);

    // Adicionar evento de clique ao botão de alternância
    darkModeToggle.addEventListener('click', function() {
        const newDarkMode = !body.classList.contains('dark');
        localStorage.setItem('darkMode', newDarkMode);
        applyDarkMode(newDarkMode);
    });

    // Array de posts
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

    // Função para carregar posts
    function loadPosts() {
        const postsContainer = document.querySelector('.blog-posts');
        if (postsContainer) {
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.className = 'blog-post';
                postElement.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="category">${post.category}</span>
                        <span class="date">${post.date}</span>
                        <span class="author">${post.author}</span>
                    </div>
                    <a href="posts/${post.id}.html" class="read-more">Ler mais</a>
                `;
                postsContainer.appendChild(postElement);
            });
        }
    }

    // Função para carregar posts recentes
    function loadRecentPosts() {
        const recentPostsList = document.querySelector('.recent-posts ul');
        if (recentPostsList) {
            recentPostsList.innerHTML = '';
            posts.slice(0, 5).forEach(post => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `posts/${post.id}.html`;
                a.textContent = post.title;
                li.appendChild(a);
                recentPostsList.appendChild(li);
            });
        }
    }

    // Função para carregar categorias
    function loadCategories() {
        const categoriesList = document.querySelector('.categories ul');
        if (categoriesList) {
            const categories = {};
            posts.forEach(post => {
                if (categories[post.category]) {
                    categories[post.category]++;
                } else {
                    categories[post.category] = 1;
                }
            });

            categoriesList.innerHTML = '';
            Object.entries(categories).forEach(([category, count]) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${category.toLowerCase().replace(' ', '-')}`;
                a.innerHTML = `${category} <span>${count}</span>`;
                li.appendChild(a);
                categoriesList.appendChild(li);
            });
        }
    }

    // Carregar posts, posts recentes e categorias
    loadPosts();
    loadRecentPosts();
    loadCategories();

    // Adicionar funcionalidade de pesquisa
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input[type="search"]').value;
            alert(`Você pesquisou por: ${searchTerm}`);
            // Aqui você implementaria a lógica real de pesquisa
        });
    }
});