// header.js
async function carregarHeader(titulo = 'Dashboard') {
  try {
    const response = await fetch('header.html');
    let html = await response.text();
    
    // Substitui o título dinamicamente
    html = html.replace(/Dashboard/g, titulo);
    
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
    }
    
    // Ajusta tamanho do título
    const h1 = document.querySelector('h1[data-title]');
    if (h1) {
      h1.style.fontSize = '1.35rem';
      h1.style.fontWeight = '600';
      h1.style.color = '#2c3e50';
      h1.style.margin = '0';
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
          <h1 style="font-size: 1.35rem; font-weight: 600; color: #2c3e50;">${titulo}</h1>
          <div></div>
        </header>
      `;
    }
  }
}

window.voltarParaFeed = function() {
  window.location.href = "index.html";
};