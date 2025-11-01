import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { createTable, getExpenses, deleteExpense } from "../database/db";

export default function MainScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [apiUrl, setApiUrl] = useState(""); // 🔗 cho phép nhập link API tùy chọn

  const DEFAULT_API =
    "https://6832d717c3f2222a8cb3e56f.mockapi.io/Expense"; // link mặc định

  // 📦 Load dữ liệu từ SQLite
  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error("MainScreen loadExpenses error:", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  useEffect(() => {
    (async () => {
      await createTable();
      await loadExpenses();
    })();
  }, []);

  // 🔍 Tìm kiếm
  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") setFiltered(expenses);
    else {
      const lower = text.toLowerCase();
      setFiltered(expenses.filter((e) => e.title.toLowerCase().includes(lower)));
    }
  };

  // 🔄 Làm mới danh sách
  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  // ☁️ Đồng bộ dữ liệu lên MockAPI (hoặc API người dùng nhập)
  const syncData = async () => {
    const url = apiUrl.trim() || DEFAULT_API; // Nếu người dùng không nhập → dùng mặc định
    try {
      setLoading(true);
      const data = await getExpenses();

      console.log(`🔗 Đồng bộ tới: ${url}`);
      console.log(`📦 Tổng số dữ liệu: ${data.length}`);

      // 1️⃣ Xóa toàn bộ dữ liệu trên API
      const existing = await axios.get(url);
      for (const item of existing.data) {
        await axios.delete(`${url}/${item.id}`);
      }

      // 2️⃣ Gửi toàn bộ dữ liệu SQLite lên API
      for (const exp of data) {
        await axios.post(url, exp);
      }

      Alert.alert("✅ Đồng bộ thành công", `Đã gửi ${data.length} bản ghi lên API`);
    } catch (err) {
      console.error("❌ Sync error:", err);
      Alert.alert("Lỗi đồng bộ", "Không thể kết nối hoặc link API không hợp lệ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>💰 EXPENSE TRACKER</Text>

      {/* Ô nhập link API */}
      <TextInput
        style={styles.apiInput}
        placeholder="Nhập link MockAPI để đồng bộ (bỏ trống để dùng link mặc định)"
        value={apiUrl}
        onChangeText={setApiUrl}
      />

      {/* Nút đồng bộ */}
      <TouchableOpacity style={styles.syncButton} onPress={syncData}>
        <Text style={styles.syncText}>🔄 Đồng bộ dữ liệu</Text>
      </TouchableOpacity>

      {/* Ô tìm kiếm */}
      <TextInput
        style={styles.searchBox}
        placeholder="🔍 Tìm kiếm khoản thu/chi..."
        value={search}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                item.type === "Chi" ? styles.expenseItem : styles.incomeItem,
              ]}
              onPress={() =>
                navigation.navigate("EditExpense", { id: item.id })
              }
              onLongPress={() => {
                Alert.alert(
                  "Xóa khoản này?",
                  `Bạn có chắc muốn xóa "${item.title}" không?`,
                  [
                    { text: "Hủy", style: "cancel" },
                    {
                      text: "Xóa",
                      style: "destructive",
                      onPress: async () => {
                        await deleteExpense(item.id);
                        await loadExpenses();
                      },
                    },
                  ]
                );
              }}
            >
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.createdAt}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.amount}>{item.amount} đ</Text>
                <Text style={styles.type}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#aaa", marginTop: 20 }}>
              Không có dữ liệu
            </Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addButton, { bottom: 100, backgroundColor: "gray" }]}
        onPress={() => navigation.navigate("Trash")}
      >
        <Text style={styles.addText}>🗑️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  apiInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  syncButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  syncText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  incomeItem: { backgroundColor: "#E8F5E9" },
  expenseItem: { backgroundColor: "#FFEBEE" },
  title: { fontSize: 16, fontWeight: "bold" },
  amount: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 12, color: "#555" },
  type: { fontSize: 12, color: "#888" },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#FFF", fontSize: 30, fontWeight: "bold" },
});
