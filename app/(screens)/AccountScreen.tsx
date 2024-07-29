/** @format */

import React from "react";
import { Button, Text, View } from "react-native";

import { useClerk } from "@clerk/clerk-expo";

function AccountScreen() {
  const { signOut } = useClerk();
  return (
    <View>
      <Text>AccountScreen</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}

export default AccountScreen;
