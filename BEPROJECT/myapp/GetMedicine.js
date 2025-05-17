import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

const GetMedicine = ({ route }) => {
  const { disease } = route.params;

  // Medicines, pesticides, and product links for potato diseases
  const diseaseData = {
    'Early Blight': {
      medicines: [
        { name: 'Chlorothalonil', link: 'https://www.amazon.com/s?k=Chlorothalonil' },
        { name: 'Mancozeb', link: 'https://www.amazon.com/s?k=Mancozeb' },
        { name: 'Copper Oxychloride', link: 'https://www.amazon.com/s?k=Copper+Oxychloride' },
      ],
      pesticides: [
        { name: 'Dithane M-45', link: 'https://www.amazon.com/s?k=Dithane+M-45' },
        { name: 'Bravo Weather Stik', link: 'https://www.amazon.com/s?k=Bravo+Weather+Stik' },
      ],
    },
    'Late Blight': {
      medicines: [
        { name: 'Metalaxyl', link: 'https://www.amazon.com/s?k=Metalaxyl' },
        { name: 'Cymoxanil', link: 'https://www.amazon.com/s?k=Cymoxanil' },
        { name: 'Dimethomorph', link: 'https://www.amazon.com/s?k=Dimethomorph' },
      ],
      pesticides: [
        { name: 'Ridomil Gold', link: 'https://www.amazon.com/s?k=Ridomil+Gold' },
        { name: 'Curzate M8', link: 'https://www.amazon.com/s?k=Curzate+M8' },
      ],
    },
    Healthy: {
      medicines: [{ name: 'No medicines required', link: '' }],
      pesticides: [{ name: 'No pesticides required', link: '' }],
    },
  };

  const data = diseaseData[disease] || {
    medicines: [{ name: 'No data available', link: '' }],
    pesticides: [{ name: 'No data available', link: '' }],
  };

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Disease: {disease}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Medicines:</Text>
        {data.medicines.map((medicine, index) => (
          <TouchableOpacity key={index} onPress={() => openLink(medicine.link)}>
            <Text style={styles.linkItem}>- {medicine.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Pesticides:</Text>
        {data.pesticides.map((pesticide, index) => (
          <TouchableOpacity key={index} onPress={() => openLink(pesticide.link)}>
            <Text style={styles.linkItem}>- {pesticide.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  linkItem: {
    fontSize: 16,
    color: '#1d4ed8',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
});

export default GetMedicine;