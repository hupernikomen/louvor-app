// ================================================
// escala-card.js - Componente unificado de Card de Escala
// ================================================

function criarEscalaCard(escala, isLogado = false, onAprovar = null, onEditar = null) {
  const card = document.createElement('div');
  card.className = 'escala-card';

  // Se estiver logado no feed, torna clicável para editar
  if (isLogado && !onAprovar && !onEditar) {
    card.style.cursor = 'pointer';
    card.onclick = () => {
      window.location.href = `editar-escala.html?id=${escala.id}`;
    };
  }

  const dataEscala = new Date(escala.data + 'T12:00:00');
  const dataFormatada = dataEscala.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });

  const corBadge = getTipoCultoColor(escala.tipoCulto || '');

  let musicasHTML = '';
  if (escala.musicas && escala.musicas.length > 0) {
    musicasHTML = escala.musicas.map(m => `
      <div class="musica-item">
        ${m.titulo} ${m.tom ? `<span class="tom">(${m.tom})</span>` : ''}
      </div>
    `).join('');
  } else {
    musicasHTML = '<p style="color:#999; font-style:italic; padding: 8px 0;">Nenhuma música definida</p>';
  }

  let equipeHTML = '';
  if (escala.equipe && escala.equipe.length > 0) {
    equipeHTML = escala.equipe.map(m => `
      <span class="membro-tag">${m.nome}</span>
    `).join('');
  } else {
    equipeHTML = '<span style="color:#999;">Nenhum membro definido</span>';
  }

  let observacoesHTML = '';
  if (escala.observacoes) {
    observacoesHTML = `
      <div class="observacoes">
        <strong>Obs.:</strong> ${escala.observacoes}
      </div>
    `;
  }

  let botoesHTML = '';
  if (onAprovar || onEditar) {
    botoesHTML = `
      <div class="btn-group">
        ${onAprovar ? `<button onclick="${onAprovar}" class="btn-aprovar">APROVAR</button>` : ''}
        ${onEditar ? `<button onclick="${onEditar}" class="btn-editar">EDITAR</button>` : ''}
      </div>
    `;
  }

  card.innerHTML = `
    <div class="card-header">
      <span class="tipo-culto" style="background: ${corBadge};">${escala.tipoCulto || 'Culto'}</span>
      <span class="data">${dataFormatada}</span>
    </div>

    <div class="musicas">
      ${musicasHTML}
    </div>

    <div class="equipe">
      <div class="membros">
        ${equipeHTML}
      </div>
    </div>

    ${observacoesHTML}

    ${botoesHTML}
  `;

  return card;
}

// Função auxiliar de cor (igual à que você já tinha)
function getTipoCultoColor(tipo) {
  const t = (tipo || "").toLowerCase().trim();
  
  if (t.includes("louvor") || t.includes("pregação")) return "#f3707099";
  if (t.includes("oração") || t.includes("doutrina")) return "#56cff799";
  if (t.includes("ebd")) return "#3498db99";
  if (t.includes("evento")) return "#9b59b699";
  if (t.includes("especial")) return "#f39c1299";
  return "#34495e99";
}

// Exporta as funções para uso global
window.criarEscalaCard = criarEscalaCard;
window.getTipoCultoColor = getTipoCultoColor;