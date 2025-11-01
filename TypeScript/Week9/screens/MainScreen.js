// screens/MainScreen.js
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, Text, StyleSheet } from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { createTable, insertSampleData, getExpenses } from "../database/db";

export default function MainScreen() {
  const [expenses, setExpenses] = useState([]);

  const loadData = async () => {
    const data = await getExpenses();
    setExpenses(data || []);
  };

  useEffect(() => {
    (async () => {
      await createTable();
      await insertSampleData(); // chỉ để test
      await loadData();
    })();
  }, []);

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
});
