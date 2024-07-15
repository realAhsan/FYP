// NotificationsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";
const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch notifications from API
    axios
      // .get(`${API_URL}/notification`)
      .get(`http://10.140.48.209:8000/notification`)

      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.sender}>{item.title}</Text>
      <Text style={styles.subject}>{item.body}</Text>
      <Text style={styles.time}>
        {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <View style={styles.header}>
        {/* <Text style={styles.subheading}>New</Text> */}
        {/* <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00FF47" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          // ListFooterComponent={<Text style={styles.footer}>See more</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterButton: {
    padding: 5,
  },
  notification: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sender: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subject: {
    fontSize: 16,
    color: "gray",
  },
  time: {
    fontSize: 14,
    color: "gray",
    textAlign: "right",
  },
  footer: {
    textAlign: "center",
    marginVertical: 10,
    color: "gray",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notifications;
