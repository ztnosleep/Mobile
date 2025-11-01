"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function ManageTaskScreen({ navigation }) {
  const [name, setName] = useState("")

  const handleGetStarted = () => {
    if (name.trim()) {
      navigation.navigate("TaskList", { userName: name })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerText}>MANAGE YOUR</Text>
            <Text style={styles.headerText}>TASK</Text>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="envelope-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted} activeOpacity={0.8}>
              <Text style={styles.buttonText}>GET STARTED →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#7C3AED",
    textAlign: "center",
    letterSpacing: 1,
  },
  inputSection: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000",
  },
  buttonSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00BCD4",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
})
