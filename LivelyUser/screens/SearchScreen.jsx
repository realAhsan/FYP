// SearchScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/Ionicons";
import { API_URL } from "@env";
const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadRecentSearches = async () => {
      const storedSearches =
        JSON.parse(await AsyncStorage.getItem("recentSearches")) || [];
      setRecentSearches(storedSearches);
    };

    loadRecentSearches();
  }, []);

  const handleSearch = async () => {
    try {
      console.log(searchQuery);
      if (searchQuery !== "") {
        const response = await axios
          // .get(`${API_URL}/bus/${searchQuery}`);
          .get(`http://10.140.48.209:8000/bus/${searchQuery}`);

        const busData = response.data;
        console.log(busData);
        console.log("bus 1");

        const updatedSearches = [
          { busNo: searchQuery, busData },
          ...recentSearches.slice(0, 4),
        ]; // Keep last 5 searches
        await AsyncStorage.setItem(
          "recentSearches",
          JSON.stringify(updatedSearches)
        );
        setRecentSearches(updatedSearches);
        navigation.navigate("Found", { busNoObj: searchQuery });

        setSearchQuery("");
      } else {
        Toast.show("Please enter Bus No");
      }
    } catch (error) {
      console.error("Error fetching bus details:", error);
      navigation.navigate("NotFound");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../assets/back.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/search.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Waiting for Search</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 60,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SearchScreen;
