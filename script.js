document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o envio padrão

            const url = form.action;
            const data = new FormData(form);

            // Exibe mensagem de envio
            formStatus.textContent = "Enviando, aguarde...";
            formStatus.style.color = "orange";

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = "Mensagem enviada com sucesso! Em breve o escritório Lopes de Oliveira entrará em contato.";
                    formStatus.style.color = "green";
                    form.reset(); // Limpa o formulário
                } else {
                    const errorData = await response.json();
                    let errorMessage = errorData.error ? errorData.error : "Houve um erro no envio. Tente novamente ou entre em contato via WhatsApp.";
                    formStatus.textContent = errorMessage;
                    formStatus.style.color = "red";
                }
            } catch (error) {
                formStatus.textContent = "Houve um erro de conexão. Verifique sua internet ou contate-nos via WhatsApp.";
                formStatus.style.color = "red";
            }
        });
    }

    // Código para Smooth Scrolling (rolagem suave)
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});