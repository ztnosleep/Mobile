// screens/EditScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getExpenseById, updateExpense } from "../database/db";

export default function EditScreen({ route, navigation }) {
  const { id } = route.params;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Thu");

  useEffect(() => {
    (async () => {
      const item = await getExpenseById(id);
      if (item) {
        setTitle(item.title);
        setAmount(String(item.amount));
        setType(item.type);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ thông tin!");
      return;
    }
    await updateExpense(id, title.trim(), parseFloat(amount), type);
    Alert.alert("Thành công", "Đã cập nhật khoản chi!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>✏️ Sửa khoản Thu/Chi</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên khoản..."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tiền..."
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === "Thu" && styles.activeType]}
          onPress={() => setType("Thu")}
        >
          <Text style={styles.typeText}>Thu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, type === "Chi" && styles.activeType]}
          onPress={() => setType("Chi")}
        >
          <Text style={styles.typeText}>Chi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>💾 Lưu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  typeButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginHorizontal: 10,
  },
  activeType: { backgroundColor: "#4CAF50" },
  typeText: { color: "#333", fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
