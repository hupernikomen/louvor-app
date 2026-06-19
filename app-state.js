// app-state.js - Carrega dados UMA ÚNICA VEZ e mantém em memória
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

let state = {
  musicas: null,
  membros: null,
  cultosFixos: null,
  carregadoEm: null
};

const CACHE_KEY = 'louvorAppState';
const CACHE_DURATION = 1000 * 60 * 45; // 45 minutos

function salvarNoStorage() {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      ...state,
      carregadoEm: Date.now()
    }));
  } catch(e) {}
}

function carregarDoStorage() {
  try {
    const saved = sessionStorage.getItem(CACHE_KEY);
    if (!saved) return false;
    
    const parsed = JSON.parse(saved);
    if (Date.now() - parsed.carregadoEm > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      return false;
    }

    state = { ...parsed };
    return true;
  } catch(e) {
    return false;
  }
}

async function carregarTodosDados() {
  if (state.musicas && state.membros && state.cultosFixos) {
    console.log("✅ Usando dados já carregados (app-state)");
    return;
  }

  if (carregarDoStorage()) {
    console.log("✅ Dados carregados do sessionStorage");
    return;
  }

  console.log("🔄 Carregando dados do Firebase (primeira vez)...");

  try {
    const [musicasSnap, membrosSnap, cultosSnap] = await Promise.all([
      getDocs(collection(db, "musicas")),
      getDocs(collection(db, "membrosEquipe")),
      getDocs(collection(db, "cultosFixos"))
    ]);

    state.musicas = musicasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));

    state.membros = membrosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    state.cultosFixos = cultosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    state.carregadoEm = Date.now();
    salvarNoStorage();

    console.log("✅ Dados carregados com sucesso (app-state.js)");
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    alert("Erro ao carregar dados do banco.");
  }
}

// Funções públicas
export function getMusicas() {
  return state.musicas || [];
}

export function getMembros() {
  return state.membros || [];
}

export function getCultosFixos() {
  return state.cultosFixos || [];
}

export async function refreshData() {
  state = { musicas: null, membros: null, cultosFixos: null };
  sessionStorage.removeItem(CACHE_KEY);
  await carregarTodosDados();
}

export { carregarTodosDados };