/** @format */

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, Button, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import StartScreen from "@/components/StartScreen";
import LottieView from "lottie-react-native";
import { Platform } from "react-native";
import HomeScreen from "../(screens)/HomeScreen";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignedIn>
        <HomeScreen />
        <Button title="Sign Out" onPress={() => signOut()} />
      </SignedIn>
      <SignedOut>
        <StartScreen />
      </SignedOut>
    </SafeAreaView>
  );
}
