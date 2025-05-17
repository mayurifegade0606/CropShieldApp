import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const PestsDiseasesScreen = () => {
  return (

      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>
          <FontAwesome5 name="bug" size={22} color="#dc2626" /> Potato Health & Diseases
        </Text>
  
        {/* Healthy Potato Card */}
        <View style={[styles.card, styles.healthyCard]}>
          <Text style={styles.diseaseTitle}>✅ Healthy Potato Plant</Text>
          <Text style={styles.text}>
            A healthy potato plant has strong green leaves, firm stems, and grows upright. No spots, wilting, or mold should be present.
          </Text>
  
          <Text style={styles.sectionTitle}>🌱 Tips to Keep It Healthy</Text>
          <Text style={styles.text}>
            - Ensure proper drainage and avoid waterlogging{'\n'}
            - Use certified disease-free seeds{'\n'}
            - Apply balanced fertilizers as per need{'\n'}
            - Inspect regularly for early signs of pests/disease
          </Text>
        </View>
  
        {/* Early Blight Card */}
        <View style={styles.card}>
          <Text style={styles.diseaseTitle}>🥔 Early Blight</Text>
          <Text style={styles.sectionTitle}>🔍 Description</Text>
          <Text style={styles.text}>
            Early blight is a common potato disease caused by the fungus *Alternaria solani*. It thrives in warm, humid conditions.
          </Text>
  
          <Text style={styles.sectionTitle}>⚠️ Symptoms</Text>
          <Text style={styles.text}>
            - Dark brown or black concentric spots on older leaves{'\n'}
            - Leaf yellowing and drop{'\n'}
            - Reduced yield if untreated
          </Text>
  
          <Text style={styles.sectionTitle}>💡 Recommendations</Text>
          <Text style={styles.text}>
            - Rotate crops and avoid planting potatoes in the same spot every year{'\n'}
            - Use resistant potato varieties if available{'\n'}
            - Apply fungicides like Mancozeb or Chlorothalonil at the early stage
          </Text>
        </View>
  
        {/* Late Blight Card */}
        <View style={styles.card}>
          <Text style={styles.diseaseTitle}>🥔 Late Blight</Text>
          <Text style={styles.sectionTitle}>🔍 Description</Text>
          <Text style={styles.text}>
            Caused by *Phytophthora infestans*, late blight spreads rapidly in cool, wet conditions and can destroy an entire crop.
          </Text>
  
          <Text style={styles.sectionTitle}>⚠️ Symptoms</Text>
          <Text style={styles.text}>
            - Large, dark, water-soaked lesions on leaves and stems{'\n'}
            - White mold on leaf undersides in humid weather{'\n'}
            - Tuber rot in storage
          </Text>
  
          <Text style={styles.sectionTitle}>💡 Recommendations</Text>
          <Text style={styles.text}>
            - Monitor weather and act fast when conditions are favorable for blight{'\n'}
            - Remove infected plants immediately{'\n'}
            - Apply systemic fungicides like Metalaxyl or Copper oxychloride
          </Text>
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f4f6',
      padding: 16,
    },
    pageTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#1e293b',
      textAlign: 'center',
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 18,
      marginBottom: 20,
      elevation: 3,
    },
    healthyCard: {
      borderLeftWidth: 5,
      borderLeftColor: '#16a34a',
    },
    diseaseTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#16a34a',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#1e40af',
    },
    text: {
      fontSize: 14,
      color: '#374151',
      marginTop: 6,
      lineHeight: 20,
    },
  });
  
  export default PestsDiseasesScreen;