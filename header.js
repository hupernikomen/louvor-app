// header.js
async function carregarHeader(titulo = 'Dashboard') {
  try {
    const response = await fetch('header.html');
    const html = await response.text();
    
    // Insere o header
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
    }
    
    // Muda o título
    const h1 = document.querySelector('[data-title]');
    if (h1) {
      h1.textContent = titulo;
      h1.setAttribute('data-title', titulo);
    }
    
  } catch (error) {
    console.error('Erro ao carregar header:', error);
    
    // Fallback caso o header.html não carregue
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.innerHTML = `
        <header class="header">
          <button onclick="history.back()" class="btn-voltar" title="Voltar">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
          <h1>${titulo}</h1>
          <div></div>
        </header>
      `;
    }
  }
}