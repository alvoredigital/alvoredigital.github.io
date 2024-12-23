document.addEventListener('DOMContentLoaded', function() {
   const form = document.getElementById('contact-form');
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

    fetch('https://script.google.com/macros/s/AKfycbwdIdvTGgvQhZ848CXDwPgfmuNyrmwE7SlpaHldw23I00CedtgDj33ygMBGt5DPkQwNTQ/exec', {
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
});
