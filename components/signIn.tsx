/** @format */

import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, Button, View, Alert } from "react-native";
import React from "react";
import { TextInput, Snackbar } from "react-native-paper";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";

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
            "Sign In Error",
            "An error occurred during sign in. Please try again."
          );
        }
      } catch (err) {
        if (isClerkAPIResponseError(err)) {
          setError(err.message);
          Alert.alert("Sign In Error", err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
          Alert.alert(
            "Sign In Error",
            "An unexpected error occurred. Please try again."
          );
        }
      }
    },
    [isLoaded, emailAddress, password, signIn, setActive, router]
  );

  return (
    <View style={{ width: "100%", paddingHorizontal: 40, gap: 20 }}>
      <TextInput
        value={emailAddress}
        label={"Email"}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{
          width: "100%",
        }}
        placeholder="Enter Your Email"
        mode="outlined"
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
      />

      <Button title="Sign In" onPress={onSignInPress} />
      <View>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
