/** @format */
import { useUser } from "@clerk/clerk-expo";

import { Button, View, Text } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <View>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
    </View>
  );
}
