// ================================================
// escala-card.js - Versão otimizada para mobile
// ================================================

const escalaCardCSS = `
  <style>
    .escala-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
      margin-bottom: 25px;           /* menor no mobile */
      overflow: hidden;
      border: 1px solid #f0f0f0;
      width: 100%;
    }

    .card-header {
      background: #f1f5f9;
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tipo-culto {
      padding: 5px 11px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 600;
      text-transform: uppercase;
      color: white;
    }

    .data {
      font-weight: 500;
      color: #2c3e50;
      font-size: 0.88rem;
    }

    .musicas {
      padding: 16px 18px;
    }

    .musica-item {
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.92rem;
      margin-left: 10px;
      padding: 7px 0;
    }

    .musica-item:last-child {
      border-bottom: none;
    }

    .tom {
      color: #27ae60;
      font-weight: 500;
    }

    .equipe {
      padding: 0 18px 18px;
    }

    .membros {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .membro-tag {
      background: #f1f5f9;
      color: #334155;
      padding: 5px 11px;
      border-radius: 20px;
      font-size: 0.84rem;
    }

    .observacoes {
      background: #fff8e1;
      padding: 16px 18px;
      border-top: 1px solid #ffeaa7;
      color: #5d4037;
      font-size: 0.86rem;
    }

    /* Ajustes para telas pendentes */
    .escala-card.pendente .card-header {
      padding: 16px 18px;
    }

    .escala-card.pendente .card-header h3 {
      font-size: 1.05rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    .escala-card.pendente .musica-item {
      margin-left: 0;
    }

    .equipe-pendente {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .btn-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 15px;
      padding: 0 18px 20px;
    }

    .btn-aprovar, .btn-editar {
      font-size: 0.85rem;
      padding: 11px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-aprovar {
      background: #28a74599;
      color: white;
    }

    .btn-editar {
      background: #ffc10799;
      color: #212529;
    }

    /* Melhor responsividade em telas pequenas */
    @media (max-width: 480px) {
      .escala-card {
        margin-bottom: 20px;
        border-radius: 14px;
      }
      .card-header, .musicas, .equipe, .observacoes, .btn-group {
        padding-left: 16px;
        padding-right: 16px;
      }
      .musica-item {
        font-size: 0.90rem;
      }
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

  const headerHTML = (onAprovar || onEditar) 
    ? `<h3>${escala.tipoCulto || 'Culto'} - ${dataFormatada}</h3>`
    : `
      <span class="tipo-culto" style="background: ${corBadge};">${escala.tipoCulto || 'Culto'}</span>
      <span class="data">${dataFormatada}</span>
    `;

  card.innerHTML = `
    <div class="card-header">${headerHTML}</div>
    <div class="musicas">${musicasHTML}</div>
    <div class="equipe ${onAprovar || onEditar ? 'equipe-pendente' : ''}">
      <div class="membros">${equipeHTML}</div>
    </div>
    ${observacoesHTML}
    ${botoesHTML}
  `;

  return card;
}

// Adiciona o CSS uma única vez
if (!document.getElementById('escala-card-styles')) {
  const styleDiv = document.createElement('div');
  styleDiv.id = 'escala-card-styles';
  styleDiv.innerHTML = escalaCardCSS;
  document.head.appendChild(styleDiv);
}

window.criarEscalaCard = criarEscalaCard;
window.getTipoCultoColor = getTipoCultoColor;