"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const DEFAULT_TASKS = [
  { id: "1", title: "To check email", completed: true },
  { id: "2", title: "UI task web page", completed: true },
  { id: "3", title: "Learn javascript basic", completed: true },
  { id: "4", title: "Learn HTML Advance", completed: true },
  { id: "5", title: "Medical App UI", completed: true },
  { id: "6", title: "Learn Java", completed: true },
]

export default function TaskListScreen({ navigation, route }) {
  const [tasks, setTasks] = useState(DEFAULT_TASKS)
  const [searchQuery, setSearchQuery] = useState("")
  const userName = route.params?.userName || "Twinkle"

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddTask = () => {
    navigation.navigate("AddEditTask", {
      mode: "add",
      userName: userName,
      onAddTask: (jobTitle) => {
        const newTask = {
          id: String(tasks.length + 1),
          title: jobTitle,
          completed: false,
        }
        setTasks([...tasks, newTask])
      },
    })
  }

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((t) => t.id === taskId)
    if (taskToEdit) {
      navigation.navigate("AddEditTask", {
        mode: "edit",
        task: taskToEdit,
        userName: userName,
        onEditTask: (id, newTitle) => {
          setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)))
        },
      })
    }
  }

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskContent}>
        <View style={styles.checkboxContainer}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
        </View>
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEditTask(item.id)}>
        <MaterialCommunityIcons name="pencil" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tasks List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
        style={styles.tasksList}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddTask} activeOpacity={0.8}>
        <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000",
  },
  tasksList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#00BCD4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
