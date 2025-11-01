// screens/TrashScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getTrash } from "../database/db";

export default function TrashScreen() {
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTrash = async () => {
    setLoading(true);
    try {
      const data = await getTrash();
      setTrash(data || []);
    } catch (err) {
      console.error("loadTrash error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrash();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🗑️ Thùng rác</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={trash}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>
                {item.amount} đ - {item.type}
              </Text>
              <Text style={styles.date}>
                Xóa lúc: {item.deletedAt?.replace("T", " ")}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888" }}>
              Không có khoản nào bị xóa
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", margin: 12 },
  item: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  sub: { color: "#555" },
  date: { color: "#888", fontSize: 12 },
});
