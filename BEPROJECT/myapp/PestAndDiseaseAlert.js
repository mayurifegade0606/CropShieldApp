import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Function to format the current date in MM-DD-YYYY – HH:MM AM/PM format
const getFormattedDate = () => {
  const currentDate = new Date();
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return currentDate.toLocaleString('en-US', options);
};

const PestAndDiseaseAlert = () => {
    const alerts = [
        {
          title: 'Late Blight Risk ⚠️',
          time: getFormattedDate(), // Use dynamic date here
          message: 'High humidity and rainfall expected. Conditions favorable for Late Blight spread.',
          icon: 'cloud-showers-heavy',
        },
        {
          title: 'Early Blight Prevention 🌤️',
          time: getFormattedDate(), // Use dynamic date here
          message: 'Dry spells ahead. Good time to apply preventive fungicide like Mancozeb.',
          icon: 'sun',
        },
        {
          title: 'General Alert 🔍',
          time: getFormattedDate(), // Use dynamic date here
          message: 'Inspect leaves for brown spots. Report any early blight symptoms immediately.',
          icon: 'exclamation-triangle',
        },
      ];
    
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.header}>
            <FontAwesome5 name="exclamation-circle" size={22} color="#dc2626" /> Alerts & Warnings
          </Text>
    
          {alerts.map((alert, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name={alert.icon} size={20} color="#f87171" style={{ marginRight: 10 }} />
                <Text style={styles.title}>{alert.title}</Text>
              </View>
              <Text style={styles.time}>
                <MaterialIcons name="schedule" size={14} /> {alert.time}
              </Text>
              <Text style={styles.message}>{alert.message}</Text>
            </View>
          ))}
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fefce8',
        padding: 16,
      },
      header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1c1917',
        textAlign: 'center',
        marginBottom: 20,
      },
      card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 15,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: '#f87171',
      },
      cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b91c1c',
      },
      time: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 8,
      },
      message: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
      },
    });
export default PestAndDiseaseAlert;