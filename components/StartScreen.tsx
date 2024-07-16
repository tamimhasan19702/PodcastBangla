/** @format */

import React from "react";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import SignInPodCast from "./signIn";
import { Colors } from "@/constants/Colors";

function StartScreen() {
  return (
    <View
      // @ts-ignore
      style={{
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        padding: 10,
        gap: 30,
        backgroundColor: Colors.primary.white,
      }}>
      <LottieView
        source={require("@/assets/animations/man.json")}
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
        Sign in To Podcast Bangla
      </Text>
      <SignInPodCast />
    </View>
  );
}

export default StartScreen;
