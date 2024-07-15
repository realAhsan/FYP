// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Switch, Image } from "react-native";
// import * as Location from "expo-location";
// import axios from "axios";

// const HomeScreen = ({ route }) => {
//   const { driver } = route.params;
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [busNo, setBusNo] = useState(driver.bus.busNo);
//   const [initialLocation, setInitialLocation] = useState(null);

//   const toggleSwitch = () => {
//     setIsEnabled((previousState) => !previousState);
//   };
//   console.log(busNo);
//   useEffect(() => {
//     let locationSubscription;

//     const startLocationUpdates = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = currentLocation.coords;
//       setInitialLocation({ latitude, longitude });
//       sendLocationToServer(latitude, longitude, true, false);
//       console.log(`Initial Location`, initialLocation);
//       locationSubscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 2000,
//           distanceInterval: 10,
//         },
//         (location) => {
//           const { latitude, longitude } = location.coords;
//           sendLocationToServer(latitude, longitude, false, false);
//           console.log(`location is sending from here`);
//         }
//       );
//     };

//     if (isEnabled) {
//       const interval = setInterval(() => {
//         // Code to run every 2 seconds
//         startLocationUpdates();
//         console.log("This will run every 2 seconds");
//       }, 2000);
//     } else {
//       if (locationSubscription) {
//         locationSubscription.remove();
//         sendLocationToServer(null, null, false, true);
//       }
//     }

//     return () => {
//       if (locationSubscription) {
//         locationSubscription.remove();
//       }
//     };
//   }, [isEnabled]);

//   const sendLocationToServer = async (
//     latitude,
//     longitude,
//     isFirstLocation,
//     isOffline
//   ) => {
//     const data = {
//       StartLocation: isFirstLocation
//         ? {
//             longitude: initialLocation?.longitude,
//             latitude: initialLocation?.latitude,
//           }
//         : initialLocation,
//       CurrentLocation: { longitude, latitude },
//       Status: isOffline ? "Offline" : isEnabled ? "Online" : "Offline",
//     };

//     try {
//       const response = await axios.post(
//         `http://192.168.0.106:8000/location/${busNo}`,
//         data
//       );
//       console.log("Location sent:", response.data);
//     } catch (error) {
//       console.error("Error sending location to server:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/logo/logo.jpeg")} style={styles.logo} />
//       <Text style={styles.title}>Lively</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.label}>{isEnabled ? "Online" : "Offline"}</Text>
//         <Switch
//           trackColor={{ false: "#767577", true: "#0AA244" }}
//           thumbColor={isEnabled ? "#fff" : "#fff"}
//           ios_backgroundColor="#000"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//           style={styles.switch}
//         />
//       </View>
//       <Text style={styles.status}>
//         Your are now {isEnabled ? "online" : "Ofline"}
//       </Text>
//       <Text style={styles.driverInfo}>Driver: {driver.name}</Text>
//       <Text style={styles.driverInfo}>Email: {driver.email}</Text>
//       <Text style={styles.driverInfo}>Bus No: {busNo}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: "#000",
//     marginRight: 10,
//   },
//   switch: {
//     transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
//   },
//   status: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
//   driverInfo: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
// });

// export default HomeScreen;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Sending Location part is working very Well but switch is not wrking

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Switch, Image } from "react-native";
// import * as Location from "expo-location";
// import axios from "axios";

// const HomeScreen = ({ route }) => {
//   const { driver } = route.params;
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [busNo, setBusNo] = useState(driver.bus.busNo);
//   const [initialLocation, setInitialLocation] = useState(null);

//   const toggleSwitch = () => {
//     setIsEnabled((previousState) => !previousState);
//   };

//   useEffect(() => {
//     let locationSubscription;
//     let interval;

//     const startLocationUpdates = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = currentLocation.coords;
//       setInitialLocation({ latitude, longitude });
//       sendLocationToServer(latitude, longitude, true, false);

