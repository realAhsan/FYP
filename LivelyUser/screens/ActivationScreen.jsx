// import { useNavigation } from "@react-navigation/native";
// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { Toast } from "react-native-toast-notifications";

// const ActivationScreen = () => {
//   const [code, setCode] = useState(["", "", "", ""]);
//   const [token, setToken] = useState("");
//   const navigation = useNavigation();

//   const inputs = useRef([]);
//   const handleChangeText = (text, index) => {
//     if (text.length > 1) {
//       return; // Avoids entering more than one digit
//     }
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);

//     // Move to next input if current one is filled
//     if (text && index < inputs.current.length - 1) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   const getData = async (key) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       if (value !== null) {
//         setToken(value);
//         console.log("Data retrieved:", value);
//         return value;
//       }
//     } catch (e) {
//       console.log("Failed to fetch data", e);
//     }
//     return null;
//   };

//   useEffect(() => {
//     getData("Activation-token");
//   }, []);

//   const handleSubmit = async () => {
//     const activationToken = await getData("Activation-token");
//     const activationCode = code.join("");
//     console.log(activationCode);
//     const user = {
//       activation_token: activationToken,
//       activation_code: activationCode,
//     };
//     console.log(user);

//     try {
//       const response = await axios.post(
//         "http://192.168.0.106:8000/activate-user",
//         user
//       );

//       console.log(response.data);
//       Toast.show(response.data.message, { type: "success" });
//       navigation.navigate("Login");
//     } catch (error) {
//       console.log("Error:", error);
//       Toast.show("The code you entered is invalid or expired", {
//         type: "danger",
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.navigate("Register")}
//       >
//         <Image
//           source={require("../assets/back.png")}
//           style={styles.backImage}
//         />
//       </TouchableOpacity>
//       <Text style={styles.loginText}>Verify</Text>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require("../assets/logo/logo.jpeg")}
//           style={styles.logoImg}
//         />
//       </View>
//       <View style={styles.inputBoxes}>
//         <Text style={styles.label}>Enter Activation Code</Text>
//         <View style={styles.inputContainer}>
//           {code.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={(input) => (inputs.current[index] = input)}
//               style={styles.input}
//               value={digit}
//               onChangeText={(text) => handleChangeText(text, index)}
//               keyboardType="numeric"
//               maxLength={1}
//             />
//           ))}
//         </View>
//       </View>

//       <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
//         <Text style={styles.loginButtonText}>Verify</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//   },
//   inputBoxes: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
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
//   },
//   backImage: {
//     width: 24,
//     height: 24,
//   },
//   loginText: {
//     fontSize: 36,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 16,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   input: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#000",
//     borderRadius: 8,
//     textAlign: "center",
//     fontSize: 24,
//     marginRight: 8,
//   },
//   loginButton: {
//     width: "100%",
//     backgroundColor: "#000",
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 10,
//     marginBottom: 180,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default ActivationScreen;

import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import { API_URL } from "@env";
const ActivationScreen = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [token, setToken] = useState("");
  const navigation = useNavigation();

  const inputs = useRef([]);
  const handleChangeText = (text, index) => {
    if (text.length > 1) {
      return; // Avoids entering more than one digit
    }
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input if current one is filled
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setToken(value);
        console.log("Data retrieved:", value);
        return value;
      }
    } catch (e) {
      console.log("Failed to fetch data", e);
    }
    return null;
  };

  useEffect(() => {
    getData("Activation-token");
  }, []);

  const handleSubmit = async () => {
    const activationToken = await getData("Activation-token");
    const activationCode = code.join("");
    console.log(activationCode);
    const user = {
      activation_token: activationToken,
      activation_code: activationCode,
    };
    console.log(user);

    try {
      // const response = await axios.post(`${API_URL}/activate-user`, user);
      const response = await axios.post(
        `http://10.140.48.209:8000/activate-user`,
        user
      );

      console.log(response.data);
      Toast.show(response.data.message, { type: "success" });
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error:", error);
      Toast.show("The code you entered is invalid or expired", {
        type: "danger",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Image
            source={require("../assets/back.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.loginText}>Verify</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/logo.jpeg")}
            style={styles.logoImg}
          />
        </View>
        <View style={styles.inputBoxes}>
          <Text style={styles.label}>Enter Activation Code</Text>
          <View style={styles.inputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(input) => (inputs.current[index] = input)}
                style={styles.input}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Verify</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  inputBoxes: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  backImage: {
    width: 24,
    height: 24,
  },
  loginText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    marginRight: 8,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ActivationScreen;
