document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.btn-purchase');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        alert("Entre em contato pelo WhatsApp para concluir sua compra!");
        window.open("https://wa.me/message/AJDGRGQCQNAGF1", "_blank");
      });
    });
  });
  