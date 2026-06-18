// data-service.js - Cache simples e compartilhado
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const CACHE_DURATION = 300000; // 5 minutos (bom para 20 usuários)

const cache = {
  musicas: { data: null, timestamp: 0 },
  membros: { data: null, timestamp: 0 },
  cultosFixos: { data: null, timestamp: 0 }
};

async function getCachedData(key, collectionName, sortFn = null) {
  const agora = Date.now();
  const item = cache[key];

  // Usa cache se ainda válido
  if (item.data && (agora - item.timestamp < CACHE_DURATION)) {
    return item.data;
  }

  const snapshot = await getDocs(collection(db, collectionName));
  let dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (sortFn) dados = dados.sort(sortFn);

  item.data = dados;
  item.timestamp = agora;

  return dados;
}

export async function getMusicas() {
  return getCachedData("musicas", "musicas", (a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
}

export async function getMembros() {
  return getCachedData("membros", "membrosEquipe");
}

export async function getCultosFixos() {
  return getCachedData("cultosFixos", "cultosFixos");
}

// Botão para forçar atualização quando necessário
export function limparCache() {
  Object.keys(cache).forEach(k => cache[k].data = null);
}