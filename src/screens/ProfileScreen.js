import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  // Dummy/sample data for the profile
  const profileData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    location: 'New York, USA',
    phone: '+1 (123) 456-7890',
    bio: 'Passionate developer exploring the world of mobile app development.',
    position: 'Software Engineer',
    department: 'Engineering',
    startDate: 'January 15, 2022',
    employeeID: 'EMP12345',
    skills: ['UI/UX Design'],
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} 
        style={styles.profileImage} 
      />
      <Text style={styles.name}>{profileData.name}</Text>
      <Text style={styles.email}>{profileData.email}</Text>

      {/* Additional Profile Information */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <FontAwesome name="map-marker" size={24} color="grey" />
          <Text style={styles.infoText}>{profileData.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={24} color="grey" />
          <Text style={styles.infoText}>{profileData.phone}</Text>
        </View>
      </View>

      {/* Bio */}
      <Text style={styles.bio}>{profileData.bio}</Text>

      {/* Employee Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Position:</Text>
          <Text style={styles.detailValue}>{profileData.position}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailValue}>{profileData.department}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Start Date:</Text>
          <Text style={styles.detailValue}>{profileData.startDate}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Employee ID:</Text>
          <Text style={styles.detailValue}>{profileData.employeeID}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Skills:</Text>
          {profileData.skills.map((skill, index) => (
            <Text key={index} style={styles.skillItem}>{skill}</Text>
          ))}
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 5,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: 'grey',
  },
  skillItem: {
    fontSize: 16,
    color: 'grey',
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
