// screens/MainScreen.js
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import ExpenseItem from "../components/ExpenseItem";
import { createTable, getExpenses } from "../database/db";

export default function MainScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const loadData = async () => {
    const data = await getExpenses();
    setExpenses(data || []);
  };

  useEffect(() => {
    (async () => {
      await createTable();
      await loadData();
    })();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>EXPENSE TRACKER</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            type={item.type}
            createdAt={item.createdAt}
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddExpense")}>
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F4F4", paddingHorizontal: 16 },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: { fontSize: 32, color: "#fff", lineHeight: 32 },
});
