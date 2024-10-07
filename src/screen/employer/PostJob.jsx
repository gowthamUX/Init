// PostJob.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from '../../utils/DatePicker';
import config from '../../utils/config';

export default function PostJob({ setJobs, setIsPosting, jobData }) {
  const navigation = useNavigation();
  const route = useRoute();
  const  job  = jobData; // Retrieve job details if editing

  const [date, setDate] = useState(new Date());

  const [form, setForm] = useState({
    companyName: '',
    role: '',
    jobDescription: '',
    shiftTime: date,
    skills: '',
    salary: '',
    uniform: '',
    venue: '',
    area: '',
    accessInstructions: '',
    address: '',
  });

  // Use useEffect to populate the form if editing
  useEffect(() => {
    if (jobData) {
      setForm({
        companyName: jobData.companyName,
        role: jobData.role,
        jobDescription: jobData.jobDescription,
        shiftTime: jobData.shiftTime,
        skills: jobData.skills,
        salary: jobData.salary,
        uniform: jobData.uniform,
        venue: jobData.venue,
        area: jobData.area,
        accessInstructions: jobData.accessInstructions,
        address: jobData.address,
      });
      setDate(new Date(jobData.shiftTime)); // Set date for the date picker
    }
  }, [jobData]);

  const postJob = () => {
    if (
      !form.companyName ||
      !form.role ||
      !form.jobDescription ||
      !form.shiftTime ||
      !form.venue ||
      !form.address
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Pass the updated form data back to the parent
    setJobs({ ...form, id: jobData?.id || Date.now().toString() }); // Use existing job ID or create a new one
    setIsPosting(false); // Close the posting modal
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Company Name<Text>*</Text></Text>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(companyName) => setForm({ ...form, companyName })}
                  placeholder="Apple"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.companyName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Role<Text>*</Text></Text>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(role) => setForm({ ...form, role })}
                  placeholder="Developer"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.role}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Job Description<Text>*</Text></Text>
              <TextInput
                style={styles.inputDescription}
                multiline
                numberOfLines={4}
                placeholder="Enter job description here..."
                placeholderTextColor="#6b7280"
                onChangeText={(jobDescription) => setForm({ ...form, jobDescription })}
                value={form.jobDescription}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Shift Time<Text>*</Text></Text>
              <DatePicker date={date} setDate={setDate} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Salary (in Dollars)</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={(salary) => setForm({ ...form, salary })}
                placeholder="$100"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.salary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Job and Skills</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={(skills) => setForm({ ...form, skills })}
                placeholder="Events Bartender"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.skills}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Uniform</Text>
              <TextInput
                style={styles.inputDescription}
                multiline
                numberOfLines={4}
                placeholder="Enter your uniform details..."
                placeholderTextColor="#6b7280"
                onChangeText={(uniform) => setForm({ ...form, uniform })}
                value={form.uniform}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Venue<Text>*</Text></Text>
              <TextInput
                autoCorrect={false}
                onChangeText={(venue) => setForm({ ...form, venue })}
                placeholder="Enter Venue"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.venue}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Area</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={(area) => setForm({ ...form, area })}
                placeholder="Beverage Service"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.area}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Access Instructions</Text>
              <TextInput
                style={styles.inputDescription}
                multiline
                numberOfLines={4}
                placeholder="Enter details..."
                placeholderTextColor="#6b7280"
                onChangeText={(accessInstructions) => setForm({ ...form, accessInstructions })}
                value={form.accessInstructions}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address<Text>*</Text></Text>
              <TextInput
                style={styles.inputDescription}
                multiline
                numberOfLines={4}
                placeholder="Enter Complete Address..."
                placeholderTextColor="#6b7280"
                onChangeText={(address) => setForm({ ...form, address })}
                value={form.address}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={postJob}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Post Job</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    flex: 1,
    flexBasis: 0,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
    marginRight: 8,
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
  },
  inputDescription: {
    height: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  formAction: {
    marginTop: 4,
    marginBottom: 50,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
