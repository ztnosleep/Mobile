import axios from "axios";
import { getExpenses } from "../database/db";

/**
 * Đồng bộ dữ liệu SQLite với MockAPI
 * @param {string} apiUrl - Link MockAPI của người dùng
 */
export const syncData = async (apiUrl) => {
  if (!apiUrl || !apiUrl.startsWith("http")) {
    throw new Error("Vui lòng nhập link API hợp lệ!");
  }

  try {
    // Lấy toàn bộ dữ liệu từ SQLite
    const localData = await getExpenses();

    // Xóa toàn bộ dữ liệu cũ trên API
    const existing = await axios.get(apiUrl);
    for (let item of existing.data) {
      await axios.delete(`${apiUrl}/${item.id}`);
    }

    // Gửi dữ liệu mới lên API
    for (let item of localData) {
      await axios.post(apiUrl, item);
    }

    return { success: true, count: localData.length };
  } catch (err) {
    console.error("❌ Lỗi đồng bộ:", err);
    throw new Error("Không thể đồng bộ dữ liệu!");
  }
};
