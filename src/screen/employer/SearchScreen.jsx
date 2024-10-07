// SearchScreen.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostJob from './PostJob'; // Import your PostJob component
import JobCard from '../../components/JobCard';
import { Searchbar } from 'react-native-paper';
import JobDetailsScreen from '../JobDetailsScreen';

const Tab = createMaterialTopTabNavigator();

const JobScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // State for selected job
  const [searchQuery, setSearchQuery] = useState('');

  const postJob = () => {
    setIsPosting(true);
  };

  const handleJobPosted = (newJob) => {
    if (editingJob) {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === newJob.id ? newJob : job
        )
      );
    } else {
      setJobs((prevJobs) => [
        ...prevJobs,
        { ...newJob, id: Date.now().toString() },
      ]);
    }
    setIsPosting(false);
    setEditingJob(null);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsPosting(true);
  };

  const handleViewJobDetails = (job) => {
    setSelectedJob(job); // Set selected job to view details
  };

  const filteredJobs = jobs.filter(job =>
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {isPosting ? (
        <PostJob
          setJobs={handleJobPosted}
          setIsPosting={setIsPosting}
          jobData={editingJob}
        />
      ) : selectedJob ? ( // Check if a job is selected for details
        <JobDetailsScreen job={selectedJob} setSelectedJob={setSelectedJob} />
      ) : (
        <>
          <Button title="Post a Job" onPress={postJob} />
          <Searchbar
            style={styles.Searchbar}
            placeholder="Search by company or role..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <JobCard
                jobTitle={item.role}
                companyName={item.companyName}
                salary={item.salary}
                address={item.address}
                onPress={() => handleViewJobDetails(item)} // Navigate to job details
                onEdit={() => handleEditJob(item)}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const NotificationScreen = ({ notifications }) => {
  notifications = [];
  return (
    <View style={styles.notifContainer}>
      {notifications.length === 0 ? (
        <Text style={styles.noNotificationText}>No notifications</Text>
      ) : (
        notifications.map((notification, index) => (
          <Text key={index} style={styles.notificationText}>
            {notification}
          </Text>
        ))
      )}
    </View>
  );
};

const SearchScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Jobs" component={JobScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  jobcard: {
    marginTop:20,
  },
  notifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  noNotificationText: {
    fontSize: 18,
    color: '#777',
  },
  notificationText: {
    fontSize: 16,
    marginVertical: 5,
  },
  Searchbar: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    height: 60,
    borderColor: '#D3D3D3',
    width: '100%',
  },
});

export default SearchScreen;
