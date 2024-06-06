// import { Image, StyleSheet, Platform,Button,Text,PermissionsAndroid,View,TouchableOpacity,Pressable} from 'react-native';
// import { useState,useEffect } from 'react';
// import Geolocation from 'react-native-geolocation-service';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

// import React, {useState, useEffect} from 'react';
// import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';


import React, { useState, useEffect } from "react";
 
import { Platform, Text, View, StyleSheet } from "react-native";
 
import * as Location from "expo-location";

const API_KEY  = "d01d6de9a51e8661a4d9d61c12a89372";

const API_call =  "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

// Function to get permission for location
// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Geolocation Permission',
//         message: 'Can we access your location?',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     console.log('granted', granted);
//     if (granted === 'granted') {
//       console.log('You can use Geolocation');
//       return true;
//     } else {
//       console.log('You cannot use Geolocation');
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };

const temperature = "weatherData && weatherData.main.temp + ˚F"


export default function HomeScreen() {
  // state to hold location
  //const [location, setLocation] = useState(false);
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [tempUnit,setTempUnit] = useState("");
  useEffect(() => {
 
    const DataLocation = async () => {
 
      let { status } = await Location.requestForegroundPermissionsAsync();
 
      if (status !== "granted") {
 
        setErrorMsg("Permission to access location was denied");
 
        return;
 
      }
 
      let location = await Location.getCurrentPositionAsync({});
 
      setLocation(location);
 
      console.log("First log: " + JSON.stringify(location), "tanusree");
 
    };
 
    DataLocation();
 
  }, []);
 
  async function fectWeatherData(location) {
 
    let lat = location.coords.latitude;
 
    let long = location.coords.longitude;
 
    console.log("Second log: " + lat, long);
 
    setLoaded(false);
 
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;
 
    console.log("Third log: " +  API);
 
    try {
 
      const response = await fetch(API);
 
      if (response.status == 200) {
 
        const data = await response.json();
 
        console.log("Fourth log: " +  JSON.stringify(data), "12");
 
        setWeatherData(data);
        setTempUnit("˚F");
 
      } else {
 
        setWeatherData(null);
 
      }
 
      setLoaded(true);
 
    } catch (error) {
 
      console.log(error);
 
    }
 
  }
 
  useEffect(() => {
 
    fectWeatherData(location);
 
    console.log("Fifth log: " + weatherData, "345");
 
  }, [location]);

  // function to check permissions and get the Location
  // const getLocation = () => {
 
  //   const result = requestLocationPermission();
 
  //   result.then(res => {
 
  //     console.log('res is:', res);
 
  //     if (res) {
 
  //       Geolocation.getCurrentPosition(
 
  //         position => {
 
  //           console.log(position);
 
  //           setLocation(position);
 
  //         },
 
  //         error => {
 
  //           // See error code charts below.
 
  //           console.log(error.code, error.message);
 
  //           setLocation(false);
 
  //         },
 
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
 
  //       );
 
  //     }
 
  //   });
 
  //   console.log(location);
 
  // };




 
  return (
    
  //   <View style={styles.container}>
  //   <Text>Welcome!</Text>
  //   <View
  //     style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
  //     <Button title="Get Location" onPress={getLocation} />
  //   </View>
  //   <Text>Latitude: {location ? location.coords.latitude : null}</Text>
  //   <Text>Longitude: {location ? location.coords.longitude : null}</Text>
   
  // </View>
  
  <View style={styles.weatherContainer}>

        <View style={styles.headerContainer}>
  
          <Text style={styles.tempText}>
  
            {weatherData && weatherData.main.temp}{tempUnit}
  
          </Text>
  
        </View>
  
        <View
  
          style={{
  
            flex: 1,
  
            justifyContent: "flex-end",
  
            marginLeft: 30,
  
            marginBottom: 40,
  
          }}
  
        >
  
          <Text style={{ fontSize: 40, color: "#FFFFFF" }}>
  
            {weatherData && weatherData.weather[0].main}
  
          </Text>
  
          <Text style={{ fontSize: 20, color: "#FFFFFF" }}>
  
            {weatherData && weatherData.weather[0].description}
  
          </Text>
  
        </View>
  
      </View>
  
    
    
   
  

  );
  

};
const styles = StyleSheet.create({
  // titleContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 8,
  // },
  // reactLogo: {
  //   height: 178,
  //   width: 290,
  //   bottom: 0,
  //   left: 0,
  //   position: 'absolute',
  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  // geobutton_view: {
  //   marginTop: 10, 
  //   padding: 10, 
  //   borderRadius: 10, 
  //   // width: '150px',
  //   // height:'100px',
  //   alignItems: 'center',
  //   justifyContent: 'center',
    
    
    
  // },
   weatherContainer: {

        flex: 1,
    
        backgroundColor: "#C4B454",
    
      },
    
      headerContainer: {
    
        flexDirection: "row",
    
        marginTop: 100,
    
        justifyContent: "space-around",
    
      },
    
      tempText: {
    
        fontSize: 72,
    
        color: "#FFFFFF",
    
      },
  
});
