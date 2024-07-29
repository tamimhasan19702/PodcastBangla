/** @format */

import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Button, View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import StartScreen from "@/components/StartScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../(screens)/HomeScreen";
import MusicScreen from "../(screens)/MusicScreen";
import AccountScreen from "../(screens)/AccountScreen";

const Tab = createBottomTabNavigator();

export default function Page() {
  const { signOut } = useClerk();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignedIn>
        <NavigationContainer independent={true}>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Music" component={MusicScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <StartScreen />
      </SignedOut>
    </SafeAreaView>
  );
}
