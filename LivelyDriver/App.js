import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { ToastProvider } from "react-native-toast-notifications";
import * as Location from "expo-location";

const Stack = createStackNavigator();

export default function App() {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   let subscription;

  //   const startWatching = async () => {
  //     // Request permissions
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     // Watch location changes
  //     subscription = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.High,
  //         timeInterval: 1000, // Update interval in milliseconds
  //         distanceInterval: 1, // Minimum distance in meters between updates
  //       },
  //       (newLocation) => {
  //         setLocation(newLocation.coords);
  //         console.log(`location change in setLocation`);
  //       }
  //     );
  //   };

  //   startWatching();

  //   // Cleanup subscription on unmount
  //   return () => {
  //     if (subscription) {
  //       subscription.remove();
  //     }
  //   };
  // }, []);

  // let text = "Waiting...";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  //   // console.log(text);
  // }
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
