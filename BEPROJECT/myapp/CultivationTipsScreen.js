// screens/CultivationTipsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const tasks = [
  { id: 1, name: 'Plant Selection' },
  { id: 2, name: 'Planting' },
  { id: 3, name: 'Plant Training' },
  { id: 4, name: 'Monitoring' },
  { id: 5, name: 'Site Selection' },
  { id: 6, name: 'Field Preparation' },
  { id: 7, name: 'Fertilization Organic' },
  { id: 8, name: 'Fertilization Chemical' },
  { id: 9, name: 'Preventive Measure' },
  { id: 10, name: 'Plant Protection Chemical' },
  { id: 11, name: 'Plant Protection Organic' },
  { id: 12, name: 'Harvesting' },
  { id: 13, name: 'Post Harvest' },
];

const CultivationTipsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cultivation Tips</Text>
      {tasks.map((task) => (
        <TouchableOpacity key={task.id} style={styles.taskItem}>
          <Text style={styles.taskText}>{task.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
});

export default CultivationTipsScreen;