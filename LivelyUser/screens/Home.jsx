// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Linking,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

// export default function Home() {
//   const navigation = useNavigation();
//   const handlePress = () => {
//     // Replace with your URL
//     const url = "https://www.google.com/";
//     Linking.openURL(url);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Never miss your</Text>
//         <Text style={styles.headerText}>Bus Again with Lively</Text>
//         <Text style={styles.subHeaderText}>Find, Track and Catch</Text>
//         {/* <TouchableOpacity style={styles.locationButton}>
//           <Text style={styles.locationButtonText}>Turn on location</Text>
//         </TouchableOpacity> */}
//       </View>
//       <View style={styles.features}>
//         <TouchableOpacity
//           style={styles.featureButton}
//           onPress={() => navigation.navigate("Search")}
//         >
//           <View style={styles.shadowContainer}>
//             <Image
//               source={require("../assets/images/track.png")}
//               style={styles.featureImage}
//             />
//           </View>
//           <Text style={styles.featureText}>Track</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.featureButton} onPress={handlePress}>
//           <Image
//             source={require("../assets/images/timetable.png")}
//             style={styles.featureImage}
//           />
//           <Text style={styles.featureText}>Timetable</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity onPress={() => navigation.navigate("Search")}>
//         <View style={styles.searchContainer}>
//           <Text style={styles.searchBar}>Search Bus</Text>
//           <Icon name="search" size={24} color="black" />
//         </View>
//       </TouchableOpacity>
//       <View style={styles.mapContainer}>
//         <Text style={styles.mapTitle}>Find Your Bus</Text>
//         <Image
//           source={require("../assets/images/map.png")}
//           style={styles.mapImage}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: 40,
//   },
//   header: {
//     backgroundColor: "#61C489",
//     padding: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingVertical: 40,
//     marginBottom: 30,
//   },
//   headerText: {
//     fontSize: 24,
//     color: "white",
//     fontWeight: "bold",
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: "white",
//     marginBottom: 20,
//   },
//   locationButton: {
//     backgroundColor: "black",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     alignSelf: "flex-start",
//   },
//   locationButtonText: {
//     color: "white",
//     fontSize: 14,
//   },
//   features: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 20,
//   },
//   featureButton: {
//     alignItems: "center",
//   },
//   featureImage: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
//   featureText: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   searchContainer: {
//     marginHorizontal: 20,
//     marginBottom: 20,
//     backgroundColor: "#DFDFDF",
//     padding: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderRadius: 10,
//   },
//   searchBar: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   mapContainer: {
//     flex: 1,
//     marginHorizontal: 20,
//   },
//   mapTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   mapImage: {
//     width: "100%",
//     height: 250,
//     borderRadius: 20,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: "gray",
//   },
//   navButton: {
//     alignItems: "center",
//   },
//   navIcon: {
//     width: 24,
//     height: 24,
//     marginBottom: 5,
//   },
//   navText: {
//     fontSize: 12,
//   },
// });
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Home() {
  const navigation = useNavigation();
  const handlePress = () => {
    // Replace with your URL
    const url = "https://www.google.com/";
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Never miss your</Text>
          <Text style={styles.headerText}>Bus Again with Lively</Text>
          <Text style={styles.subHeaderText}>Find, Track and Catch</Text>
          {/* <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationButtonText}>Turn on location</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.features}>
          <TouchableOpacity
            style={styles.featureButton}
            onPress={() => navigation.navigate("Search")}
          >
            <View style={styles.shadowContainer}>
              <Image
                source={require("../assets/images/track.png")}
                style={styles.featureImage}
              />
            </View>
            <Text style={styles.featureText}>Track</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton} onPress={handlePress}>
            <Image
              source={require("../assets/images/timetable.png")}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Timetable</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchBar}>Search Bus</Text>
            <Icon name="search" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Find Your Bus</Text>
          <Image
            source={require("../assets/images/map.png")}
            style={styles.mapImage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  header: {
    backgroundColor: "#61C489",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 40,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  locationButtonText: {
    color: "white",
    fontSize: 14,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  featureButton: {
    alignItems: "center",
  },
  featureImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#DFDFDF",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  searchBar: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mapImage: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  navButton: {
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
  },
});
