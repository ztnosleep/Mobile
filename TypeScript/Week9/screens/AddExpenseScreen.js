// screens/AddExpenseScreen.js
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { addExpense } from "../database/db";

export default function AddExpenseScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Thu");

  const titleRef = useRef(null);
  const amountRef = useRef(null);

  const handleSave = async () => {
    // Kiểm tra dữ liệu nhập vào
    if (!title.trim() || !amount.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Lỗi", "Số tiền không hợp lệ!");
      return;
    }

    // Gọi hàm thêm vào DB
    await addExpense(title.trim(), parsedAmount, type);

    // Clear input (dùng useRef)
    titleRef.current.clear();
    amountRef.current.clear();
    setTitle("");
    setAmount("");
    setType("Thu");

    Alert.alert("Thành công", "Đã thêm khoản mới!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Thêm Khoản Mới</Text>

      <TextInput
        ref={titleRef}
        style={styles.input}
        placeholder="Tên khoản"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        ref={amountRef}
        style={styles.input}
        placeholder="Số tiền"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === "Thu" && styles.active]}
          onPress={() => setType("Thu")}
        >
          <Text style={styles.typeText}>Thu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, type === "Chi" && styles.active]}
          onPress={() => setType("Chi")}
        >
          <Text style={styles.typeText}>Chi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>💾 Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅ Quay lại</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  typeContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 20,
  },
  active: { backgroundColor: "#4CAF50" },
  typeText: { color: "#333", fontWeight: "600" },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  backButton: { marginTop: 10, alignItems: "center" },
  backText: { color: "#555", fontSize: 16 },
});
