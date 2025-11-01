import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getTrash, restoreExpense } from "../database/db";

export default function TrashScreen() {
  const [trash, setTrash] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const loadTrash = async () => {
    setLoading(true);
    try {
      const data = await getTrash();
      setTrash(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error("loadTrash error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrash();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") setFiltered(trash);
    else {
      const lower = text.toLowerCase();
      setFiltered(trash.filter((e) => e.title.toLowerCase().includes(lower)));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTrash();
    setRefreshing(false);
  };

  const handleRestore = (item) => {
    Alert.alert(
      "Khôi phục khoản này?",
      `Bạn có muốn khôi phục "${item.title}" không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Khôi phục",
          onPress: async () => {
            await restoreExpense(item.id);
            await loadTrash(); // refresh lại sau khi khôi phục
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🗑️ Thùng rác</Text>

      <TextInput
        style={styles.searchBox}
        placeholder="🔍 Tìm kiếm khoản đã xóa..."
        value={search}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleRestore(item)}
              style={styles.item}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.amount}>{item.amount} đ</Text>
              <Text style={styles.date}>Đã xóa: {item.deletedAt}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#aaa", marginTop: 20 }}>
              Không có dữ liệu đã xóa
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 16 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", margin: 12 },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  amount: { fontSize: 14, color: "#555" },
  date: { fontSize: 12, color: "#999" },
});
