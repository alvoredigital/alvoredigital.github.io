document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
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
    const data = Object.fromEntries(formData.entries());

    // Adiciona o ID do post, se existir
    const postIdInput = document.getElementById('postId');
    if (postIdInput) {
      data.postId = postIdInput.value;
    }

    console.log('Dados a serem enviados:', data);

    fetch('https://script.google.com/macros/s/AKfycby3OkKLWEWc7bjQln4FISIUmyTSVn15MwEQFE3ApiOBv7SxS9vVhufY8jNHShrKpYTl/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    .then(response => {
      console.log('Resposta bruta:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log('Resultado:', result);
      spinner.classList.add('hidden');
      responseMessage.textContent = result.message || 'Mensagem enviada com sucesso!';
      if (result.result === 'success') {
        form.reset();
      }
      okButton.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Erro detalhado:', error);
      spinner.classList.add('hidden');
      if (error.message === 'Failed to fetch') {
        responseMessage.textContent = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else {
        responseMessage.textContent = `Erro ao enviar dados: ${error.message}. Tente novamente mais tarde.`;
      }
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