//       locationSubscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 2000,
//           distanceInterval: 10,
//         },
//         (location) => {
//           const { latitude, longitude } = location.coords;
//           sendLocationToServer(latitude, longitude, false, false);
//         }
//       );
//     };

//     const stopLocationUpdates = () => {
//       if (locationSubscription) {
//         locationSubscription.remove();
//       }
//       sendLocationToServer(null, null, false, true);
//     };

//     if (isEnabled) {
//       startLocationUpdates();
//       interval = setInterval(() => {
//         startLocationUpdates();
//       }, 2000);
//     } else {
//       clearInterval(interval);
//       stopLocationUpdates();
//     }

//     return () => {
//       clearInterval(interval);
//       if (locationSubscription) {
//         locationSubscription.remove();
//       }
//     };
//   }, [isEnabled]);

//   const sendLocationToServer = async (
//     latitude,
//     longitude,
//     isFirstLocation,
//     isOffline
//   ) => {
//     const data = {
//       StartLocation: isFirstLocation
//         ? {
//             longitude: initialLocation?.longitude,
//             latitude: initialLocation?.latitude,
//           }
//         : initialLocation,
//       CurrentLocation: { longitude, latitude },
//       Status: isOffline ? "Offline" : isEnabled ? "Online" : "Offline",
//     };

//     try {
//       const response = await axios.post(
//         `http://192.168.0.106:8000/location/${busNo}`,
//         data
//       );
//       console.log("Location sent:", response.data);
//     } catch (error) {
//       console.error("Error sending location to server:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/logo/logo.jpeg")} style={styles.logo} />
//       <Text style={styles.title}>Lively</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.label}>{isEnabled ? "Online" : "Offline"}</Text>
//         <Switch
//           trackColor={{ false: "#767577", true: "#0AA244" }}
//           thumbColor={isEnabled ? "#fff" : "#fff"}
//           ios_backgroundColor="#000"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//           style={styles.switch}
//         />
//       </View>
//       <Text style={styles.status}>
//         Your are now {isEnabled ? "online" : "Offline"}
//       </Text>
//       <Text style={styles.driverInfo}>Driver: {driver.name}</Text>
//       <Text style={styles.driverInfo}>Email: {driver.email}</Text>
//       <Text style={styles.driverInfo}>Bus No: {busNo}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: "#000",
//     marginRight: 10,
//   },
//   switch: {
//     transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
//   },
//   status: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
//   driverInfo: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////trying myself from this code///////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export default HomeScreen;
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Switch, Image } from "react-native";
// import * as Location from "expo-location";
// import axios from "axios";

// const HomeScreen = ({ route }) => {
//   const { driver } = route.params;
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [busNo, setBusNo] = useState(driver.bus.busNo);
//   const [initialLocation, setInitialLocation] = useState(null);
//   const [startLocation, setstartLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   const [locationSubscription, setLocationSubscription] = useState(null);
//   const toggleSwitch = () => {
//     setIsEnabled((previousState) => !previousState);
//   };
//   console.log(isEnabled);

//   if (isEnabled) {
//     console.log(`Switched On`);
//   } else {
//     console.log(`switched off`);
//   }
//   useEffect(() => {
//     console.log(`Effect changes`);
//     const startLocationUpdates = async () => {
//       // Request permission to access location
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       // Get current location
//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = currentLocation.coords;
//       setstartLocation({
//         latitude: latitude,
//         longitude: longitude,
//       });
//       setInitialLocation({ latitude, longitude });
//       sendLocationToServer(latitude, longitude, true, false);

//       // Start location updates
//       const subscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 2000,
//           distanceInterval: 10,
//         },
//         (location) => {
//           const { latitude, longitude } = location.coords;
//           sendLocationToServer(latitude, longitude, false, false);
//         }
//       );
//       setLocationSubscription(subscription);
//     };

//     const stopLocationUpdates = () => {
//       if (locationSubscription) {
//         locationSubscription.remove();
//         setLocationSubscription(null);
//         sendLocationToServer(null, null, false, true);
//       }
//     };

