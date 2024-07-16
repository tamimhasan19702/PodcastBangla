/** @format */

import * as React from "react";
import { View, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import LottieView from "lottie-react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (password !== confirmPassword) {
      // @ts-ignore
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View
      // @ts-ignore
      style={{
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        padding: 10,
        gap: 10,
        backgroundColor: Colors.primary.white,
      }}>
      <LottieView
        source={require("@/assets/animations/sign up.json")}
        autoPlay
        loop
        style={{ width: 330, height: 330, marginTop: 50 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: Colors.primary.darkBlue,
        }}>
        Sign up To Podcast Bangla
      </Text>
      {!pendingVerification && (
        <View style={{ paddingHorizontal: 40, gap: 10, width: "100%" }}>
          {/* Hide the sign-up title */}
          {/* <Text>Sign Up</Text> */}
          <TextInput
            autoCapitalize="none"
            label={"Email"}
            onChangeText={(email) => setEmailAddress(email)}
            style={{
              width: "100%",
              backfaceVisibility: "hidden",
            }}
            mode="outlined"
            placeholder="Enter Your Email"
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

          <TextInput
            value={confirmPassword}
            label={"Confirm Password"}
            onChangeText={(password) => setConfirmPassword(password)}
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
            onPress={onSignUpPress}
            style={{
              width: "100%",
              paddingVertical: 6,
              backgroundColor: Colors.primary.darkBlue,
              marginTop: 10,
            }}>
            Sign Up
          </Button>
        </View>
      )}
      {pendingVerification && (
        <View
          style={{
            paddingHorizontal: 40,
            paddingVertical: 20,
            gap: 10,
            width: "100%",
          }}>
          <TextInput
            value={code}
            placeholder="Enter Verification Code"
            onChangeText={(code) => setCode(code)}
          />

          <Button
            mode="contained"
            onPress={onPressVerify}
            style={{
              width: "100%",
              paddingVertical: 6,
              backgroundColor: Colors.primary.darkBlue,
              marginTop: 10,
            }}>
            Verify Email
          </Button>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
        <Link href="/" style={{ fontSize: 16, color: Colors.primary.darkBlue }}>
          <Text>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}
