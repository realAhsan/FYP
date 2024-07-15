import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
export default function ComplaintScreen() {
  const navigation = useNavigation();
  var [complaint, setComplaint] = useState({
    subject: "",
    details: "",
  });

  async function handleSendComplaint() {
    try {
      const response = await axios.post(
        // `${API_URL}/complaint/new-complaint`,
        `http://10.140.48.209:8000/complaint/new-complaint`,

        complaint
      );

      if (response.status === 201) {
        Toast.show("Thanks for Your feedback, we will work on the Complaint", {
          type: "success",
        });
        complaint = {
          subject: "",
          details: "",
        };
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.error("Error sending complaint:", error);
      Toast.show("Failed to send complaint. Please try again later.", {
        type: "danger",
      });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require("../assets/back.png")}
          style={styles.backImage}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Complaint</Text>
      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={complaint.subject}
        onChangeText={(value) => setComplaint({ ...complaint, subject: value })}
      />
      <Text style={styles.label}>Details</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Details"
        value={complaint.details}
        onChangeText={(value) => setComplaint({ ...complaint, details: value })}
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendComplaint}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 30,
    paddingRight: 20,
    paddingBottom: 20,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  sendButton: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
