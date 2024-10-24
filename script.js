const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active'); // Adiciona a classe .active ao menu-toggle
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active'); // Remove a classe .active ao fechar
    });
});


// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Animação de fade-in para elementos quando entram na viewport
function fadeInElements() {
    const elements = document.querySelectorAll('.service-item, .portfolio-item, .blog-post, .client-logo');

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
        header.style.backgroundColor = 'var(--background-color)';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'var(--background-color)';
        header.style.boxShadow = 'none';
    }
});

// Formulário de newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Simulação de inscrição na newsletter
    const email = this.querySelector('input[type="email"]').value;
    console.log('E-mail inscrito na newsletter:', email);

    alert('Obrigado por se inscrever em nossa newsletter!');
    this.reset();
});

// Carregamento lazy de imagens
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Animação de contagem para números
function animateNumbers() {
    const numbers = document.querySelectorAll('.number-counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const updateCount = () => {
                    const increment = target / 200;
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 1);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    numbers.forEach(number => {
        observer.observe(number);
    });
}

// Chamar a função quando a página carregar
window.addEventListener('load', animateNumbers);

// Alternância entre modo claro e escuro
const modeToggle = document.querySelector('.mode-toggle');
const html = document.documentElement;

function setDarkMode(isDark) {
    html.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', isDark);
}

modeToggle.addEventListener('click', () => {
    const isDark = !html.classList.contains('dark');
    setDarkMode(isDark);
});

// Verificar preferência do usuário ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
        setDarkMode(true);
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


// Inicialização do AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Typing Script
document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        "Soluções personalizadas em marketing digital para seu negócio",
        "Estratégias inovadoras para sua presença online",
        "Resultados mensuráveis e crescimento sustentável"
    ];
    const typingText = document.querySelector('.typing-animation');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function typePhrase() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause before starting to delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typePhrase, typingSpeed);
    }

    typePhrase();
});

// scroll section
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('nav ul li a');

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);
});