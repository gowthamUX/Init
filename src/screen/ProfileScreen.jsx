import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  StyleSheet,
  Linking, // Import Linking
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ route, navigation }) => {
  const [name, setName] = useState('gowtham');
  const [accountName, setAccountName] = useState('sdsd');
  const [profileImage, setProfileImage] = useState(require('../images/profile.png')); // Default profile image

  const showToastMessage = () => {
    ToastAndroid.show('Edited Successfully!', ToastAndroid.SHORT);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      // Handle logout error
    }
  };

  const contactUs = () => {
    const phoneNumber = '1234567890'; // Replace with your number
    const message = 'Hello, I would like to get in touch.'; // Customize your message
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          ToastAndroid.show('WhatsApp is not installed!', ToastAndroid.SHORT);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => {
            showToastMessage();
            navigation.goBack();
          }}
        >
          <Ionic name="checkmark" style={[styles.icon, styles.checkmarkIcon]} />
        </TouchableOpacity>
      </View>
  
      <View style={styles.formContainer}>
        {renderTextInput('Name', name, setName)}
        {renderTextInput('Username', accountName, setAccountName)}
        {renderTextInput('Email', '', () => {})}
        {renderTextInput('Mobile Number', '', () => {})}
      </View>

      {/* Contact Us Section */}
      <View style={styles.contactUsContainer}>
        <Text style={styles.contactUsHeading}>Contact Us</Text>
        <TouchableOpacity style={styles.whatsappContainer} onPress={contactUs}>
          <Ionic name="logo-whatsapp" style={styles.whatsappIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const renderTextInput = (label, defaultValue, setValue) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholder={label.toLowerCase()}
      defaultValue={defaultValue}
      onChangeText={setValue}
      style={styles.textInput}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    fontSize: 35,
  },
  checkmarkIcon: {
    color: '#3493D9',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 10,
  },
  inputContainer: {
    paddingVertical: 10,
  },
  label: {
    opacity: 0.5,
  },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
  },
  contactUsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  contactUsHeading: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  whatsappContainer: {
    alignItems: 'center',
    padding: 10,
  },
  whatsappIcon: {
    fontSize: 40,
    color: '#25D366', // WhatsApp green
  },
});

export default ProfileScreen;
