import React from "react";
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, FlatList, Image } from "react-native";
import {Carousel} from "react-native-basic-carousel";
import { useRouter, Stack } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

const images= [
  { source: require("@/assets/images/shrek.jpg"), title: "Go to Quran", link: "/quranText" },
  { source: require("@/assets/images/SID.jpg"), title: "Go to Prayer Times", link: "/prayerTimes" },
  { source: require("@/assets/images/shrek2.jpg"), title: "Go to Kaaba Compass", link: "/kaabaCompass" },
  { source: require("@/assets/images/tom.jpg"), title: "Go to Arabic Calendar", link: "/islamicCalendar" },
  { source: require("@/assets/images/Donkie.jpg"), title: "Go to Forum Page", link: "/forumPage" },
  { source: require("@/assets/images/Donkie2.jpg"), title: "Go to Community Marketplace", link: "/communityMarketplace" },
];

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#25292e",
          },
          headerTintColor: "#fff",
        }}
      />
      <View style={styles.container}>
        <Carousel
          data={images}
          renderItem={({ item }) => <TouchableOpacity onPress={() => router.push(item.link)} activeOpacity={0.7}>
          <View style={styles.item}>
            <Image source={item.source} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>}
          itemWidth={screenWidth}
          pagination
          paginationType={"circle"}

        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: screenWidth,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth ,
    height: "100%",
  },
  title: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: "#FD0B0B",
    fontSize: 24,
    fontWeight: "bold",
  },
});