//     if (isEnabled) {
//       startLocationUpdates();
//       console.log(`sending location updates`);
//     } else {
//       stopLocationUpdates();
//       console.log(`Stopping location updates`);
//     }

//     return () => {
//       stopLocationUpdates();
//     };
//   }, [isEnabled]);

//   const sendLocationToServer = async (
//     latitude,
//     longitude,
//     isFirstLocation,
//     isOffline
//   ) => {
//     const data = {
//       StartLocation: startLocation,
//       CurrentLocation: { longitude, latitude },
//       Status: "Online",
//     };
//     const oflineData = {
//       StartLocation: { longitude: 0, latitude: 0 },
//       CurrentLocation: { longitude: 0, latitude: 0 },
//       Status: "Offline",
//     };
//     try {
//       if (isEnabled) {
//         const response = await axios.post(
//           `http://192.168.0.106:8000/location/${busNo}`,
//           data
//         );
//         console.log("Location sent:", response.data);
//       } else {
//         const response = await axios.post(
//           `http://192.168.0.106:8000/location/${busNo}`,
//           oflineData
//         );
//         console.log("Location sent:", response.data);
//       }
//     } catch (error) {
//       console.error("Error sending location to server:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/logo/logo.jpeg")} style={styles.logo} />
//       <Text style={styles.title}>Lively</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.label}>{isEnabled ? "Online" : "Offline"}</Text>
//         <Switch
//           trackColor={{ false: "#767577", true: "#0AA244" }}
//           thumbColor={isEnabled ? "#fff" : "#fff"}
//           ios_backgroundColor="#000"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//           style={styles.switch}
//         />
//       </View>
//       <Text style={styles.status}>
//         You are now {isEnabled ? "online" : "offline"}
//       </Text>
//       <Text style={styles.driverInfo}>Driver: {driver.name}</Text>
//       <Text style={styles.driverInfo}>Email: {driver.email}</Text>
//       <Text style={styles.driverInfo}>Bus No: {busNo}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: "#000",
//     marginRight: 10,
//   },
//   switch: {
//     transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
//   },
//   status: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
//   driverInfo: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
// });

// export default HomeScreen;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////trying myself  this code///////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Switch, Image } from "react-native";
// import * as Location from "expo-location";
// import axios from "axios";

// const HomeScreen = ({ route }) => {
//   const { driver } = route.params;
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [busNo, setBusNo] = useState(driver.bus.busNo);
//   const [initialLocation, setInitialLocation] = useState(null);

//   const toggleSwitch = () => {
//     setIsEnabled((previousState) => !previousState);
//   };
//   console.log(busNo);
//   useEffect(() => {
//     let locationSubscription;

//     const startLocationUpdates = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = currentLocation.coords;
//       setInitialLocation({ latitude, longitude });
//       sendLocationToServer(latitude, longitude, true, false);
//       console.log(`Initial Location`, initialLocation);
//       locationSubscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 2000,
//           distanceInterval: 10,
//         },
//         (location) => {
//           const { latitude, longitude } = location.coords;
//           sendLocationToServer(latitude, longitude, false, false);
//           console.log(`location is sending from here`);
//         }
//       );
//     };

//     if (isEnabled) {
//       const interval = setInterval(() => {
//         // Code to run every 2 seconds
//         startLocationUpdates();
//         console.log("This will run every 2 seconds");
//       }, 2000);
//     } else {
//       if (locationSubscription) {
//         locationSubscription.remove();
//         sendLocationToServer(null, null, false, true);
//       }
//     }

//     return () => {
//       if (locationSubscription) {
//         locationSubscription.remove();
//       }
//     };
//   }, [isEnabled]);

//   const sendLocationToServer = async (
//     latitude,
//     longitude,
//     isFirstLocation,
//     isOffline
//   ) => {
//     const data = {
//       StartLocation: isFirstLocation
//         ? {
//             longitude: initialLocation?.longitude,
//             latitude: initialLocation?.latitude,
//           }
//         : initialLocation,
//       CurrentLocation: { longitude, latitude },
//       Status: isOffline ? "Offline" : isEnabled ? "Online" : "Offline",
//     };

