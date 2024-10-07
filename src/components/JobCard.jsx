import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const JobCard = ({ jobTitle, companyName, salary, address, onPress, onEdit }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={[styles.card, pressed && styles.cardPressed]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Icon name="work" size={48} color="#9A9A9A" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.jobTitle}>{jobTitle}</Text>
              <Text style={styles.companyName}>{companyName}</Text>
            </View>
            <TouchableOpacity onPress={onEdit}>
              <Icon name="edit" size={24} color="#007BFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.address}>{address}</Text>
            <Text style={styles.salary}>{salary}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  cardPressed: {
    borderColor: 'blue',
    backgroundColor: 'grey',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  address: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  salary: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'right',
    padding: 8,
  },
});

export default JobCard;
