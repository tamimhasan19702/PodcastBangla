/** @format */

import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons"; // Importing the FontAwesome icons library
import { Colors } from "@/constants/Colors";

export type PodcastComponentProp = {
  audioUrl: string;
  authorName: string;
  description: string;
  image: string;
  date: string;
  duration: string;
};

function PodcastComponent({
  audioUrl,
  authorName,
  description,
  image,
  date,
  duration,
}: PodcastComponentProp) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePlayerPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Pressable onPress={() => handlePlayerPress()}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#F8F9FA",
            borderRadius: 20,
            margin: 10,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
            elevation: 5,
          }}>
          <Image
            source={{ uri: image }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
              {authorName}
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>{description}</Text>
            <Text style={{ fontSize: 12, color: "#999" }}>
              {date} • {duration}
            </Text>
          </View>
          <FontAwesome
            name="pause-circle"
            size={30}
            color={Colors.primary.pink}
          />
        </View>
      </Pressable>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
        onBackdropPress={() => handlePlayerPress()}
        onBackButtonPress={() => handlePlayerPress()}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            padding: 20,
            alignItems: "center",
            width: "90%",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
          }}>
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                marginBottom: 20,
              }}
            />
            <FontAwesome
              name="play-circle"
              size={50}
              color="white"
              style={{
                position: "absolute",
                top: "25%",
                left: "25%",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginVertical: 10,
            }}>
            {authorName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#666",
              textAlign: "center",
              marginVertical: 10,
            }}>
            {description}
          </Text>
          <Text style={{ fontSize: 12, color: "#999" }}>
            {date} • {duration}
          </Text>
        </View>
      </Modal>
    </>
  );
}

export default PodcastComponent;
