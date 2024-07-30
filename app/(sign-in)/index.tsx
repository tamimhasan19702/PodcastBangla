/** @format */

import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Button, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import StartScreen from "@/components/StartScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../(screens)/(Home)/HomeScreen";
import MusicScreen from "../(screens)/(Music)/MusicScreen";
import AccountScreen from "../(screens)/(Account)/AccountScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Page() {
  const { signOut } = useClerk();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212121" }}>
      <SignedIn>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: { backgroundColor: "#212121" },
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#ccc",
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="home" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Music"
              component={MusicScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="musical-notes" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Account"
              component={AccountScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="person" size={24} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <StartScreen />
      </SignedOut>
    </SafeAreaView>
  );
}
