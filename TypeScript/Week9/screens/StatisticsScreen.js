import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getExpenses } from "../database/db";

export default function StatisticsScreen() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState({ thu: 0, chi: 0 });

  const loadData = async () => {
    setLoading(true);
    const data = await getExpenses();

    if (!data || data.length === 0) {
      setChartData(null);
      setSummary({ thu: 0, chi: 0 });
      setLoading(false);
      return;
    }

    const grouped = {};
    let totalThu = 0;
    let totalChi = 0;

    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (!grouped[month]) grouped[month] = { Thu: 0, Chi: 0 };

      const amount = Number(item.amount);
      if (item.type === "Thu") {
        grouped[month].Thu += amount;
        totalThu += amount;
      } else {
        grouped[month].Chi += amount;
        totalChi += amount;
      }
    });

    const labels = Object.keys(grouped);
    const thuData = labels.map((m) => grouped[m].Thu);
    const chiData = labels.map((m) => grouped[m].Chi);

    setChartData({ labels, thuData, chiData });
    setSummary({ thu: totalThu, chi: totalChi });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const width = Dimensions.get("window").width - 20;
  const net = summary.thu - summary.chi;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>📊 Biểu đồ thống kê Thu / Chi</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 30 }} />
        ) : !chartData ? (
          <Text style={styles.noData}>Không có dữ liệu để hiển thị</Text>
        ) : (
          <>
            {/* Tổng hợp */}
            <View style={styles.summaryRow}>
              <View style={[styles.card, { backgroundColor: "#E8F5E9" }]}>
                <Text style={styles.cardTitle}>Tổng Thu</Text>
                <Text style={[styles.cardValue, { color: "#4CAF50" }]}>
                  {summary.thu.toLocaleString()} đ
                </Text>
              </View>
              <View style={[styles.card, { backgroundColor: "#FFEBEE" }]}>
                <Text style={styles.cardTitle}>Tổng Chi</Text>
                <Text style={[styles.cardValue, { color: "#F44336" }]}>
                  {summary.chi.toLocaleString()} đ
                </Text>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: "#E3F2FD" }]}>
              <Text style={styles.cardTitle}>Chênh lệch</Text>
              <Text
                style={[
                  styles.cardValue,
                  { color: net >= 0 ? "#4CAF50" : "#F44336" },
                ]}
              >
                {net.toLocaleString()} đ
              </Text>
            </View>

            {/* Biểu đồ đường */}
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      data: chartData.thuData,
                      color: () => "#4CAF50",
                      strokeWidth: 3,
                    },
                    {
                      data: chartData.chiData,
                      color: () => "#F44336",
                      strokeWidth: 3,
                    },
                  ],
                  legend: ["Thu 💰", "Chi 💸"],
                }}
                width={width}
                height={280}
                yAxisSuffix="đ"
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: {
                    r: "5",
                    strokeWidth: "2",
                    stroke: "#fff",
                  },
                }}
                bezier
                style={styles.chart}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 6,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    alignItems: "center",
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#555" },
  cardValue: { fontSize: 18, fontWeight: "bold", marginTop: 6 },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  chart: {
    borderRadius: 16,
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
  },
});
