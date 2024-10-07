import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';

const JobDetailsScreen = ({ job, setSelectedJob }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.companyName}>{job.companyName}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Role:</Text>
          <Text style={styles.detailValue}>{job.role}</Text>

          {/* <Text style={styles.detailLabel}>Shift Time:</Text>
          <Text style={styles.detailValue}>{job.shiftTime}</Text> */}

          <Text style={styles.detailLabel}>Salary:</Text>
          <Text style={styles.detailValue}>${job.salary}</Text>

          <Text style={styles.detailLabel}>Job Description:</Text>
          <Text style={styles.detailValue}>{job.jobDescription}</Text>

          <Text style={styles.detailLabel}>Skills:</Text>
          <Text style={styles.detailValue}>{job.skills}</Text>

          <Text style={styles.detailLabel}>Uniform:</Text>
          <Text style={styles.detailValue}>{job.uniform}</Text>

          <Text style={styles.detailLabel}>Venue:</Text>
          <Text style={styles.detailValue}>{job.venue}</Text>

          <Text style={styles.detailLabel}>Area:</Text>
          <Text style={styles.detailValue}>{job.area}</Text>

          <Text style={styles.detailLabel}>Access Instructions:</Text>
          <Text style={styles.detailValue}>{job.accessInstructions}</Text>

          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>{job.address}</Text>
        </View>
        <Button title="Back to Jobs" onPress={() => setSelectedJob(null)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 50,
    flex: 1,
    flexBasis: 0,
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
});

export default JobDetailsScreen;
