/** @format */

import React from "react";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import SignInPodCast from "./signIn";

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
      }}>
      <LottieView
        source={require("@/assets/animations/man.json")}
        autoPlay
        loop
        style={{ width: 250, height: 250, marginTop: 50 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "blue",
          marginBottom: 10,
        }}>
        Welcome To Podcast Bangla
      </Text>
      <SignInPodCast />
    </View>
  );
}

export default StartScreen;
