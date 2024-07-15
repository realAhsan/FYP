import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require("../assets/back.png")}
          style={styles.backImage}
        />
      </TouchableOpacity>
      <Text style={styles.title}>About Us</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Lively</Text>
        <Text style={styles.paragraph}>
          Lively is an innovative app designed to bring more vibrancy and
          efficiency to Transport service for Students and help them Travel
          tension free .
        </Text>
        <Text style={styles.heading}>About the Developer</Text>
        <Text style={styles.paragraph}>
          This app is developed by Ahsan Pervaiz as part of his Final Year
          Project (FYP) at IIUI. Ahsan is passionate about creating applications
          that solve real-world problems and enhance user experiences. Through
          Lively, he aims to provide users with a tool that is both functional
          and delightful to use.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 40,
  },
  backText: {
    fontSize: 16,
    color: "#1E90FF",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  contentContainer: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default AboutScreen;
