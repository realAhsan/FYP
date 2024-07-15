import { View, Text } from "react-native";
import React from "react";

import MapScreen from "./MapScreen";

export default function TrackingScreen({ route }) {
  const { busNo } = route.params;
  console.log(`Tracking Screen:`, busNo);
  return <MapScreen busNo={busNo} />;
}
