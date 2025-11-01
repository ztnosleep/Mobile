// components/ExpenseItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ExpenseItem({ title, amount, type, createdAt }) {
  const isIncome = type === "Thu";

  return (
    <View style={[styles.item, isIncome ? styles.income : styles.expense]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.amount, isIncome ? styles.incomeText : styles.expenseText]}>
          {isIncome ? "+" : "-"} {amount.toLocaleString("vi-VN")} ₫
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.date}>{createdAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    elevation: 2,
  },
  income: { borderLeftColor: "#4CAF50", borderLeftWidth: 5 },
  expense: { borderLeftColor: "#E53935", borderLeftWidth: 5 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  amount: { fontSize: 16, fontWeight: "bold" },
  incomeText: { color: "#4CAF50" },
  expenseText: { color: "#E53935" },
  type: { fontSize: 14, color: "#777" },
  date: { fontSize: 12, color: "#999" },
});
