import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FertilizerCalculator = () => {
  const [treeCount, setTreeCount] = useState(1);

  const increment = () => setTreeCount(treeCount + 1);
  const decrement = () => {
    if (treeCount > 1) setTreeCount(treeCount - 1);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>
          <FontAwesome5 name="tree" size={20} color="#10b981" /> Welcome to Fertilizer Buddy
        </Text>
        <Text style={styles.welcomeText}>
          Calculate how much fertilizer your trees need per year. Simply select the number of trees and get recommended values instantly!
        </Text>
      </View>

      {/* Tree Counter */}
      <View style={styles.treeCounterContainer}>
        <TouchableOpacity onPress={decrement} style={styles.counterButton}>
          <MaterialIcons name="remove" size={22} color="#1e40af" />
        </TouchableOpacity>
        <Text style={styles.treeCount}>{treeCount}</Text>
        <TouchableOpacity onPress={increment} style={styles.counterButton}>
          <MaterialIcons name="add" size={22} color="#1e40af" />
        </TouchableOpacity>
      </View>
      <Text style={styles.treeLabel}>How many trees are you fertilizing?</Text>

      <Text style={styles.fertilizerTitle}>
        Recommended fertilizer amounts for {treeCount} tree(s):
      </Text>

      {/* Option 1 */}
      <View style={styles.optionCard}>
        <Text style={styles.optionTitle}>
          <FontAwesome5 name="leaf" size={18} color="#10b981" /> MOP / TSP / Urea
        </Text>
        <Text style={styles.optionText}>🌾 MOP: {500 * treeCount} g</Text>
        <Text style={styles.optionText}>🧪 TSP: {217 * treeCount} g</Text>
        <Text style={styles.optionText}>🌿 Urea: {435 * treeCount} g</Text>
      </View>

      {/* Option 2 */}
      <View style={styles.optionCard}>
        <Text style={styles.optionTitle}>
          <FontAwesome5 name="seedling" size={18} color="#10b981" /> DAP / MOP / Urea
        </Text>
        <Text style={styles.optionText}>🧬 DAP: {217 * treeCount} g</Text>
        <Text style={styles.optionText}>🌾 MOP: {500 * treeCount} g</Text>
        <Text style={styles.optionText}>🌿 Urea: {350 * treeCount} g</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  welcomeCard: {
    backgroundColor: '#e0f2f1',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#047857',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  treeCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  counterButton: {
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  treeCount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 30,
    color: '#111827',
  },
  treeLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 10,
  },
  fertilizerTitle: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 6,
  },
});

export default FertilizerCalculator;
