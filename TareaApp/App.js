import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      const tareaNueva = {
        id: uuid.v4(), 
        nuevaTarea: task,
        completada: false,
      };
      setTaskList([...taskList, tareaNueva]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTaskList((currentTasks) => {
      return currentTasks.map((task) => 
        task.id === taskId ? { ...task, completada: !task.completada } : task
      );
    });
  };

  const removeTask = (taskId) => {
    setTaskList((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} 
    >
      <Text style={styles.title}>Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingresa una tarea a aplicar"
          style={styles.input}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Agregar Tarea</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        style={styles.taskList} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} style={styles.taskItem}>
            <Text style={[styles.taskText, item.completada ? styles.completedTask : null]}>
              {item.nuevaTarea}
            </Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <AntDesign name='close' style={styles.deleteButton} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 40, 
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
  },
  input: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
    padding: 9,
    backgroundColor: '#fff', 
  },
  button: {
    backgroundColor: '#03bb85',
    padding: 15,
    marginLeft: -1, 
    },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#A5D6A7', 
  },
  taskText: {
    flex: 1,
    color: 'black', 
  },
  completedTask: {
    textDecorationLine: 'line-through', 
    color: 'green', 
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
