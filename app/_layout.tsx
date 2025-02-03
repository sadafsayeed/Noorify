import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:"Home"}}/>
      <Stack.Screen name="quranText" options={{title:"Quran"}}/>
      <Stack.Screen name="prayerTimes" options={{title:"Prayer Times"}}/>
      <Stack.Screen name="kaabaCompass" options={{title:"Compass"}}/>
      <Stack.Screen name="islamicCalendar" options={{title:"Arabic Calendar"}}/>
      <Stack.Screen name="forumPage" options={{title:"Forum"}}/>  
      <Stack.Screen name="communityMarketplace" options={{title:"Community Marketplace"}}/>   
    </Stack> 
  );
}
