// header.js
async function carregarHeader(titulo = 'Dashboard') {
  try {
    const response = await fetch('header.html');
    const html = await response.text();
    
    // Insere o header
    document.getElementById('header-placeholder').innerHTML = html;
    
    // Muda o título
    const h1 = document.querySelector('[data-title]');
    h1.textContent = titulo;
    h1.setAttribute('data-title', titulo);
    
  } catch (error) {
    console.error('Erro ao carregar header:', error);
    // Fallback
    document.getElementById('header-placeholder').innerHTML = `
      <header class="header">
        <button onclick="history.back()" class="btn-voltar">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        <h1>${titulo}</h1>
        <div></div>
      </header>
    `;
  }
}