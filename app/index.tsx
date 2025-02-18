import { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LegendList } from "@legendapp/list";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationName, setLocationName] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (Platform.OS === "android" && !Device.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
      );
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    setLocation(location);

    try {
      const results = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (results.length > 0) {
        const address = results[0];
        const locationString = [
          address.street,
          address.city,
          address.region,
          address.country,
        ]
          .filter(Boolean)
          .join(", ");
        setLocationName(locationString);
        setSearchQuery(locationString);
      } else {
        const coordString = `${location.coords.latitude.toFixed(
          6
        )}, ${location.coords.longitude.toFixed(6)}`;
        setLocationName(coordString);
        setSearchQuery(coordString);
      }
    } catch (error) {
      const coordString = `${location.coords.latitude.toFixed(
        6
      )}, ${location.coords.longitude.toFixed(6)}`;
      setLocationName(coordString);
      setSearchQuery(coordString);
    }
  };

  const handleLocationSearch = async () => {
    try {
      await Location.enableNetworkProviderAsync();
      const results = await Location.geocodeAsync(searchQuery);
      if (results.length > 0) {
        setLocation({
          coords: {
            latitude: results[0].latitude,
            longitude: results[0].longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
        setLocationName(searchQuery);
      }
    } catch (error) {
      Alert.alert("Error", "Could not find the location. Please try again.");
    }
  };

  const handleProductSearch = async () => {
    if (!location || !productQuery.trim()) {
      Alert.alert(
        "Error",
        "Please ensure location and search term are provided"
      );
      return;
    }

    try {
      const formattedQuery = productQuery.trim().replace(/\s+/g, "%20");
      const url = `https://yr338c15si.execute-api.ap-south-1.amazonaws.com/getQCResults?lat=${location.coords.latitude}&lon=${location.coords.longitude}&type=groupsearch&query=${formattedQuery}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch search results");
    }
  };

  return (
    <View className="flex-1">
      {errorMsg ? (
        <Text className="text-2xl text-red-500">{errorMsg}</Text>
      ) : null}
      <View className="bg-white p-4 space-y-2 shadow-sm">
        <View className="flex-row items-center space-x-2">
          <TextInput
            className="flex-1 bg-gray-100 p-2 rounded-lg"
            placeholder="Enter location...."
            value={locationName || searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleLocationSearch}
          />
          <TouchableOpacity onPress={getCurrentLocation}>
            <Ionicons name="location" size={24} color="#0066cc" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center my-3">
          <TextInput
            className="flex-1 bg-gray-100 p-2 rounded-lg"
            placeholder="Search for products..."
            value={productQuery}
            onChangeText={setProductQuery}
            onSubmitEditing={handleProductSearch}
          />
          <TouchableOpacity onPress={handleProductSearch}>
            <MaterialIcons
              name="local-grocery-store"
              size={24}
              color="#0066cc"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        <LegendList
          style={{ flex: 1, minHeight: 1 }}
          estimatedItemSize={500} // Increased from 386 to 500
          data={searchResults}
          renderItem={({ item }) => (
            <View className="bg-white m-4 rounded-lg shadow-sm overflow-hidden">
              {/* Main Product Image and Title */}
              <View className="p-4 border-b border-gray-100">
                <Image
                  source={{ uri: item.data[0].images[0] }}
                  className="w-full h-48 rounded-lg"
                  resizeMode="contain"
                />
                <Text className="text-lg font-semibold mt-2">
                  {item.data[0].name}
                </Text>
                {item.data[0].brand && (
                  <Text className="text-gray-600">{item.data[0].brand}</Text>
                )}
              </View>

              {/* Sellers List */}
              <View className="p-4">
                {item.data.map((seller, index) => (
                  <TouchableOpacity
                    key={seller.id || seller.xid}
                    onPress={() => Linking.openURL(seller.deeplink)}
                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                  >
                    <View className="flex-row items-center flex-1">
                      <Image
                        source={{ uri: seller.platform.icon }}
                        className="w-[90px] rounded-sm h-8  object-contain"
                      />
                      <View className="ml-3 flex-1">
                        <Text className="font-medium">
                          {seller.platform.name}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {seller.platform.sla} delivery
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="font-bold">₹{seller.offer_price}</Text>
                      {seller.mrp !== seller.offer_price && (
                        <Text className="text-xs text-gray-500 line-through">
                          ₹{seller.mrp}
                        </Text>
                      )}
                      <Text className="text-xs text-gray-600">
                        {seller.quantity}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
