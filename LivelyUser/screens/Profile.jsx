// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// const ProfileScreen = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const UserEmail = await AsyncStorage.getItem("UserEmail");
//         const UserName = await AsyncStorage.getItem("UserName");

//         if (UserEmail && UserName) {
//           console.log(UserEmail, UserName);
//           setEmail(UserEmail);
//           setName(UserName);
//         }
//       } catch (error) {
//         console.error("Failed to load user data", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const getInitial = () => {
//     return name.charAt(0).toUpperCase();
//   };

//   const logoutHandler = async () => {
//     try {
//       await AsyncStorage.setItem("access-token", "");
//       console.log("data stored successfully (logout)");
//       navigation.navigate("Login");
//     } catch (e) {
//       console.log("Failed to save data", e);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileHeader}>
//         <View style={styles.profileImage}>
//           <Text style={styles.profileInitial}>{getInitial()}</Text>
//         </View>
//         <Text style={styles.profileName}>{name}</Text>
//         <Text style={styles.profileEmail}>{email}</Text>
//       </View>
//       <View style={styles.menu}>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate("ChangePassword")}
//         >
//           <FontAwesome5 name="shield-alt" size={24} color="black" />
//           <Text style={styles.menuText}>Security</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate("Help")}
//         >
//           <Ionicons name="help-circle-outline" size={24} color="black" />
//           <Text style={styles.menuText}>Help</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate("About")}
//         >
//           <Ionicons name="information-circle-outline" size={24} color="black" />
//           <Text style={styles.menuText}>About us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate("Complaint")}
//         >
//           <MaterialIcons name="complaint" size={24} color="black" />
//           <Text style={styles.menuText}>Complaints</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.menuItem} onPress={logoutHandler}>
//           <MaterialIcons name="logout" size={24} color="black" />
//           <Text style={styles.menuText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: 60,
//   },
//   profileHeader: {
//     alignItems: "center",
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#ccc",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   profileInitial: {
//     fontSize: 32,
//     color: "white",
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   profileEmail: {
//     fontSize: 16,
//     color: "gray",
//   },
//   menu: {
//     marginTop: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   menuText: {
//     fontSize: 18,
//     marginLeft: 15,
//   },
// });

// export default ProfileScreen;
///////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Profile = ({ setIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const UserEmail = await AsyncStorage.getItem("UserEmail");
        const UserName = await AsyncStorage.getItem("UserName");

        if (UserEmail && UserName) {
          setEmail(UserEmail);
          setName(UserName);
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    fetchUserData();
  }, []);

  const getInitial = () => {
    return name.charAt(0).toUpperCase();
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.setItem("access-token", "");
      setIsLoggedIn(false); // Update isLoggedIn state to false upon logout
      navigation.navigate("AuthStack");
    } catch (e) {
      console.log("Failed to save data", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>{getInitial()}</Text>
        </View>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <FontAwesome5 name="shield-alt" size={24} color="black" />
          <Text style={styles.menuText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Help")}
        >
          <Ionicons name="help-circle-outline" size={24} color="black" />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("About")}
        >
          <Ionicons name="information-circle-outline" size={24} color="black" />
          <Text style={styles.menuText}>About us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Complaint")}
        >
          <MaterialIcons name="report" size={24} color="black" />
          <Text style={styles.menuText}>Complaints</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={logoutHandler}>
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileInitial: {
    fontSize: 32,
    color: "white",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
  },
});

export default Profile;
