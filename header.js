// ================================================
// header.js - Versão Unificada (HTML + CSS + JS)
// ================================================

async function carregarHeader(titulo = 'Dashboard') {
  const headerHTML = `
    <header class="header">
      <div>
        <button onclick="voltarParaFeed()" class="btn-voltar" title="Voltar para o Feed">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      </div>
      <h1 data-title="${titulo}">${titulo}</h1>
      <div></div>
    </header>
  `;

  const headerCSS = `
    <style>
      .header {
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 100;
        border-radius: 12px;
        margin-bottom: 2rem;
      }

      .btn-voltar {
        padding: 12px;
        color: #000;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }

      .btn-voltar:hover {
        transform: translateY(-2px);
      }

      .header h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #2c3e50;
        margin: 0;
      }

      /* Estilos auxiliares para compatibilidade */
      .container { max-width: 1000px; margin: 0 auto; padding: 1rem; }
    </style>
  `;

  try {
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.innerHTML = headerHTML + headerCSS;
    }
  } catch (error) {
    console.error('Erro ao carregar header:', error);
    
    // Fallback simples
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

// Função global para voltar sempre para o feed principal
window.voltarParaFeed = function() {
  window.location.href = "index.html";
};