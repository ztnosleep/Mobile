// database/db.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("expenses_v1.db");

export async function createTable() {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        amount REAL,
        type TEXT,
        createdAt TEXT
      );
    `);
    console.log("createTable: done");
  } catch (error) {
    console.error("createTable error:", error);
  }
}

export async function addExpense(title, amount, type) {
  try {
    const createdAt = new Date().toLocaleString("vi-VN");
    await db.runAsync(
      "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?);",
      [title, amount, type, createdAt]
    );
    console.log("addExpense: success");
  } catch (err) {
    console.error("addExpense error:", err);
  }
}

export async function getExpenses() {
  try {
    const rows = await db.getAllAsync("SELECT * FROM expenses ORDER BY id DESC;");
    return rows;
  } catch (err) {
    console.error("getExpenses error:", err);
    return [];
  }
}

export async function getExpenseById(id) {
  try {
    const rows = await db.getAllAsync("SELECT * FROM expenses WHERE id = ?;", [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("getExpenseById error:", err);
    return null;
  }
}

export async function updateExpense(id, title, amount, type) {
  try {
    await db.runAsync(
      "UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?;",
      [title, amount, type, id]
    );
    console.log("updateExpense: success");
    return true;
  } catch (err) {
    console.error("updateExpense error:", err);
    return false;
  }
}

export default db;
