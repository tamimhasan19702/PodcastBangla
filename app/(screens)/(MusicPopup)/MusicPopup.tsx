/** @format */

import React from "react";
import { Button, Text, View } from "react-native";

import { useClerk } from "@clerk/clerk-expo";

function MusicPopup() {
  const { signOut } = useClerk();
  return (
    <View>
      <Text>MusicPopup</Text>
    </View>
  );
}

export default MusicPopup;
