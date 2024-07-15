// import React, { useState, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";

// const MapScreen = () => {
//   const [initialLocation, setInitialLocation] = useState({
//     latitude: 33.65971,
//     longitude: 73.022947,
//   });
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     // Simulate location updates every 2 seconds
//     const interval = setInterval(() => {
//       simulateLocationUpdate();
//       console.log("Updated after 2 sec");
//     }, 2000);

//     // Clear interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const simulateLocationUpdate = () => {
//     // Example: Simulating movement from initialLocation
//     const newLatitude = currentLocation
//       ? currentLocation.latitude + 0.01
//       : initialLocation.latitude;
//     const newLongitude = currentLocation
//       ? currentLocation.longitude + 0.01
//       : initialLocation.longitude;

//     setCurrentLocation({
//       latitude: newLatitude,
//       longitude: newLongitude,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: initialLocation.latitude,
//           longitude: initialLocation.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {initialLocation && (
//           <Marker coordinate={initialLocation} title="Start Location" />
//         )}
//         {currentLocation && (
//           <Marker coordinate={currentLocation} title="Current Location" />
//         )}
//         {initialLocation && currentLocation && (
//           <Polyline
//             coordinates={[initialLocation, currentLocation]}
//             strokeWidth={2}
//             strokeColor="#FF0000"
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Second Wroking with green line

// import React, { useState, useEffect, useRef } from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";

// const MapScreen = () => {
//   const mapRef = useRef(null);
//   const [initialLocation, setInitialLocation] = useState({
//     latitude: 33.65971,
//     longitude: 73.022947,
//   });
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     // Simulate location updates every 2 seconds
//     const interval = setInterval(() => {
//       simulateLocationUpdate();
//       console.log("Location Changed after 2 sec");
//     }, 2000);

//     // Clear interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const simulateLocationUpdate = () => {
//     // Example: Simulating movement from initialLocation
//     const newLatitude = currentLocation
//       ? currentLocation.latitude + 0.001
//       : initialLocation.latitude;
//     const newLongitude = currentLocation
//       ? currentLocation.longitude + 0.001
//       : initialLocation.longitude;

//     const newLocation = {
//       latitude: newLatitude,
//       longitude: newLongitude,
//     };

//     setCurrentLocation(newLocation);

