/** @format */

import React from "react";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";

function StartScreen() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 20,
        gap: 30,
      }}>
      <LottieView
        source={require("@/assets/animations/man.json")}
        autoPlay
        loop
        style={{ width: 400, height: 400 }}
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

      <View style={{ flexDirection: "row", gap: 15 }}>
        <Link
          href="/sign-in"
          style={{
            paddingVertical: 10,
            backgroundColor: "blue",
            paddingHorizontal: 50,
            borderRadius: 20,
            elevation: 5,
          }}>
          <Text style={{ color: "white" }}>Sign In</Text>
        </Link>

        <Link
          href="/sign-up"
          style={{
            paddingVertical: 10,
            backgroundColor: "blue",
            paddingHorizontal: 50,
            borderRadius: 20,
            elevation: 5,
          }}>
          <Text style={{ color: "white" }}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}

export default StartScreen;