//     try {
//       const response = await axios.post(
//         `http://192.168.0.106:8000/location/${busNo}`,
//         data
//       );
//       console.log("Location sent:", response.data);
//     } catch (error) {
//       console.error("Error sending location to server:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/logo/logo.jpeg")} style={styles.logo} />
//       <Text style={styles.title}>Lively</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.label}>{isEnabled ? "Online" : "Offline"}</Text>
//         <Switch
//           trackColor={{ false: "#767577", true: "#0AA244" }}
//           thumbColor={isEnabled ? "#fff" : "#fff"}
//           ios_backgroundColor="#000"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//           style={styles.switch}
//         />
//       </View>
//       <Text style={styles.status}>
//         Your are now {isEnabled ? "online" : "Ofline"}
//       </Text>
//       <Text style={styles.driverInfo}>Driver: {driver.name}</Text>
//       <Text style={styles.driverInfo}>Email: {driver.email}</Text>
//       <Text style={styles.driverInfo}>Bus No: {busNo}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: "#000",
//     marginRight: 10,
//   },
//   switch: {
//     transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
//   },
//   status: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
//   driverInfo: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
// });

// export default HomeScreen;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Sending Location part is working very Well but switch is not wrking

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Image } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const HomeScreen = ({ route }) => {
  const { driver } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const [busNo, setBusNo] = useState(driver.bus.busNo);
  const [initialLocation, setInitialLocation] = useState(null);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  if (isEnabled) {
    console.log(`enabled`);
  } else {
    console.log(`Disabled`);
  }

  useEffect(() => {
    let locationSubscription;
    let interval;

    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setInitialLocation({ latitude, longitude });
      sendLocationToServer(latitude, longitude, true, false);

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          sendLocationToServer(latitude, longitude, false, false);
        }
      );
    };

    const stopLocationUpdates = () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      sendLocationToServer(null, null, false, true);
    };

    if (isEnabled) {
      startLocationUpdates();
      interval = setInterval(() => {
        startLocationUpdates();
      }, 2000);
    } else {
      clearInterval(interval);
      stopLocationUpdates();
    }

    return () => {
      clearInterval(interval);
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isEnabled]);

  const sendLocationToServer = async (
    latitude,
    longitude,
    isFirstLocation,
    isOffline
  ) => {
    const data = {
      StartLocation: isFirstLocation
        ? {
            longitude: initialLocation?.longitude,
            latitude: initialLocation?.latitude,
          }
        : initialLocation,
      CurrentLocation: { longitude, latitude },
      Status: isOffline ? "Offline" : isEnabled ? "Online" : "Offline",
    };
    if (isEnabled) {
      try {
        const response = await axios.post(
          `http://10.140.48.209:8000/location/${busNo}`,
          data
        );
        console.log("Location sent:", response.data);
      } catch (error) {
        console.error("Error sending location to server:", error);
      }
    } else {
      const offdata = {
        StartLocation: 0,
        CurrentLocation: 0,
        Status: "Offline",
      };
      try {
        const response = await axios.post(
          `http://10.140.48.209:8000/location/${busNo}`,
          offdata
        );
        console.log("Location sending stop:", response.data);
      } catch (error) {
        console.error("Error sending location to server:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo/logo.jpeg")} style={styles.logo} />
      <Text style={styles.title}>Lively</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{isEnabled ? "Online" : "Offline"}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#0AA244" }}
          thumbColor={isEnabled ? "#fff" : "#fff"}
          ios_backgroundColor="#000"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </View>
      <Text style={styles.status}>
        Your are now {isEnabled ? "online" : "Offline"}
      </Text>
      <Text style={styles.driverInfo}>Driver: {driver.name}</Text>
      <Text style={styles.driverInfo}>Email: {driver.email}</Text>
      <Text style={styles.driverInfo}>Bus No: {busNo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    color: "#000",
    marginRight: 10,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  status: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  driverInfo: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
});

export default HomeScreen;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Switch, Image } from "react-native";
// import * as Location from "expo-location";
// import axios from "axios";

