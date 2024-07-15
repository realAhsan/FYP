// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import axios from "axios";
// import { Toast } from "react-native-toast-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "@env";
// export default function Signup() {
//   const [userinfo, setuserInfo] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [confirmPassword, setconfirmPassword] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [dataVerification, setdataVerification] = useState(true);
//   const navigation = useNavigation();

//   async function handleSignup() {
//     setdataVerification(true);

//     // Check if name is empty
//     if (!userinfo.name.trim().length > 0) {
//       Toast.show("Name is required", { type: "failure" });
//       setdataVerification(false);
//     }

//     // Validate name
//     if (userinfo.name && typeof userinfo.name === "string") {
//       console.log("Name is valid");
//     } else {
//       console.log("Invalid name");
//       Toast.show("Please check the name again", { type: "failure" });
//       setdataVerification(false);
//     }

//     // Check if email is empty
//     if (!userinfo.email.trim().length > 0) {
//       Toast.show("Email is required", { type: "failure" });
//       setdataVerification(false);
//     }

//     // Validate email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (userinfo.email && emailRegex.test(userinfo.email)) {
//       console.log("Email is valid");
//     } else {
//       console.log("Invalid email");
//       Toast.show("Invalid email", { type: "failure" });
//       setdataVerification(false);
//     }

//     // Check if password is empty
//     if (!userinfo.password.trim().length > 0) {
//       Toast.show("Password is required", { type: "failure" });
//       setdataVerification(false);
//     }

//     // Validate password
//     if (
//       userinfo.password &&
//       typeof userinfo.password === "string" &&
//       userinfo.password.length >= 6
//     ) {
//       console.log("Password is valid");
//     } else {
//       console.log("Invalid password");
//       Toast.show("Password must be at least 6 characters", { type: "failure" });
//       setdataVerification(false);
//     }

//     // Confirm password validation
//     if (userinfo.password !== confirmPassword) {
//       Toast.show("Passwords don't match", { type: "failure" });
//       setdataVerification(false);
//     } else {
//       if (dataVerification) {
//         console.log(userinfo, confirmPassword);

//         try {
//           // const response = await axios.post(`${API_URL}/register`, userinfo);
//           const response = await axios.post(
//             `http://10.140.48.209:8000/register`,
//             userinfo
//           );

//           setResponseData(response.data);
//           console.log(responseData);

//           const storeData = async (key, value) => {
//             try {
//               await AsyncStorage.setItem(key, value);
//               console.log("Data stored successfully");
//             } catch (e) {
//               console.log("Failed to save data", e);
//             }
//           };

//           storeData("Activation-token", response.data.activationToken);

