import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import JobCard from '../../components/JobCard';
import { Searchbar } from 'react-native-paper';
import JobDetailsModal from '../../components/JobDetails';

// Import the local image
import profileImage from '../../images/profile.png';

// Sample data for recent job applications
const recentApplications = [
  {
    id: '1',
    jobTitle: 'Software Engineer',
    companyName: 'Tech Corp',
    salary: '$120,000',
    address: 'New York, Dallas',
    location: 'San Francisco, CA',
    description: 'As a product manager, you will lead the development...',
  },
  {
    id: '2',
    jobTitle: 'UI/UX Designer',
    companyName: 'Creative Inc',
    salary: '$90,000',
    address: 'New York, Dallas',
    location: 'San Francisco, CA',
    description: 'As a product manager, you will lead the development...',
  },
  {
    id: '3',
    jobTitle: 'Project Manager',
    companyName: 'Innovative Solutions',
    salary: '$110,000',
    address: 'New York, Dallas',
    location: 'San Francisco, CA',
    description: 'As a product manager, you will lead the development...',
  },
];

// User information
const user = {
  name: 'John Doe',
  imageUrl: profileImage,
};

const EmployerHomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCardPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  // Function to filter job applications based on the search query
  const filterApplications = () => {
    if (!searchQuery) {
      return recentApplications;
    }

    return recentApplications.filter(
      item =>
        item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
          <Image source={user.imageUrl} style={styles.userImage} />
        </View>
        <View style={styles.applicationsSection}>
          <Text style={styles.applicationsHeader}>Recent Postings</Text>

          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.Searchbar}
          />

          <FlatList
            data={filterApplications()}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <JobCard
                job={item}
                onPress={() => handleCardPress(item)}
                jobTitle={item.jobTitle}
                companyName={item.companyName}
                salary={item.salary}
                address={item.address}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />

          {selectedJob && (
            <JobDetailsModal
              visible={modalVisible}
              job={selectedJob}
              onClose={closeModal}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1, // Ensure content stretches to fit
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  applicationsSection: {
    flex: 1,
  },
  applicationsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  Searchbar: {
    marginBottom: 20,
    marginTop: 10,
    width: '100%',
  },
  listContent: {
    paddingBottom: 100, // Add padding if necessary for scroll
  },
});

export default EmployerHomeScreen;