//     // Animate the map to the new location
//     if (mapRef.current) {
//       mapRef.current.animateToRegion(
//         {
//           ...newLocation,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         },
//         1000 // duration in ms
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={{
//           latitude: initialLocation.latitude,
//           longitude: initialLocation.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {initialLocation && (
//           <Marker coordinate={initialLocation} title="Start Location" />
//         )}
//         {currentLocation && (
//           <Marker coordinate={currentLocation} title="Current Location" />
//         )}
//         {initialLocation && currentLocation && (
//           <Polyline
//             coordinates={[initialLocation, currentLocation]}
//             strokeWidth={3}
//             strokeColor="#00ff1a"
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Working Fine With moving marker and polyline moving
//*****
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";
// import { Ionicons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const MapScreen = () => {
//   const navigation = useNavigation();

//   const [initialLocation, setInitialLocation] = useState({
//     latitude: 33.65971,
//     longitude: 73.022947,
//   });
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [route, setRoute] = useState([initialLocation]);

//   useEffect(() => {
//     // Simulate location updates every 2 seconds
//     const interval = setInterval(() => {
//       simulateLocationUpdate();
//     }, 2000);

//     // Clear interval on component unmount
//     return () => clearInterval(interval);
//   }, [route]);

//   const simulateLocationUpdate = () => {
//     // Example: Simulating movement from initialLocation
//     const newLatitude = currentLocation
//       ? currentLocation.latitude - 0.001
//       : initialLocation.latitude;
//     const newLongitude = currentLocation
//       ? currentLocation.longitude - 0.001
//       : initialLocation.longitude;

//     const newLocation = {
//       latitude: newLatitude,
//       longitude: newLongitude,
//     };

//     setCurrentLocation(newLocation);
//     setRoute((prevRoute) => [...prevRoute, newLocation]);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("Search")}
//         style={styles.backButton}
//       >
//         <Ionicons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: initialLocation.latitude,
//           longitude: initialLocation.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker
//           coordinate={currentLocation || initialLocation}
//           title="Current Location"
//         />
//         <Polyline coordinates={route} strokeWidth={5} strokeColor="#00ff1a" />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backButton: {
//     position: "absolute",
//     top: 60,
//     left: 20,
//     zIndex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Best Version Since it is showing Bus location map moving and user current location 8/10
// export default MapScreen;
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";

// const MapScreen = () => {
//   const [initialLocation, setInitialLocation] = useState({
//     latitude: 33.65971,
//     longitude: 73.022947,
//   });
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [route, setRoute] = useState([initialLocation]);
//   const [region, setRegion] = useState({
//     latitude: initialLocation.latitude,
//     longitude: initialLocation.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   const userLocation = {
//     latitude: 33.654961,
//     longitude: 73.071093,
//   };

//   useEffect(() => {
//     // Simulate location updates every 2 seconds
//     const interval = setInterval(() => {
//       simulateLocationUpdate();
//     }, 2000);

//     // Clear interval on component unmount
//     return () => clearInterval(interval);
//   }, [route]);

//   const simulateLocationUpdate = () => {
//     // Example: Simulating movement from initialLocation
//     const newLatitude = currentLocation
//       ? currentLocation.latitude - 0.001
//       : initialLocation.latitude;
//     const newLongitude = currentLocation
//       ? currentLocation.longitude - 0.001
//       : initialLocation.longitude;

//     const newLocation = {
//       latitude: newLatitude,
//       longitude: newLongitude,
//     };

//     setCurrentLocation(newLocation);
//     setRoute((prevRoute) => [...prevRoute, newLocation]);
//     setRegion({
//       latitude: newLatitude,
//       longitude: newLongitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         region={region}
//         onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//       >
//         <Marker
//           coordinate={currentLocation || initialLocation}
//           title="Current Location"
//           //   image={require("../assets/marker.png")} // Path to your custom marker image
//         />
//         <Marker
//           coordinate={userLocation}
//           title="User Location"
//           pinColor="blue"
//         />
//         <Polyline coordinates={route} strokeWidth={5} strokeColor="#00ff1a" />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";

const MapScreen = ({ busNo }) => {
  // console.log(`MapSreen:`, busNo);
  const navigation = useNavigation();
  const [initialLocation, setInitialLocation] = useState({
    latitude: 33.654961,
    longitude: 73.071093,
  });
  // const [initialLocation, setInitialLocation] = useState(null);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [route, setRoute] = useState([initialLocation]);
  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);
  const userLocation = {
    latitude: 33.654961,
    longitude: 73.071093,
  };

  useEffect(() => {
    // Simulate location updates every 2 seconds
    const interval = setInterval(() => {
      simulateLocationUpdate();
      // fetchCurrentLocation();
    }, 2000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [route]);

  const simulateLocationUpdate = () => {
    setLoading(false);
    // Example: Simulating movement from initialLocation
    const newLatitude = currentLocation
      ? currentLocation.latitude - 0.001
      : initialLocation.latitude;
    const newLongitude = currentLocation
      ? currentLocation.longitude - 0.001
      : initialLocation.longitude;

    const newLocation = {
      latitude: newLatitude,
      longitude: newLongitude,
    };

    setCurrentLocation(newLocation);
    setRoute((prevRoute) => [...prevRoute, newLocation]);
    setRegion({
      latitude: newLatitude,
      longitude: newLongitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  const fetchCurrentLocation = async () => {
    try {
      // const response = await axios.get(`${API_URL}/location/${busNo}`);
      const response = await axios.get(
        `http://10.140.48.209:8000/location/${busNo}`
      );

      const { CurrentLocation, StartLocation, Status } = response.data;
      if (Status === "Offline" || Status === "offline") {
        console.log(`status`, Status);
        navigation.navigate("Search");
        Toast.show("Bus is Offline and cannot be Tracked at this moment", {
          type: "danger",
        });
      }
      (newlatitude = CurrentLocation.latitude),
        (newlongitude = CurrentLocation.longitude);
      const newLocation = {
        latitude: newlatitude,
        longitude: newlongitude,
      };
      setCurrentLocation({
        latitude: newlatitude,
        longitude: newlongitude,
      });
      setInitialLocation({
        latitude: StartLocation.latitude,
        longitude: StartLocation.longitude,
      });
      setRoute((prevRoute) => [...prevRoute, newLocation]);
      setRegion({
        latitude: newlatitude,
        longitude: newlongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        // latitudeDelta: 0.002, // Adjusted for street-level zoom
        // longitudeDelta: 0.002,
      });
      setLoading(false);

      console.log(`location updated`);
    } catch (error) {
      console.error("Error fetching current location:", error);
      setLoading(false);
    }
  };
  if (loading) {
    // Show loading indicator while fetching initial location
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#00FF47" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker
          coordinate={currentLocation || initialLocation}
          title="Current Location"
          image={require("../assets/images/marker.png")} // Path to your custom marker image
        />
        {/* <Marker
          coordinate={userLocation}
          title="User Location"
          pinColor="blue"
        /> */}
        <Polyline coordinates={route} strokeWidth={5} strokeColor="#00ff1a" />
        {/* {currentLocation && (
          <MapViewDirections
            origin={userLocation}
            destination={currentLocation}
            apikey="AIzaSyDBxZOX1W4sCLvsnxfGh0nZL_vd3gO2-tg" // Replace with your Google Maps API Key
            strokeWidth={6}
            strokeColor="hotpink"
          />
        )} */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
    paddingRight: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;

//////////////////////////////////////////////////////////////////////////////////////////////////////////
