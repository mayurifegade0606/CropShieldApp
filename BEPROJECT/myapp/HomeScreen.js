import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [temperature, setTemperature] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState('');
  const [loading, setLoading] = useState(false); // Updated to handle image upload
  const [image, setImage] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [disease, setDisease] = useState('');

  const FLASK_SERVER_URL = 'http://192.168.213.86:5000/api/predict'; // Replace with your Flask server IP

  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const latitude = 37.7749;
        const longitude = -122.4194;
        const apiKey = 'b2338b2a053f67fcc5618a228cafad3b';

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setTemperature(26);
        setWeatherDescription(data.weather[0].description);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        Alert.alert('Error', error.message);
      }
    };

    const setDate = () => {
      const date = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'short' };
      setCurrentDate(date.toLocaleDateString('en-US', options));
    };

    fetchWeatherData();
    setDate();
  }, []);
  const getWeatherStyle = () => {
    if (temperature >= 30) {
      return { backgroundColor: '#ffcccc', color: 'red' };
    } else if (temperature >= 20) {
      return { backgroundColor: '#fff0b3', color: '#ff8c00' };
    } else {
      return { backgroundColor: '#cce5ff', color: '#007bff' };
    }
  };

  const handleImageSelection = () => {
    Alert.alert('Select Image', 'Choose an option', [
      { text: 'Camera', onPress: takePicture },
      { text: 'Gallery', onPress: pickImageFromGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Enable camera permissions in settings.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0]);
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Enable gallery permissions in settings.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (image) => {
    setLoading(true); // Show loading spinner
    let formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'crop_image.jpg',
    });

    try {
      console.log('Uploading image to Flask:', image.uri); // Debugging log
      const response = await axios.post(FLASK_SERVER_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response from Flask:', response.data); // Debugging log
      setDisease(response.data.disease || 'No disease detected');
    } catch (error) {
      console.error('Upload error:', error.message);
      Alert.alert('Upload Failed', 'Check if the Flask server is running.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cropList}>
        <View style={styles.iconContainer}>
          <Icon name="emoji-nature" size={35} color="#ffcc00" />
        </View>
        <View style={styles.iconContainer}>
          <Icon name="eco" size={35} color="orange" />
        </View>
        <View style={styles.iconContainer}>
          <Icon name="spa" size={35} color="purple" />
        </View>
        <View style={styles.iconContainer}>
          <Icon name="grass" size={35} color="green" />
        </View>
      </View>

      <View style={{ alignItems: 'center', padding: 20 }}>
        {temperature === null ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={[getWeatherStyle(), { padding: 20, borderRadius: 10, width: 300 }]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{currentDate}</Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {temperature ? `${temperature}°C` : 'No data'}
            </Text>
            <Text style={{ fontSize: 18 }}>{weatherDescription || 'No description'}</Text>
          </View>
        )}
      </View>

      <View style={styles.diagnosisContainer}>
        <Text style={styles.heading}>Heal your crop</Text>
        <View style={styles.diagnosisSteps}>
          <View style={styles.step}>
            <Icon name="camera-alt" size={30} color="green" />
            <Text>Take a picture</Text>
          </View>
          <View style={styles.step}>
            <Icon name="book" size={30} color="green" />
            <Text>See diagnosis</Text>
          </View>
          <View style={styles.step}>
            <Icon name="healing" size={30} color="green" />
            <Text>Get medicine</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleImageSelection} style={styles.takePictureButton}>
          <Text style={styles.takePictureButtonText}>Take a picture</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
        <Text style={{ fontSize: 18, marginTop: 10 }}>
          Disease Detected: {disease || 'Not identified yet'}
        </Text>
      </View>{disease && disease !== 'No disease detected' && (
        <TouchableOpacity
          style={{
            backgroundColor: '#10b981',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
            marginBottom:20,
          }}
          onPress={() => navigation.navigate('GetMedicine', { disease })}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold'}}>Get Medicine</Text>
        </TouchableOpacity>
      )}





      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => navigation.getParent()?.navigate('FertilizerCalculator')}
        >
          <Icon name="calculate" size={35} color="black" />
          <Text>Fertilizer calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => navigation.getParent()?.navigate('PestsDiseases')}
        >
          <Icon name="healing" size={35} color="black" />
          <Text>Pests & diseases</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => navigation.getParent()?.navigate('CultivationTips')}
        >
          <Icon name="grass" size={35} color="black" />
          <Text>Cultivation Tips</Text>
        </TouchableOpacity>

        <TouchableOpacity 
           style={styles.optionBox}
           onPress={() => navigation.navigate('PestAndDiseaseAlert')}
          >
                 <Icon name="eco" size={35} color="black" /> 
                 <Text>Pests and Disease Alert</Text>
              </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  cropList: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0f7e9',
  },
  diagnosisContainer: {
    backgroundColor: '#e0f7e9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  diagnosisSteps: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  step: { alignItems: 'center' },
  takePictureButton: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  takePictureButtonText: { color: '#fff', fontWeight: 'bold' },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  optionBox: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;