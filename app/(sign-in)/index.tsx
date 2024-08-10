/** @format */

import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native";
import StartScreen from "@/components/StartScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../(screens)/(Home)/HomeScreen";
import MusicScreen from "../(screens)/(Music)/MusicScreen";
import AccountScreen from "../(screens)/(Account)/AccountScreen";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Tab = createBottomTabNavigator();

export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignedIn>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: Colors.primary.pink,
                paddingTop: 5, // Add top padding
                paddingBottom: 5, // Add bottom padding
                height: 70, // Increase height to accommodate padding
              },
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#ccc",
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="home" size={30} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={MusicScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="heart" size={30} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Account"
              component={AccountScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="person" size={30} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="MusicPopup"
              component={MusicScreen}
              options={{
                tabBarButton: () => null,
                // @ts-ignore
                tabBarVisible: false,
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
