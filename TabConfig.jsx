// TabConfig.js

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, SafeAreaView , TextInput, TouchableOpacity, Modal, BackHandler  } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import  axios  from 'axios';
import { styles } from './styles/jobs_styles'
import { profilestyles } from './styles/profile_styles'
import React, { useState, useEffect } from 'react';





const Tab = createBottomTabNavigator();


const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.bg}>
            <Text style={styles.textheader}>Home Screen</Text>
        </SafeAreaView>
    </View>
  );
};

const ProfileScreen = () => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'I am a React Native developer.',
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEdit = () => {
    toggleModal();
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log('Delete button pressed');
  };

  const handleSaveChanges = () => {
    // Implement your save changes logic here
    console.log('Save Changes button pressed');
    toggleModal();
  };

  const handleBackButton = () => {
    toggleModal();
    return true; // Prevent default behavior (closing the app)
  };

  useEffect(() => {
    // Add event listener to handle Android hardware back button when the modal is open
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      // Remove event listener on component unmount
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [isModalVisible]);


  return (
    
   
      <View style={profilestyles.container}>
        <SafeAreaView style={profilestyles.bg}>
          <Text style={profilestyles.textheader}>Profile Screen</Text>
        </SafeAreaView>
      <View style={profilestyles.card}>
        <View style={profilestyles.profileInfo}>
          <Text>Name: {profileData.name}</Text>
          <Text>Email: {profileData.email}</Text>
          <Text>Bio: {profileData.bio}</Text>
        </View>

        <TouchableOpacity style={profilestyles.editButton} onPress={handleEdit}>
          <Text style={profilestyles.editButtonText}>Edit</Text>
        </TouchableOpacity>

      

        <Modal visible={isModalVisible} animationType="slide">
          <View style={profilestyles.modalContainer}>
            <TextInput
              style={profilestyles.input}
              placeholder="Name"
              value={profileData.name}
              onChangeText={(text) => setProfileData({ ...profileData, name: text })}
            />

            <TextInput
              style={profilestyles.input}
              placeholder="Email"
              value={profileData.email}
              onChangeText={(text) => setProfileData({ ...profileData, email: text })}
            />

            <TextInput
              style={profilestyles.input}
              placeholder="Bio"
              value={profileData.bio}
              onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
            />
            <View style={profilestyles.buttonContainers}>
                <TouchableOpacity style={profilestyles.saveButton} onPress={handleSaveChanges}>
                  <Text>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={profilestyles.deleteButton} onPress={handleDelete}>
                  <Text>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={profilestyles.closeButton} onPress={toggleModal}>
                  <Text style={profilestyles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    </View>
  );
};

const Jobs = () =>{

    const [jobsData, setJobsData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      axios
        .get('https://jsonplaceholder.typicode.com/posts') // Replace with your API endpoint
        .then((response) => {
          setJobsData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
    
    return(
        <View style={styles.container }>
            <SafeAreaView style={styles.bg}>
                <Text style={styles.textheader}>Jobs Screen</Text>
            </SafeAreaView>
            <ScrollView>
                {jobsData.map((job) => (
                <View key={job.id} style={styles.card}>
                    <Text style={styles.jobsTitle}>Title: {job.title}</Text>
                    <Text style={styles.jobs}>Body: {job.body}</Text>
                </View>
                ))}
             </ScrollView>
        </View>
    );
};



const TabConfig = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Jobs') {
            iconName = focused ? 'ios-briefcase' : 'ios-briefcase-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: {
            backgroundColor: 'green', // Change to your desired color
        },

         headerTintColor: '#fff', // Change the color of the header text (e.g., back button, title)
          headerTitleStyle: {
            fontStyle: 'roboto',
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green', // Change to your desired active tab color
        inactiveTintColor: 'gray', // Change to your desired inactive tab color
      }
           
    }
    
     >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
  );
};




export default TabConfig;
