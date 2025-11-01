import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Tiêu đề */}
        <View style={styles.header}>
          <Text style={styles.title}>EXPENSE TRACKER</Text>
        </View>

        {/* Nội dung chính */}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.placeholder}>Danh sách chi tiêu sẽ hiển thị ở đây</Text>

          {/* Nút thêm mới */}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addText}>+ Thêm chi tiêu</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  placeholder: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
