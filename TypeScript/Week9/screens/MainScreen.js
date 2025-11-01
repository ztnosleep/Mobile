// screens/MainScreen.js
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
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { createTable, getExpenses, deleteExpense } from "../database/db";

export default function MainScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await getExpenses();
      setExpenses(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error("MainScreen loadExpenses error:", err);
    } finally {
      setLoading(false);
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

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") {
      setFiltered(expenses);
    } else {
      const lower = text.toLowerCase();
      const result = expenses.filter((e) =>
        e.title.toLowerCase().includes(lower)
      );
      setFiltered(result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>💰 EXPENSE TRACKER</Text>

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
