// TabConfig.js

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  BackHandler,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import axios from "axios";
import { styles } from "./styles/jobs_styles";
import { profilestyles } from "./styles/profile_styles";
import React, { useState, useEffect } from "react";

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
  const [profileData, setProfileData] = useState(null); // Remove static data
  const [jobsData, setJobsData] = useState([]); // Define the jobsData state

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEdit = (user) => {
    setProfileData(user);
    toggleModal();
  };

  const handleDelete = () => {
    // Implement your delete logic here
  console.log('Delete button pressed');

  // Make a request to your API to delete the user's data
  if (profileData && profileData.id) {
    axios
      .delete(`http://127.0.0.1:8000/api/deleteusers/${profileData.id}`)
      .then((response) => {
        console.log('User data deleted successfully:', response.data);
        // Optionally, you can update the local jobsData state to reflect the deletion
        // Remove the deleted user from the jobsData array
        const updatedJobsData = jobsData.filter((user) => user.id !== profileData.id);
        setJobsData(updatedJobsData);
        toggleModal();
      })
      .catch((error) => {
        console.error('Error deleting user data:', error);
      });
  } else {
    console.error('Invalid user data or user ID.');
  }
  };

  const handleSaveChanges = () => {
    // Implement your save changes logic here
    console.log("Save Changes button pressed");
    toggleModal();
  };

  const handleBackButton = () => {
    toggleModal();
    return true; // Prevent default behavior (closing the app)
  };

  useEffect(() => {
    // Add event listener to handle Android hardware back button when the modal is open
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    fetchData();
    return () => {
      // Remove event listener on component unmount
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [isModalVisible]);

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/users") // Replace with your API endpoint
      .then((response) => {
        setJobsData(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <View style={profilestyles.container}>
      <SafeAreaView style={profilestyles.bg}>
        <Text style={profilestyles.textheader}>Profile Screen</Text>
      </SafeAreaView>

      {/* Users Data */}
      <ScrollView>
        {jobsData.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={profilestyles.card}
            onPress={() => handleEdit(user)} // Pass the user to handleEdit
          >
            <Text>Name: {user.name}</Text>
            <Text>Bio: {user.bio}</Text>
            <TouchableOpacity
              style={profilestyles.editButton}
              onPress={() => handleEdit(user)}
            >
              <Text style={profilestyles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={profilestyles.modalContainer}>
          {profileData && (
            <>
              <TextInput
                style={profilestyles.input}
                placeholder="Name"
                value={profileData.name}
                onChangeText={(text) =>
                  setProfileData({ ...profileData, name: text })
                }
              />

              <TextInput
                style={profilestyles.input}
                placeholder="Email"
                value={profileData.email}
                onChangeText={(text) =>
                  setProfileData({ ...profileData, email: text })
                }
              />

              <TextInput
                style={profilestyles.input}
                placeholder="Bio"
                value={profileData.bio}
                onChangeText={(text) =>
                  setProfileData({ ...profileData, bio: text })
                }
              />

              <View style={profilestyles.buttonContainers}>
                <TouchableOpacity
                  style={profilestyles.saveButton}
                  onPress={handleSaveChanges}
                >
                  <Text>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={profilestyles.deleteButton}
                  onPress={handleDelete}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={profilestyles.closeButton}
                  onPress={toggleModal}
                >
                  <Text style={profilestyles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {/* Display an "Edit" button in the modal when there is no profileData */}
          {!profileData && (
            <TouchableOpacity
              style={profilestyles.editButton}
              onPress={() => toggleModal()}
            >
              <Text style={profilestyles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

const Jobs = () => {
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts") // Replace with your API endpoint
      .then((response) => {
        setJobsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <View style={styles.container}>
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

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "Jobs") {
            iconName = focused ? "ios-briefcase" : "ios-briefcase-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: {
          backgroundColor: "green", // Change to your desired color
        },

        headerTintColor: "#fff", // Change the color of the header text (e.g., back button, title)
        headerTitleStyle: {
          fontStyle: "roboto",
        },
      })}
      tabBarOptions={{
        activeTintColor: "green", // Change to your desired active tab color
        inactiveTintColor: "gray", // Change to your desired inactive tab color
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
  );
};

export default TabConfig;
