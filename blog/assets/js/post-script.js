document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactPostForm');
  const modal = document.getElementById('modal');
  const spinner = document.getElementById('loadingSpinner');
  const responseMessage = document.getElementById('responseMessage');
  const closeModal = document.getElementById('closeModal');
  const okButton = document.getElementById('okButton');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    modal.classList.add('show');
    spinner.classList.remove('hidden');
    okButton.classList.add('hidden');
    responseMessage.textContent = '';

    const formData = new FormData(form);

    fetch('https://script.google.com/macros/s/AKfycbwej_4fc-s6lxMH0dDJDTvyYLXZmuyhj7MTWoUHUdoZl1KVeUjX52VKpAT-1B0MFkNN/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      spinner.classList.add('hidden');
      responseMessage.textContent = data.message; // Exibe apenas a mensagem
      if (data.result === 'success') {
        form.reset();
      }
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

  function adjustFormPosition() {
    const contactFormContainer = document.querySelector('.contact-form-container');
    if (window.innerWidth <= 768) {
      contactFormContainer.style.position = 'static';
    } else {
      contactFormContainer.style.position = 'sticky';
    }
  }

  adjustFormPosition();
  window.addEventListener('resize', adjustFormPosition);
});

// script para modal de termos e significado
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('explanatoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = modal.querySelector('.close');

    function showModal(term, description) {
        modalTitle.textContent = term;
        modalDescription.textContent = description;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    document.querySelectorAll('.post-content strong[data-term]').forEach(element => {
        element.addEventListener('click', () => {
            const term = element.getAttribute('data-term');
            const description = element.getAttribute('data-description');
            showModal(term, description);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});


// controle do tamanho das fontes
document.addEventListener('DOMContentLoaded', function() {
  const decreaseBtn = document.getElementById('decreaseFontSize');
  const increaseBtn = document.getElementById('increaseFontSize');
  const content = document.querySelector('.post-content');
  let fontSize = 16;

  function updateFontSize() {
    content.style.fontSize = `${fontSize}px`;
    localStorage.setItem('blogFontSize', fontSize);
  }

  // Carregar tamanho da fonte salvo
  const savedFontSize = localStorage.getItem('blogFontSize');
  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    updateFontSize();
  }

  decreaseBtn.addEventListener('click', () => {
    if (fontSize > 14) {
      fontSize -= 2;
      updateFontSize();
    }
  });

  increaseBtn.addEventListener('click', () => {
    if (fontSize < 24) {
      fontSize += 2;
      updateFontSize();
    }
  });
});
