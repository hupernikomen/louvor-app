// ================================================
// escala-card.js - Apenas lógica do card (CSS está nos HTMLs)
// ================================================

function getTipoCultoColor(tipo) {
  const t = (tipo || "").toLowerCase().trim();
  if (t.includes("louvor") || t.includes("pregação")) return "#f3707099";
  if (t.includes("oração") || t.includes("doutrina")) return "#2b86a499";
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
    ? `<div class="observacoes">${escala.observacoes}</div>` 
    : '';

  const botoesHTML = (onAprovar || onEditar) ? `
    <div class="btn-group">
      ${onAprovar ? `<button onclick="${onAprovar}" class="btn-aprovar">APROVAR</button>` : ''}
      ${onEditar ? `<button onclick="${onEditar}" class="btn-editar">EDITAR</button>` : ''}
    </div>` : '';

  const headerHTML = (onAprovar || onEditar) 
    ? `<h3>${escala.tipoCulto || 'Culto'} - ${dataFormatada}</h3>`
    : `
      <span class="tipo-culto" style="color: ${corBadge};">${escala.tipoCulto || 'Culto'}</span>
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

window.criarEscalaCard = criarEscalaCard;
window.getTipoCultoColor = getTipoCultoColor;