//           Toast.show(response.data.message, { type: "success" });
//           navigation.navigate("ActivationScreen");
//         } catch (error) {
//           console.error("Error:", error);
//           Toast.show("Signup failed. Please try again.", { type: "failure" });
//         }
//       }
//     }
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => {
//             navigation.navigate("AuthScreen");
//             console.log("clicked");
//           }}
//         >
//           <Image
//             source={require("../assets/back.png")}
//             style={styles.backImage}
//           />
//         </TouchableOpacity>
//         <Text style={styles.signUpText}>Sign Up</Text>
//         <View style={styles.logoContainer}>
//           <Image
//             source={require("../assets/logo/logo.jpeg")}
//             style={styles.logoImg}
//           />
//         </View>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           onChangeText={(value) => {
//             setuserInfo({ ...userinfo, name: value });
//           }}
//         />
//         <Text style={styles.label}>Email*</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           keyboardType="email-address"
//           onChangeText={(value) => {
//             setuserInfo({ ...userinfo, email: value });
//           }}
//         />
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry={true}
//           onChangeText={(value) => {
//             setuserInfo({ ...userinfo, password: value });
//           }}
//         />
//         <Text style={styles.label}>Confirm Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           secureTextEntry={true}
//           onChangeText={(value) => setconfirmPassword(value)}
//         />
//         <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
//           <Text style={styles.signUpButtonText}>Sign Up</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "white",
//     justifyContent: "center",
//   },
//   logoContainer: {
//     marginBottom: 50,
//     alignSelf: "center",
//   },
//   logoImg: {
//     width: 150,
//     height: 150,
//     borderRadius: 8,
//   },
//   backButton: {
//     marginTop: 10,
//     marginBottom: 20,
//     paddingTop: 40,
//     paddingRight: 20,
//     paddingBottom: 20,
//   },
//   backImage: {
//     width: 24,
//     height: 24,
//   },
//   signUpText: {
//     fontSize: 36,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   signUpButton: {
//     width: "100%",
//     backgroundColor: "#000",
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   signUpButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function Signup() {
  const [userinfo, setuserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setconfirmPassword] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [dataVerification, setdataVerification] = useState(true);
  const navigation = useNavigation();

  async function handleSignup() {
    setdataVerification(true);

    // Check if name is empty
    if (!userinfo.name.trim().length > 0) {
      Toast.show("Name is required", { type: "failure" });
      setdataVerification(false);
    }

    // Validate name
    if (userinfo.name && typeof userinfo.name === "string") {
      console.log("Name is valid");
    } else {
      console.log("Invalid name");
      Toast.show("Please check the name again", { type: "failure" });
      setdataVerification(false);
    }

    // Check if email is empty
    if (!userinfo.email.trim().length > 0) {
      Toast.show("Email is required", { type: "failure" });
      setdataVerification(false);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userinfo.email && emailRegex.test(userinfo.email)) {
      console.log("Email is valid");
    } else {
      console.log("Invalid email");
      Toast.show("Invalid email", { type: "failure" });
      setdataVerification(false);
    }

    // Check if password is empty
    if (!userinfo.password.trim().length > 0) {
      Toast.show("Password is required", { type: "failure" });
      setdataVerification(false);
    }

    // Validate password
    if (
      userinfo.password &&
      typeof userinfo.password === "string" &&
      userinfo.password.length >= 6
    ) {
      console.log("Password is valid");
    } else {
      console.log("Invalid password");
      Toast.show("Password must be at least 6 characters", { type: "failure" });
      setdataVerification(false);
    }

    // Confirm password validation
    if (userinfo.password !== confirmPassword) {
      Toast.show("Passwords don't match", { type: "failure" });
      setdataVerification(false);
    } else {
      if (dataVerification) {
        console.log(userinfo, confirmPassword);

        try {
          // const response = await axios.post(`${API_URL}/register`, userinfo);
          const response = await axios.post(
            `http://10.140.48.209:8000/register`,
            userinfo
          );

          setResponseData(response.data);
          console.log(responseData);

          const storeData = async (key, value) => {
            try {
              await AsyncStorage.setItem(key, value);
              console.log("Data stored successfully");
            } catch (e) {
              console.log("Failed to save data", e);
            }
          };

          storeData("Activation-token", response.data.activationToken);

          Toast.show(response.data.message, { type: "success" });
          navigation.navigate("ActivationScreen");
        } catch (error) {
          console.error("Error:", error);
          Toast.show("Signup failed. Please try again.", { type: "failure" });
        }
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("AuthScreen");
            console.log("clicked");
          }}
        >
          <Image
            source={require("../assets/back.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.signUpText}>Sign Up</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/logo.jpeg")}
            style={styles.logoImg}
          />
        </View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(value) => {
            setuserInfo({ ...userinfo, name: value });
          }}
        />
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(value) => {
            setuserInfo({ ...userinfo, email: value });
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => {
            setuserInfo({ ...userinfo, password: value });
          }}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(value) => setconfirmPassword(value)}
        />
        <TouchableOpacity
          style={styles.loginTextButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.greenText}>Login</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 50,
    alignSelf: "center",
  },
  logoImg: {
    width: 150,
    height: 150,
    borderRadius: 8,
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
  },
  signUpText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  greenText: {
    paddingHorizontal: 20,
    color: "green",
    marginHorizontal: 20,
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
  loginTextButton: {
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    fontSize: 14,
    color: "grey",
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
