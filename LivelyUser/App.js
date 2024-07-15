import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";
import AuthScreen from "./screens/AuthScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import HelpScreen from "./screens/HelpScreen";
import AboutScreen from "./screens/AboutScreen";
import SearchScreen from "./screens/SearchScreen";
import ComplaintScreen from "./screens/ComplaintScreen";
import ActivationScreen from "./screens/ActivationScreen";
import TabsLayout from "./screens/tabs/TabsLayout";
import NotFound from "./screens/NotFound";
import Found from "./screens/Found";
import TrackingScreen from "./screens/TrackingScreen";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(`The status of authorization is ${isLoggedIn}`);

  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Tabs">
                {(props) => (
                  <TabsLayout {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
              />
              <Stack.Screen name="Help" component={HelpScreen} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="NotFound" component={NotFound} />
              <Stack.Screen name="Found" component={Found} />
              <Stack.Screen name="Tracking" component={TrackingScreen} />
              <Stack.Screen name="Complaint" component={ComplaintScreen} />
            </>
          ) : (
            <Stack.Screen
              name="Auth"
              options={{ presentation: "modal" }}
              children={() => <AuthStack setIsLoggedIn={setIsLoggedIn} />}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Login">
        {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ActivationScreen" component={ActivationScreen} />
    </Stack.Navigator>
  );
}
