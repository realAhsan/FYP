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

const HelpScreen = () => {
  const navigation = useNavigation();
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions to reset your password.',
    },
    {
      question: "How do I change my password?",
      answer:
        'To Change your password, go to the profile page and click on "Security". Follow the instructions to change your password.',
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact support by emailing support@iiu.edu.pk or calling our support hotline at 123-456-7890.",
    },
  ];

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
      <Text style={styles.title}>Help</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
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
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 30,
    paddingRight: 20,
    paddingBottom: 20,
  },

  backImage: {
    width: 24,
    height: 24,
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
  faqItem: {
    marginBottom: 30,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: "gray",
  },
});

export default HelpScreen;
