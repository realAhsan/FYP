import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const logo = require("../assets/logo/logo.jpeg");

const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logoImg} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <Text style={styles.contactText}>
        Please contact <Text style={styles.emailText}>support@iiu.edu.pk</Text>{" "}
        in case of trouble signing in to your IIUI Email Account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logoImg: {
    width: 150,
    height: 150,
    borderRadius: 8,
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
  orText: {
    marginVertical: 10,
    fontSize: 16,
  },
  contactText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
  emailText: {
    color: "#0000ff",
    textDecorationLine: "underline",
  },
});

export default AuthScreen;
