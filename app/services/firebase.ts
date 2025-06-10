// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmEXVbGaUO5CYYioxA1E2x-PO_8Fnatq4",
  authDomain: "cidade-plus-f1a70.firebaseapp.com",
  projectId: "cidade-plus-f1a70",
  storageBucket: "cidade-plus-f1a70.appspot.com", // <- Correção aqui
  messagingSenderId: "50764857728",
  appId: "1:50764857728:web:174b0cfee85152470ac165",
  measurementId: "G-16VVJCTSP9"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore para uso em outras partes do app
export const db = getFirestore(app);
