import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { getAuth, setPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';


const firebaseConfig = {
  apiKey: "AIzaSyAHzo1kpTkCRrwq2KUOwCk3_NJsUfVJMqY",
  authDomain: "louvorapp-52884.firebaseapp.com",
  projectId: "louvorapp-52884",
  storageBucket: "louvorapp-52884.firebasestorage.app",
  messagingSenderId: "333572781370",
  appId: "1:333572781370:web:59ade004bd165709db4c03"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Isso faz o login persistir mesmo após fechar o navegador
auth.setPersistence("local");   // ← Adicionado isso

export { db, auth };