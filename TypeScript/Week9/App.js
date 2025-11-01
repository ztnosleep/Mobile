import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import EditExpenseScreen from "./screens/EditExpenseScreen";
import AddScreen from "./screens/AddExpenseScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "Expense Tracker" }}
        />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen
          name="EditExpense"
          component={EditExpenseScreen}
          options={{ title: "Sửa khoản Thu/Chi" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
