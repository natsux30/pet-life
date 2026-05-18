const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    return { usuarios: [], pets: [], produtos: [], pedidos: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = {
  getAll: (col) => readDB()[col] || [],
  getById: (col, id) => readDB()[col]?.find(i => i.id === id) || null,
  insert: (col, item) => {
    const db = readDB();
    db[col].push(item);
    writeDB(db);
    return item;
  },
  update: (col, id, updates) => {
    const db = readDB();
    const idx = db[col].findIndex(i => i.id === id);
    if (idx !== -1) {
      db[col][idx] = { ...db[col][idx], ...updates, id };
      writeDB(db);
      return db[col][idx];
    }
    return null;
  },
  delete: (col, id) => {
    const db = readDB();
    db[col] = db[col].filter(i => i.id !== id);
    writeDB(db);
    return true;
  },
  find: (col, fn) => readDB()[col]?.filter(fn) || []
};