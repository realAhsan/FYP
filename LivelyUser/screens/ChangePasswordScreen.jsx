import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import { Toast } from "react-native-toast-notifications";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setuserEmail] = useState("");

  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    const UserMail = await AsyncStorage.getItem("UserEmail");
    setuserEmail(UserMail);
    console.log("EMAIL$$", userEmail);
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios
        // .post(`${API_URL}/change-password`, {
        .post(`http://10.140.48.209:8000/change-password`, {
          email: userEmail,
          currentPassword: oldPassword,
          newPassword: newPassword,
        });

      setMessage(response.data.message);
      Toast.show("Password successFully change", { type: "success" });
      navigation.navigate("Profile");
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
      Toast.show("Unable to change password at this moment", {
        type: "danger",
      });
    }
  };

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
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {/* {message ? <Text style={styles.message}>{message}</Text> : null} */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  message: {
    textAlign: "center",
    color: "red",
    marginBottom: 15,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 40,
    paddingRight: 20,
    paddingBottom: 20,
  },
  backImage: {
    width: 24,
    height: 24,
    paddingTop: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
