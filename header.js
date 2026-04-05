// header.js - Versão atualizada
async function carregarHeader(titulo = 'Dashboard') {
  try {
    const response = await fetch('header.html');
    const html = await response.text();
    
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
    }
    
    // Atualiza o título
    const h1 = document.querySelector('[data-title]');
    if (h1) {
      h1.textContent = titulo;
      h1.setAttribute('data-title', titulo);
    }

  } catch (error) {
    console.error('Erro ao carregar header:', error);
    
    // Fallback
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.innerHTML = `
        <header class="header">
          <div>
            <button onclick="voltarParaFeed()" class="btn-voltar" title="Voltar para o Feed">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </button>
          </div>
          <h1>${titulo}</h1>
          <div></div>
        </header>
      `;
    }
  }
}

// Função global para voltar sempre para o feed
window.voltarParaFeed = function() {
  window.location.href = "index.html";
};