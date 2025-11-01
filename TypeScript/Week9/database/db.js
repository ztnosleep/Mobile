import * as SQLite from "expo-sqlite";

// 🔥 Phải dùng cú pháp này thay vì openDatabase
const db = SQLite.openDatabaseSync("expenses.db");

export const createTable = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount REAL,
      type TEXT,
      createdAt TEXT
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS trash (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount REAL,
      type TEXT,
      createdAt TEXT,
      deletedAt TEXT
    );
  `);
};

export const getExpenses = async () => {
  const result = await db.getAllAsync("SELECT * FROM expenses ORDER BY id DESC");
  return result;
};

export const addExpense = async (title, amount, type) => {
  await db.runAsync(
    "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, datetime('now'))",
    [title, amount, type]
  );
};

export const updateExpense = async (id, title, amount, type) => {
  await db.runAsync(
    "UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?",
    [title, amount, type, id]
  );
};

// 🗑️ Chuyển sang trash + xóa khỏi expenses
export const deleteExpense = async (id) => {
  const item = await db.getFirstAsync("SELECT * FROM expenses WHERE id = ?", [id]);
  if (item) {
    await db.runAsync(
      "INSERT INTO trash (title, amount, type, createdAt, deletedAt) VALUES (?, ?, ?, ?, datetime('now'))",
      [item.title, item.amount, item.type, item.createdAt]
    );
    await db.runAsync("DELETE FROM expenses WHERE id = ?", [id]);
  }
};

export const getTrash = async () => {
  const result = await db.getAllAsync("SELECT * FROM trash ORDER BY deletedAt DESC");
  return result;
};
export const restoreExpense = async (id) => {
  const item = await db.getFirstAsync("SELECT * FROM trash WHERE id = ?", [id]);
  if (item) {
    await db.runAsync(
      "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?)",
      [item.title, item.amount, item.type, item.createdAt]
    );
    await db.runAsync("DELETE FROM trash WHERE id = ?", [id]);
  }
};
export const getAllExpenses = async () => {
  const result = await db.getAllAsync("SELECT * FROM expenses");
  return result || [];
};
