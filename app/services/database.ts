// services/database.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('relatos.db');

export function criarTabela() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS relatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        categoria TEXT,
        endereco TEXT,
        data TEXT,
        latitude REAL,
        longitude REAL,
        fotos TEXT
      );`
    );
  });
}

export function inserirRelato(relato: {
  titulo: string;
  categoria: string;
  endereco: string;
  data: string;
  latitude: number;
  longitude: number;
  fotos: string[];
}) {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO relatos (titulo, categoria, endereco, data, latitude, longitude, fotos) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        relato.titulo,
        relato.categoria,
        relato.endereco,
        relato.data,
        relato.latitude,
        relato.longitude,
        JSON.stringify(relato.fotos),
      ]
    );
  });
}

export function buscarRelatos(callback: (data: any[]) => void) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM relatos ORDER BY data DESC;',
      [],
      (_, { rows }) => callback(rows._array)
    );
  });
}
