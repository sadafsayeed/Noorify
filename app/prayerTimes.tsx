import { Text, Alert, View } from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as Location from "expo-location";


type PrayerTimesType={
  Fajr: string,
  Sunrise: string,
  Dhuhr: string,
  Asr: string,
  Maghrib: string,
  Isha: string
}

export default function prayerTimes() {
  const [url, setUrl] = useState("Loading...");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesType | null>(null);
  useEffect(()=>{
    checkIfLocationEnabled();
    getCurrentLocation();
   
  }, [])

  const checkIfLocationEnabled = async ()=>{
    let enabled = await Location.hasServicesEnabledAsync();
    if(!enabled){
      Alert.alert("Location not enabled", "Please enable your location", [
        {
          text: "Cancel", onPress: ()=> console.log("Cancel Pressed"), style: "cancel",
        },
        {
          text:"OK", onPress:()=>console.log("OK pressed")
        },
      ]);
    }else{
      setLocationEnabled(enabled)
    }
  }
  
  const getCurrentLocation = async()=>{
    await Location.requestForegroundPermissionsAsync();
    let {status} = await Location.requestBackgroundPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert('Permission denied', 'Allow the app to use the location services', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async() => {
          console.log('OK Pressed');
        }},
      ]);
    } else if(status === "granted"){
      const {coords} = await Location.getCurrentPositionAsync();
      if(coords){
        const {latitude,longitude} = coords;
        const rawData = await axios.get("https://api.aladhan.com/v1/timings",{
          params:{
            latitude,
            longitude,
            method: 2, //2=ISNA
          }
        })

        const {Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha} = rawData.data.data.timings;
        console.log(rawData.data.data.timings);
        setPrayerTimes({Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha});
      
        let response = await Location.reverseGeocodeAsync({latitude, longitude});
        const city = response[0].city;
        const region = response[0].region;
        const country = response[0].country;

        const link = `https://salattimes.com/${city.toLowerCase()}-${region.toLowerCase()}-${country.toLowerCase().replace(" ","-")}/`;
        setUrl(link);
      } 
    }    
  }


  return(
    <View>
      <Text>{url}</Text>
      {prayerTimes ?(
        <View>
          <Text>Fajr: {prayerTimes.Fajr}</Text>
          <Text>Sunrise: {prayerTimes.Sunrise}</Text>
          <Text>Dhuhr: {prayerTimes.Dhuhr}</Text>
          <Text>Asr: {prayerTimes.Asr}</Text>
          <Text>Maghrib: {prayerTimes.Maghrib}</Text>
          <Text>Isha: {prayerTimes.Isha}</Text>
        </View>
      ):(
        <Text>Loading prayer times.....</Text>
      )}
      

    </View>
  )

}
