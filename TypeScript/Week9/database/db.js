// database/db.js
import * as SQLite from "expo-sqlite";

// ✅ Mở database (phiên bản mới Expo SDK 51+)
const db = SQLite.openDatabaseSync("expenses_v2.db");

// Tạo bảng (nếu chưa có)
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
    console.log("✅ Database table created");
  } catch (error) {
    console.error("createTable error:", error);
  }
}

// Thêm dữ liệu mẫu (test)
export async function insertSampleData() {
  try {
    await db.runAsync(
      "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?)",
      ["Tiền lương", 10000000, "Thu", "2025-10-31"]
    );
    await db.runAsync(
      "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?)",
      ["Mua cà phê", 45000, "Chi", "2025-10-31"]
    );
    console.log("✅ Sample data inserted");
  } catch (error) {
    console.error("insertSampleData error:", error);
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