// const HomeScreen = ({ route }) => {
//   const { driver } = route.params;
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [busNo, setBusNo] = useState(driver.bus.busNo);
//   const [initialLocation, setInitialLocation] = useState(null);
//   const [startLocation, setstartLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   const [locationSubscription, setLocationSubscription] = useState(null);
//   const toggleSwitch = () => {
//     setIsEnabled((previousState) => !previousState);
//   };
//   console.log(isEnabled);

//   if (isEnabled) {
//     console.log(`Switched On`);
//   } else {
//     console.log(`switched off`);
//   }
//   useEffect(() => {
//     console.log(`Effect changes`);
//     const startLocationUpdates = async () => {
//       // Request permission to access location
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       // Get current location
//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = currentLocation.coords;
//       setstartLocation({
//         latitude: latitude,
//         longitude: longitude,
//       });
//       setInitialLocation({ latitude, longitude });
//       sendLocationToServer(latitude, longitude, true, false);

//       // Start location updates
//       const subscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 2000,
//           distanceInterval: 10,
//         },
//         (location) => {
//           const { latitude, longitude } = location.coords;
//           sendLocationToServer(latitude, longitude, false, false);
//         }
//       );
//       setLocationSubscription(subscription);
//     };

//     const stopLocationUpdates = () => {
//       if (locationSubscription) {
//         locationSubscription.remove();
//         setLocationSubscription(null);
//         sendLocationToServer(null, null, false, true);
//       }
//     };

//     if (isEnabled) {
//       startLocationUpdates();

//       console.log(`sending location updates`);
//     } else {
//       stopLocationUpdates();
//       console.log(`Stopping location updates`);
//     }

//     return () => {
//       stopLocationUpdates();
//     };
//   }, [isEnabled]);

//   const sendLocationToServer = async (
//     latitude,
//     longitude,
//     isFirstLocation,
//     isOffline
//   ) => {
//     const data = {
//       StartLocation: startLocation,
//       CurrentLocation: { longitude, latitude },
//       Status: "Online",
//     };
//     const oflineData = {
//       StartLocation: { longitude: 0, latitude: 0 },
//       CurrentLocation: { longitude: 0, latitude: 0 },
//       Status: "Offline",
//     };
//     try {
//       if (isEnabled) {
//         const response = await axios.post(
//           `http://192.168.0.106:8000/location/${busNo}`,
//           data
//         );
//         console.log("Location sent:", response.data);
//       } else {
//         const response = await axios.post(
//           `http://192.168.0.106:8000/location/${busNo}`,
//           oflineData
//         );
//         console.log("Location sent:", response.data);
//       }
//     } catch (error) {
//       console.error("Error sending location to server:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/logo/logo.jpeg")} style={styles.logo} />
//       <Text style={styles.title}>Lively</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.label}>{isEnabled ? "Online" : "Offline"}</Text>
//         <Switch
//           trackColor={{ false: "#767577", true: "#0AA244" }}
//           thumbColor={isEnabled ? "#fff" : "#fff"}
//           ios_backgroundColor="#000"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//           style={styles.switch}
//         />
//       </View>
//       <Text style={styles.status}>
//         You are now {isEnabled ? "online" : "offline"}
//       </Text>
//       <Text style={styles.driverInfo}>Driver: {driver.name}</Text>
//       <Text style={styles.driverInfo}>Email: {driver.email}</Text>
//       <Text style={styles.driverInfo}>Bus No: {busNo}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: "#000",
//     marginRight: 10,
//   },
//   switch: {
//     transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
//   },
//   status: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
//   driverInfo: {
//     fontSize: 16,
//     color: "#000",
//     marginTop: 10,
//   },
// });

// export default HomeScreen;

// ///////////////////////////////////////////////////////////////////////////////////////////
