document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
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

    // Header style change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'var(--background-color)';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'var(--background-color)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll tracking for nav links
    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission (replace with actual API call)
        simulateFormSubmission(data)
            .then(response => {
                alert('Obrigado pelo seu interesse! Entraremos em contato em breve.');
                form.reset();
            })
            .catch(error => {
                alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
            });
    });

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 1000);
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    const modal = document.getElementById('modal');
    const spinner = document.getElementById('loadingSpinner');
    const responseMessage = document.getElementById('responseMessage');
    const closeModal = document.getElementById('closeModal');
    const okButton = document.getElementById('okButton');

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();

        modal.classList.add('show');
        spinner.classList.remove('hidden');
        okButton.classList.add('hidden');
        responseMessage.textContent = '';

        const formData = new FormData(newsletterForm);
        const data = new URLSearchParams();

        formData.forEach((value, key) => {
            data.append(key, value);
        });

        fetch('https://script.google.com/macros/s/AKfycbzDowN6EWIiJ8fvCydGMF-aAa6_zoVNpjU0SkAXHbZwSGS8Jgd1aAjGmfpp4Sm8oahy3A/exec', {
            method: 'POST',
            body: data,
        })
        .then(response => response.text())
        .then(result => {
            spinner.classList.add('hidden');
            responseMessage.textContent = result;
            newsletterForm.reset();
            okButton.classList.remove('hidden');
        })
        .catch(error => {
            spinner.classList.add('hidden');
            responseMessage.textContent = 'Erro ao enviar dados. Tente novamente mais tarde.';
            console.error('Erro:', error);
            okButton.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    okButton.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    // Dark mode toggle
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

    // Check user's dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
        setDarkMode(true);
    }

    // Animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
});


// Typing Script
document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        "Destaque seu perfil com nossos pacotes de seguidores e alcance mais clientes!",
        "Mais curtidas, mais visibilidade! Pacotes promocionais para impulsionar suas redes sociais.",
        "Transforme seu engajamento: aumente seguidores, curtidas e visualizações hoje mesmo!"
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

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.testimonial-nav.prev');
    const nextButton = document.querySelector('.testimonial-nav.next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateSlider();
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-advance slides
    setInterval(nextSlide, 5000);

    // Initial update
    updateSlider();
});