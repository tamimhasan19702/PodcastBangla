/** @format */

import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SafeAreaView, View, Text } from "react-native";
import StartScreen from "@/components/StartScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../(screens)/(Home)/HomeScreen";
import MusicScreen from "../(screens)/(Music)/MusicScreen";
import AccountScreen from "../(screens)/(Account)/AccountScreen";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import SearchScreen from "../(screens)/(search)/SearchScreen";
import MarqueeLabel from "react-native-marquee-label";

const Tab = createBottomTabNavigator();

export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignedIn>
        {/* Add a floating action button with absolute position at the top */}
        <View
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 1,
            borderRadius: 50,
            backgroundColor: Colors.primary.pink,
            padding: 10,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Ionicons
            name="play"
            size={20}
            color="white"
            style={{
              borderRadius: 50, // Make the icon round
            }}
          />
          <Text style={{ fontSize: 12, color: "#fff", marginTop: 5 }}>
            Song name i dont know
          </Text>
        </View>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: Colors.primary.pink,
                paddingTop: 5, // Add top padding
                paddingBottom: 5, // Add bottom padding
                height: 70,
                borderRadius: 15,
                marginBottom: 10,
                marginHorizontal: 10,
                elevation: 5,
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
              name="Search"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="search" size={30} color={color} />
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
