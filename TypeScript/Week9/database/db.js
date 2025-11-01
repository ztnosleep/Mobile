// database/db.js
import * as SQLite from "expo-sqlite";

// ✅ Mở database (Expo SDK 51+)
const db = SQLite.openDatabaseSync("expenses_v2.db");

// Tạo bảng
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
    console.log("✅ Table ready");
  } catch (error) {
    console.error("createTable error:", error);
  }
}

// Thêm khoản mới
export async function addExpense(title, amount, type) {
  try {
    const date = new Date().toISOString().split("T")[0];
    await db.runAsync(
      "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?)",
      [title, amount, type, date]
    );
    console.log("✅ Expense added:", title);
  } catch (error) {
    console.error("addExpense error:", error);
  }
}

// Lấy toàn bộ dữ liệu
export async function getExpenses() {
  try {
    const rows = await db.getAllAsync("SELECT * FROM expenses ORDER BY id DESC;");
    return rows;
  } catch (error) {
    console.error("getExpenses error:", error);
    return [];
  }
}

export default db;
