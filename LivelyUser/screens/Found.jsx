import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";

const Found = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { busNoObj } = route.params;
  const busNo = busNoObj;

  const [busData, setBusData] = useState(null);
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const busResponse = await fetch(`${API_URL}/bus/${busNo}`);
        const busJson = await busResponse.json();
        setBusData(busJson);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    const fetchDriverData = async () => {
      try {
        // const driverResponse = await fetch(`${API_URL}/driver/${busNo}`);
        const driverResponse = await fetch(
          `http://10.140.48.209:8000/driver/${busNo}`
        );

        const driverJson = await driverResponse.json();
        setDriverData(driverJson);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    Promise.all([fetchBusData(), fetchDriverData()]).then(() =>
      setLoading(false)
    );
  }, [busNo]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FF47" />
      </View>
    );
  }

  if (!busData || !driverData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }

  const handleNavigate = async () => {
    try {
      const response = await axios
        // .get(`${API_URL}/location/${busData.busNo}`);
        .get(`http://10.140.48.209:8000/location/${busData.busNo}`);

      const { Status } = response.data;

      if (Status === "Online") {
        navigation.navigate("Tracking", { busNo: busData.busNo });
      } else {
        Toast.show("Bus is Offline and cannot be Tracked at this moment", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while fetching the bus status.",
      });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.busNumber}>Bus No. {busData.busNo}</Text>
          <Text style={styles.driverLabel}>Driver</Text>
          <Text style={styles.driverName}>{driverData.name}</Text>
          <Text style={styles.driverPhone}>{driverData.contactNo}</Text>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeLabel}>Route</Text>
            <TouchableOpacity
              style={styles.track}
              // onPress={() => navigation.navigate("Tracking")}
              onPress={handleNavigate}
            >
              <Ionicons
                name="location"
                size={24}
                color="black"
                style={styles.trackIcon}
              />
              <Text>Track</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.routeDetail}>Destination</Text>
          <Text style={styles.routeValue}>{busData.route.endPoint}</Text>

          <Text style={styles.routeDetail}>Start Point</Text>
          <Text style={styles.routeValue}>{busData.route.startPoint}</Text>

          <Text style={styles.timingsLabel}>Timings</Text>
          {busData.busTimings.departure.map((time, index) => (
            <Text key={index} style={styles.timing}>
              • {time} - {busData.busTimings.arrival[index]}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#000000",
    padding: 20,
    paddingVertical: 80,
    alignItems: "center",
  },
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  busNumber: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  track: {
    alignItems: "center",
    justifyContent: "center",
  },
  driverLabel: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  driverName: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  driverPhone: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  routeContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -20,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },
  trackIcon: {
    marginRight: 10,
    borderColor: "#000",
    borderWidth: 2,
    padding: 15,
    borderRadius: 50,
  },
  routeDetail: {
    fontSize: 18,
    marginTop: 10,
  },
  routeValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  timingsLabel: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  timing: {
    fontSize: 18,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default Found;
