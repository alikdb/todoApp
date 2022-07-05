import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'; 
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (task.length < 5) {
      Alert.alert("Oops!", "Task must be at least 5 characters long.", [{text: "OK"}]);
    }else {
      setTaskItems([task, ...taskItems]);
      setTask(null);
    }
  }

  const completeTask = (index) => {
    
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);

  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <ScrollView style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)} >
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding": "height"}
      style={styles.writeTaskWrapper}
      >

      <TextInput style={styles.input} placeholder={`Write a task`} value={task} onChangeText={(text) => setTask(text)} />
      <TouchableOpacity disabled={task ? false : true} onPress={() => handleAddTask() }>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED', 
  },
  taskWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
    marginBottom: 130
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFf',
    width: 280,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
  },
  addText: {
    fontSize: 24,
    color: '#C0C0C0',
  },
});
