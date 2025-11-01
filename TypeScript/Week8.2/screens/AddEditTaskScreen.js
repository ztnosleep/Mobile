"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function AddEditTaskScreen({ navigation, route }) {
  const [jobInput, setJobInput] = useState("")
  const mode = route.params?.mode || "add"
  const task = route.params?.task || null
  const userName = route.params?.userName || "Twinkle"

  useEffect(() => {
    if (mode === "edit" && task) {
      setJobInput(task.title)
    }
  }, [mode, task])

  const handleFinish = () => {
    if (jobInput.trim()) {
      if (mode === "add") {
        route.params?.onAddTask?.(jobInput)
      } else {
        route.params?.onEditTask?.(task.id, jobInput)
      }
      navigation.goBack()
    }
  }

  const title = mode === "add" ? "ADD YOUR JOB" : "EDIT YOUR JOB"

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        {/* Header with Back Button and Profile */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.avatar} />
            <View style={styles.profileText}>
              <Text style={styles.greeting}>Hi {userName}</Text>
              <Text style={styles.subtitle}>Have agrate day a head</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="briefcase-outline" size={20} color="#00BCD4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Input your job"
                placeholderTextColor="#999"
                value={jobInput}
                onChangeText={setJobInput}
              />
            </View>
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={handleFinish} activeOpacity={0.8}>
              <Text style={styles.buttonText}>FINISH →</Text>
            </TouchableOpacity>
          </View>

          {/* Decorative Illustration */}
          <View style={styles.illustrationSection}>
            <Image source={{ uri: "https://via.placeholder.com/150x150?text=Notes" }} style={styles.illustration} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  profileSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#E0E0E0",
  },
  profileText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
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
    marginBottom: 40,
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
  illustrationSection: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  illustration: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
})
