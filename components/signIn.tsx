/** @format */

import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, Alert, StyleSheet } from "react-native";
import React from "react";
import { TextInput, Snackbar, Button } from "react-native-paper";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";

export default function SignInPodCast() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignInPress = React.useCallback(
    //  @ts-ignore
    async (e) => {
      e.preventDefault();

      setError("");

      if (!isLoaded) {
        return;
      }

      try {
        const signInAttempt = await signIn.create({
          identifier: emailAddress,
          password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/");
        } else {
          setError("An error occurred during sign in. Please try again.");
          Alert.alert(
            "Error",
            "An error occurred during sign in. Please try again."
          );
        }
      } catch (err) {
        if (isClerkAPIResponseError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
          Alert.alert(
            "Error",
            "An unexpected error occurred. Please try again."
          );
        }
      }
    },
    [isLoaded, emailAddress, password, signIn, setActive, router]
  );

  const onSignUpPress = () => {
    router.push("/sign-up");
  };

  return (
    <View
      style={{ width: "100%", paddingHorizontal: 40, gap: 10, height: "100%" }}>
      <TextInput
        value={emailAddress}
        label={"Email"}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{
          width: "100%",
        }}
        placeholder="Enter Your Email"
        mode="outlined"
        outlineColor={Colors.primary.gold}
      />
      <TextInput
        value={password}
        label={"Password"}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        style={{
          width: "100%",
          backfaceVisibility: "hidden",
        }}
        mode="outlined"
        placeholder="Enter Your Password"
        outlineColor={Colors.primary.gold}
      />

      <Button
        mode="contained"
        onPress={onSignInPress}
        style={{
          width: "100%",
          paddingVertical: 6,
          backgroundColor: Colors.primary.darkBlue,
        }}>
        Sign In
      </Button>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
        <Text
          onPress={onSignUpPress}
          style={{ fontSize: 16, color: Colors.primary.darkBlue }}>
          <Text>Sign up</Text>
        </Text>
      </View>
    </View>
  );
}
