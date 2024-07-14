/** @format */

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import StartScreen from "@/components/StartScreen";
import LottieView from "lottie-react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={{ height: "100%", width: "100%" }}
        behavior="padding">
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <Text>Welcome to your app!</Text>
          <Button title="Sign Out" onPress={() => signOut()} />
          <Link href={"/music-player"}>music page</Link>
        </SignedIn>
        <SignedOut>
          <StartScreen />
        </SignedOut>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
