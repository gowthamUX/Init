import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';
import config from '../utils/config';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const navigation = useNavigation();

  const handleLogin = async () => {
    const loginUrl = config.apiBaseUrl + '/auth/login';
    console.log(loginUrl);

    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(loginUrl, {
        email: form.email,
        password: form.password,
      });
      const {token} = response.data;
      await AsyncStorage.setItem('jwtToken', token);
      const decoded = jwtDecode(token);
      const {role} = decoded;

      console.log(decoded);
      if (role === 'Admin') {
        navigation.navigate('AdminScreen');
      } else if (role === 'employee') {
        navigation.navigate('MainScreen');
      } else if (role === 'employer') {
        navigation.navigate('MainScreen');
      } else {
        Alert.alert('Error', 'Invalid role.');
      }
    } catch (error) {
      Alert.alert(error?.response?.data);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            {/* <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require('../assets/Init_logo.png')}
            /> */}

            <Text style={styles.title}>
              Sign in to <Text style={{color: '#075eec'}}>INIT</Text>
            </Text>

            <Text style={styles.subtitle}>
              Step into a World of Endless Opportunities
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({...form, email})}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({...form, password})}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLink}>Forgot password?</Text>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={{marginTop: 'auto'}}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
