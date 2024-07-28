/** @format */

import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import AntDesign from "@expo/vector-icons/AntDesign";

WebBrowser.maybeCompleteAuthSession();

export default function SignInPodCast() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const onSignInPress = useCallback(
    //  @ts-ignore
    async (e) => {
      e.preventDefault();

      setError("");
      setLoading(true); // Show loading indicator

      if (!isLoaded) {
        setLoading(false);
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
          const errorMessage = "Invalid email or password. Please try again.";
          setError(errorMessage);
          Alert.alert("Error", errorMessage);
        }
      } catch (err) {
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (isClerkAPIResponseError(err)) {
          errorMessage = err.message;
          if (err.errors.some((e) => e.code === "invalid_email")) {
            errorMessage = "Invalid email. Please try again.";
          } else if (err.errors.some((e) => e.code === "invalid_password")) {
            errorMessage = "Invalid password. Please try again.";
          }
        }
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    },
    [isLoaded, emailAddress, password, signIn, setActive, router]
  );

  const onSignUpPress = () => {
    router.push("/sign-up");
  };

  async function onGoogleSignIn() {
    try {
      setLoading(true);

      const oAuthFlow = await googleOAuth.startOAuthFlow();

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({
            session: oAuthFlow.createdSessionId,
          });
        }
      } else {
        setLoading(false);
        setError("An unexpected error occurred. Please try again.");
        Alert.alert(error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  });

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
        disabled={loading} // Disable button while loading
        style={{
          width: "100%",
          paddingVertical: 6,
          backgroundColor: Colors.primary.darkBlue,
        }}>
        {loading ? (
          <ActivityIndicator color="#fff" /> // Show loader inside button
        ) : (
          "Sign In"
        )}
      </Button>

      <View style={{ width: "100%", marginTop: 10 }}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <TouchableOpacity
            onPress={onGoogleSignIn}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <AntDesign name="google" size={22} color="black" />
            <Text style={{ fontSize: 18 }}>Sign in with Google</Text>
          </TouchableOpacity>
        )}
      </View>

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
