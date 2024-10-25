document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const logoToggle = document.getElementById('logoToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Menu toggle functionality
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Toggle logo visibility
        if (logoToggle) {
            logoToggle.classList.toggle('hidden');
        }

        // Create or remove overlay
        if (body.classList.contains('menu-open')) {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeMenu);
        } else {
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    });

    function closeMenu() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');

        // Show logo when closing menu
        if (logoToggle) {
            logoToggle.classList.remove('hidden');
        }

        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.remove();
        }

    }

    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Dark mode toggle functionality
    function applyDarkMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    applyDarkMode(isDarkMode);

    darkModeToggle.addEventListener('click', function() {
        const newDarkMode = !body.classList.contains('dark');
        localStorage.setItem('darkMode', newDarkMode);
        applyDarkMode(newDarkMode);
    });

    // Cookie consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesButton = document.getElementById('acceptCookies');

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

    if (getCookie('cookieConsent') !== 'true') {
        cookieConsent.style.display = 'block';
    }

    acceptCookiesButton.addEventListener('click', function() {
        setCookie('cookieConsent', 'true', 365);
        cookieConsent.style.display = 'none';
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
            image: "assets/img/posts_img/post1.jpg"
        },
        {
            id: 2,
            title: "Como Criar uma Estratégia de Redes Sociais Eficiente",
            excerpt: "Descubra as melhores práticas para desenvolver uma estratégia de  redes sociais que gera resultados.",
            category: "Redes Sociais",
            date: "2024-03-05",
            author: "Carlos Santos",
            image: "assets/img/posts_img/post2.jpg"
        },
        {
            id: 3,
            title: "E-mail Marketing: 5 Táticas para Aumentar suas Taxas de Conversão",
            excerpt: "Aprenda táticas comprovadas para melhorar suas campanhas de e-mail marketing e aumentar as conversões.",
            category: "E-mail Marketing",
            date: "2024-03-10",
            author: "Mariana Oliveira",
            image: "assets/img/posts_img/post3.jpg"
        },
        {
            id: 4,
            title: "A Importância da Análise de Dados no Marketing Digital",
            excerpt: "Entenda como a análise de dados pode impulsionar suas estratégias de marketing digital e melhorar os resultados.",
            category: "Análise de Dados",
            date: "2024-03-15",
            author: "Pedro Almeida",
            image: "assets/img/posts_img/post4.jpg"
        },
        {
            id: 5,
            title: "Content Marketing: Como Criar Conteúdo que Engaja e Converte",
            excerpt: "Descubra as melhores práticas para criar conteúdo relevante que atrai, engaja e converte sua audiência.",
            category: "Content Marketing",
            date: "2024-03-20",
            author: "Juliana Costa",
            image: "assets/img/posts_img/post5.jpg"
        },
        {
            id: 6,
            title: "Otimização de Conversão: Técnicas para Melhorar suas Taxas de Conversão",
            excerpt: "Aprenda técnicas eficazes para otimizar seu site e aumentar as taxas de conversão.",
            category: "SEO",
            date: "2024-03-25",
            author: "Rafael Mendes",
            image: "assets/img/posts_img/post6.jpg"
        },
        {
            id: 7,
            title: "Marketing de Influência: Como Escolher os Influenciadores Certos",
            excerpt: "Saiba como identificar e colaborar com os influenciadores mais adequados para sua marca.",
            category: "Redes Sociais",
            date: "2024-03-30",
            author: "Fernanda Lima",
            image: "assets/img/posts_img/post7.jpg"
        },
        {
            id: 8,
            title: "Tendências de Marketing Digital para 2024",
            excerpt: "Fique por dentro das principais tendências de marketing digital que dominarão o cenário em 2024.",
            category: "Marketing Digital",
            date: "2024-04-01",
            author: "Lucas Ferreira",
            image: "assets/img/posts_img/post8.jpg"
        }
    ];

    let currentPostsCount = 0;
    const postsPerPage = 5;

    // Função para criar o card do post
    function createPostCard(post) {
        return `
            <article class="blog-post">
                <img src="${post.image}" alt="${post.title}">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-meta">
                    <a href="category.html?category=${encodeURIComponent(post.category)}" class="category"><i class="fas fa-folder category-icon"></i>${post.category}</a> 
                    <span class="date">${post.date}</span>
                    <span class="author">${post.author}</span>
                </div>
                <a href="posts/post${post.id}.html" class="read-more">Ler mais</a>
            </article>
        `;
    }

    // Função para carregar posts
    function loadPosts() {
        const postsContainer = document.querySelector('.blog-posts');
        if (postsContainer) {
            const postsToLoad = posts.slice(currentPostsCount, currentPostsCount + postsPerPage);
            postsToLoad.forEach(post => {
                postsContainer.innerHTML += createPostCard(post);
            });
            currentPostsCount += postsToLoad.length;

            // Ocultar o botão "Carregar mais" se todos os posts foram carregados
            const loadMoreButton = document.getElementById('loadMorePosts');
            if (currentPostsCount >= posts.length) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'block';
            }
        }
    }

    // Carregar posts iniciais
    loadPosts();

    // Adicionar evento de clique ao botão "Carregar mais posts"
    const loadMoreButton = document.getElementById('loadMorePosts');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadPosts);
    }

    // Função para carregar posts recentes
    function loadRecentPosts() {
        const recentPostsList = document.querySelector('.recent-posts ul');
        if (recentPostsList) {
            recentPostsList.innerHTML = '';
            posts.slice(0, 5).forEach(post => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `posts/post${post.id}.html`;
                a.textContent = post.title;
                li.appendChild(a);
                recentPostsList.appendChild(li);
            });
        }
    }

    // Função para carregar categorias
    function loadCategories() {
        const categoriesList = document.getElementById('categoriesList');
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
                a.href = `category.html?category=${encodeURIComponent(category)}`;
                a.innerHTML = `
                    <i class="fas fa-folder category-icon"></i>
                    ${category}
                    <span>${count}</span>
                `;
                li.appendChild(a);
                categoriesList.appendChild(li);
            });
        }
    }

    // Carregar posts recentes e categorias
    loadRecentPosts();
    loadCategories();

    // Função para realizar a pesquisa
    function performSearch(searchTerm) {
        const searchResults = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const searchResultsList = document.getElementById('searchResultsList');
        searchResultsList.innerHTML = '';

        if (searchResults.length === 0) {
            searchResultsList.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        } else {
            searchResults.forEach(post => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.innerHTML = `
                    <h3><a href="posts/post${post.id}.html">${post.title}</a></h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="category">${post.category}</span>
                        <span class="date">${post.date}</span>
                        <span class="author">${post.author}</span>
                    </div>
                `;
                searchResultsList.appendChild(resultItem);
            });
        }

        document.getElementById('searchResults').style.display = 'block';
    }

    // Adicionar evento de submit ao formulário de pesquisa
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('searchInput').value;
            performSearch(searchTerm);
        });
    }

    // Fechar resultados da pesquisa
    const closeSearchResults = document.getElementById('closeSearchResults');
    if (closeSearchResults) {
        closeSearchResults.addEventListener('click', function() {
            document.getElementById('searchResults').style.display = 'none';
        });
    }

    // Função para carregar posts de uma categoria específica
    function loadCategoryPosts() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            const categoryTitle = document.getElementById('categoryTitle');
            const categoryPosts = document.getElementById('categoryPosts');
            
            if (categoryTitle && categoryPosts) {
                categoryTitle.textContent = `Categoria: ${category}`;
                const filteredPosts = posts.filter(post => post.category === category);
                
                categoryPosts.innerHTML = '';
                filteredPosts.forEach(post => {
                    categoryPosts.innerHTML += createPostCard(post);
                });
            }
        }
    }
    
    // Carregar posts da categoria se estiver na página de categoria
    loadCategoryPosts();


    // Formulário de newsletter
    const form = document.getElementById('newsletter-form');
    const modal = document.getElementById('modal');
    const spinner = document.getElementById('loadingSpinner');
    const responseMessage = document.getElementById('responseMessage');
    const closeModal = document.getElementById('closeModal');
    const okButton = document.getElementById('okButton');
 
    form.addEventListener('submit', function(event) {
        event.preventDefault();
 
        // Exibe o modal e o spinner enquanto os dados estão sendo enviados
        modal.classList.add('show');
        spinner.classList.remove('hidden');
        okButton.classList.add('hidden'); // Esconde o botão OK durante o carregamento
        responseMessage.textContent = ''; // Limpa qualquer mensagem anterior
 
        const formData = new FormData(form);
        const data = new URLSearchParams();
 
        // Converte FormData para URLSearchParams
        formData.forEach((value, key) => {
            data.append(key, value);
        });
 
        // Envia os dados ao Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbzDowN6EWIiJ8fvCydGMF-aAa6_zoVNpjU0SkAXHbZwSGS8Jgd1aAjGmfpp4Sm8oahy3A/exec', {
            method: 'POST',
            body: data,
        })
        .then(response => response.text())
        .then(result => {
            spinner.classList.add('hidden'); // Esconde o spinner
            responseMessage.textContent = result; // Exibe a resposta do Google Apps Script
            form.reset(); // Limpa o formulário
            okButton.classList.remove('hidden'); // Mostra o botão OK
        })
        .catch(error => {
            spinner.classList.add('hidden'); // Esconde o spinner
            responseMessage.textContent = 'Erro ao enviar dados. Tente novamente mais tarde.';
            console.error('Erro:', error);
            okButton.classList.remove('hidden'); // Mostra o botão OK
        });
    });
 
    // Fecha o modal ao clicar no botão 'X'
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
    });
 
    // Fecha o modal ao clicar no botão 'OK'
    okButton.addEventListener('click', function() {
        modal.classList.remove('show');
    });
});

