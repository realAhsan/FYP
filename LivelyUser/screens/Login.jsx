// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import { Toast } from "react-native-toast-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function Login({ setIsLoggedIn }) {
//   const [userinfo, setuserInfo] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   async function handleLogin() {
//     setLoading(true);
//     try {
//       console.log("inside try");
//       const response = await axios.post(
//         "http://192.168.0.106:8000/login",
//         userinfo
//       );
//       console.log(`inside try`);

//       console.log(response.data);
//       Toast.show(response.data.message, { type: "success" });
//       console.log("RESPONSE TOKEN $$", response.data.token);

//       const storeData = async (key, value) => {
//         try {
//           await AsyncStorage.setItem(key, value);
//           console.log("data stored successfully");
//         } catch (e) {
//           console.log("Failed to save data", e);
//         }
//       };

//       // Usage
//       storeData("access-token", response.data.token);
//       storeData("UserName", response.data.data.user.name);
//       console.log("UserName", response.data.data.user.name);
//       storeData("UserEmail", response.data.data.user.email);
//       console.log("UserEmail", response.data.data.user.email);
//       setIsLoggedIn(true);
//       navigation.navigate("Tabs");
//     } catch (error) {
//       console.log("Error:", error);
//       console.log(`inside catch`);
//       Toast.show("Wrong email or password", { type: "danger" });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.navigate("AuthScreen")}
//       >
//         <Image
//           source={require("../assets/back.png")}
//           style={styles.backImage}
//         />
//       </TouchableOpacity>
//       <Text style={styles.loginText}>Login</Text>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require("../assets/logo/logo.jpeg")}
//           style={styles.logoImg}
//         />
//       </View>

//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={(value) => {
//           setuserInfo({ ...userinfo, email: value });
//         }}
//       />
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry={true}
//         onChangeText={(value) => {
//           setuserInfo({ ...userinfo, password: value });
//         }}
//       />
//       <TouchableOpacity
//         style={styles.forgotPasswordButton}
//         onPress={() => navigation.navigate("ForgotPassword")}
//       >
//         <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//       </TouchableOpacity>
//       <Text style={styles.contactText}>
//         Please contact support@iiu.edu.pk in case of trouble signing in to your
//         IIUI Email Account
//       </Text>
//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>
//       {loading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#00FF47" />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "white",
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
//   loginText: {
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
//   contactText: {
//     fontSize: 12,
//     color: "gray",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   forgotPasswordButton: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     fontSize: 14,
//     color: "grey",
//   },
//   loginButton: {
//     width: "100%",
//     backgroundColor: "#000",
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   loadingContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { API_URL } from "@env";
// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import axios from "axios";
// import { Toast } from "react-native-toast-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function Login({ setIsLoggedIn }) {
//   const [userinfo, setuserInfo] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   async function handleLogin() {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         // `${API_URL}/login`,
//         "http://10.140.48.209:8000/login",
//         userinfo
//       );

//       Toast.show(response.data.message, { type: "success" });

//       const storeData = async (key, value) => {
//         try {
//           await AsyncStorage.setItem(key, value);
//         } catch (e) {
//           console.log("Failed to save data", e);
//         }
//       };

//       storeData("access-token", response.data.token);
//       storeData("UserName", response.data.data.user.name);
//       storeData("UserEmail", response.data.data.user.email);
//       setIsLoggedIn(true);
//       navigation.navigate("Tabs");
//     } catch (error) {
//       Toast.show("Wrong email or password", { type: "danger" });
//     } finally {
//       setLoading(false);
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
//           onPress={() => navigation.navigate("AuthScreen")}
//         >
//           <Image
//             source={require("../assets/back.png")}
//             style={styles.backImage}
//           />
//         </TouchableOpacity>
//         <Text style={styles.loginText}>Login</Text>
//         <View style={styles.logoContainer}>
//           <Image
//             source={require("../assets/logo/logo.jpeg")}
//             style={styles.logoImg}
//           />
//         </View>

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
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
//         <TouchableOpacity
//           style={styles.forgotPasswordButton}
//           onPress={() => navigation.navigate("Forgotpassword")}
//         >
//           <Text style={styles.forgotPasswordText}>Foget Password</Text>
//         </TouchableOpacity>
//         <Text style={styles.contactText}>
//           Please contact support@iiu.edu.pk in case of trouble signing in to
//           your IIUI Email Account
//         </Text>
//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>
//         {loading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#00FF47" />
//           </View>
//         )}
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "white",
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
//   loginText: {
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
//   contactText: {
//     fontSize: 12,
//     color: "gray",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   forgotPasswordButton: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     fontSize: 14,
//     color: "grey",
//   },
//   signup: {},
//   loginButton: {
//     width: "100%",
//     backgroundColor: "#000",
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   loadingContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
// });
import { API_URL } from "@env";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ setIsLoggedIn }) {
  const [userinfo, setuserInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleLogin() {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.140.48.209:8000/login",
        userinfo
      );

      Toast.show(response.data.message, { type: "success" });

      const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e) {
          console.log("Failed to save data", e);
        }
      };

      storeData("access-token", response.data.token);
      storeData("UserName", response.data.data.user.name);
      storeData("UserEmail", response.data.data.user.email);
      setIsLoggedIn(true);
      navigation.navigate("Tabs");
    } catch (error) {
      Toast.show("Wrong email or password", { type: "danger" });
    } finally {
      setLoading(false);
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
          onPress={() => navigation.navigate("AuthScreen")}
        >
          <Image
            source={require("../assets/back.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/logo.jpeg")}
            style={styles.logoImg}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
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
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signupText}>
            Don't have an account?
            <Text style={styles.greenText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.contactText}>
          Please contact support@iiu.edu.pk in case of trouble signing in to
          your IIUI Email Account
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00FF47" />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
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
  loginText: {
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
  contactText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  signupButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    color: "grey",
  },
  greenText: {
    paddingHorizontal: 20,
    color: "green",
    marginHorizontal: 20,
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
