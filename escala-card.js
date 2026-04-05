// ================================================
// escala-card.js - Card unificado com aparência idêntica
// ================================================

const escalaCardCSS = `
  <style>
    .escala-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
      margin-bottom: 35px;
      overflow: hidden;
      border: 1px solid #f0f0f0;
    }

    .card-header {
      background: #f1f5f9;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
    }

    /* Estilo padrão do index.html */
    .tipo-culto {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.80rem;
      font-weight: 500;
      text-transform: uppercase;
      color: white;
    }

    .data {
      font-weight: 500;
      color: #2c3e50;
      font-size: 0.90rem;
    }

    .musicas {
      padding: 16px 20px;
    }

    .musica-item {
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.90rem;
      margin-left: 12px;
      padding: 8px 0;
    }

    .musica-item:last-child {
      border-bottom: none;
    }

    .tom {
      color: #27ae6099;
      font-weight: 500;
    }

    .equipe {
      padding: 0 20px 20px;
    }

    .membros {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      margin-top: 8px;
    }

    .membro-tag {
      background: #f1f5f9;
      color: #334155;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.85rem;
    }

    .observacoes {
      background: #fff8e1;
      padding: 16px 20px;
      border-top: 1px solid #ffeaa7;
      color: #5d4037;
      font-size: 0.85rem;
    }

    /* ============== ESTILO ESPECÍFICO PARA PENDENTES ============== */
    .escala-card.pendente .card-header {
      padding: 16px 20px;
    }

    .escala-card.pendente .card-header h3 {
      font-size: 1.10rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    .escala-card.pendente .musicas {
      padding: 16px 20px;
      margin-bottom: 0.5rem;
    }

    .escala-card.pendente .musica-item {
      margin-left: 12px;
      padding: 6px 0;
    }

    .equipe-pendente {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      padding-bottom: 10px;
    }

    .btn-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 10px;
      padding: 0 20px 20px;
    }

    .btn-aprovar {
      font-size: 0.85rem;
      background: #52d27099;
      color: white;
      padding: 11px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-editar {
      font-size: 0.85rem;
      background: #f2c64399;
      color: #212529;
      padding: 11px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
`;

function getTipoCultoColor(tipo) {
  const t = (tipo || "").toLowerCase().trim();
  if (t.includes("louvor") || t.includes("pregação")) return "#f3707099";
  if (t.includes("oração") || t.includes("doutrina")) return "#56cff799";
  if (t.includes("ebd")) return "#3498db99";
  if (t.includes("evento")) return "#9b59b699";
  if (t.includes("especial")) return "#f39c1299";
  return "#34495e99";
}

function criarEscalaCard(escala, isLogado = false, onAprovar = null, onEditar = null) {
  const card = document.createElement('div');
  card.className = `escala-card ${onAprovar || onEditar ? 'pendente' : ''}`;

  // Torna clicável no feed quando logado
  if (isLogado && !onAprovar && !onEditar) {
    card.style.cursor = 'pointer';
    card.onclick = () => window.location.href = `editar-escala.html?id=${escala.id}`;
  }

  const dataFormatada = new Date(escala.data + 'T12:00:00').toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });

  const corBadge = getTipoCultoColor(escala.tipoCulto || '');

  const musicasHTML = (escala.musicas && escala.musicas.length)
    ? escala.musicas.map(m => `
        <div class="musica-item">
          ${m.titulo} ${m.tom ? `<span class="tom">(${m.tom})</span>` : ''}
        </div>`).join('')
    : '<p style="color:#999; font-style:italic; padding:8px 0;">Nenhuma música definida</p>';

  const equipeHTML = (escala.equipe && escala.equipe.length)
    ? escala.equipe.map(m => `<span class="membro-tag">${m.nome}</span>`).join('')
    : '<span style="color:#999;">Nenhum membro definido</span>';

  const observacoesHTML = escala.observacoes 
    ? `<div class="observacoes"><strong>Obs.:</strong> ${escala.observacoes}</div>` 
    : '';

  const botoesHTML = (onAprovar || onEditar) ? `
    <div class="btn-group">
      ${onAprovar ? `<button onclick="${onAprovar}" class="btn-aprovar">APROVAR</button>` : ''}
      ${onEditar ? `<button onclick="${onEditar}" class="btn-editar">EDITAR</button>` : ''}
    </div>` : '';

  // Header diferente conforme o contexto
  const headerHTML = (onAprovar || onEditar) 
    ? `<h3>${escala.tipoCulto || 'Culto'} - ${dataFormatada}</h3>`
    : `
      <span class="tipo-culto" style="background: ${corBadge};">${escala.tipoCulto || 'Culto'}</span>
      <span class="data">${dataFormatada}</span>
    `;

  card.innerHTML = `
    <div class="card-header">
      ${headerHTML}
    </div>
    <div class="musicas">${musicasHTML}</div>
    <div class="equipe ${onAprovar || onEditar ? 'equipe-pendente' : ''}">
      <div class="membros">${equipeHTML}</div>
    </div>
    ${observacoesHTML}
    ${botoesHTML}
  `;

  return card;
}

// Adiciona CSS apenas uma vez
if (!document.getElementById('escala-card-styles')) {
  const styleDiv = document.createElement('div');
  styleDiv.id = 'escala-card-styles';
  styleDiv.innerHTML = escalaCardCSS;
  document.head.appendChild(styleDiv);
}

window.criarEscalaCard = criarEscalaCard;
window.getTipoCultoColor = getTipoCultoColor;