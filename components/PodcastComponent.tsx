/** @format */

import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

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
  const [isPlayed, setIsPlayed] = useState(false);
  const navigation = useNavigation();

  const handlePlayPause = () => {
    setIsPlayed(!isPlayed);
    // Add logic to play/pause the audio
  };

  const handleTextPress = () => {
    navigation.navigate("MusicPopup");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        width: "auto",
      }}>
      {/* Image */}

      <Image
        source={{ uri: image }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 10,
        }}
      />

      <TouchableOpacity style={{ flex: 1 }} onPress={handleTextPress}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{authorName}</Text>
        <Text style={{ fontSize: 14, color: "#666" }}>{description}</Text>
        <Text style={{ fontSize: 12, color: "#999" }}>
          {date} • {duration}
        </Text>
      </TouchableOpacity>

      {/* Content */}

      {/* Play Button */}
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={handlePlayPause}>
        <FontAwesome
          name={isPlayed ? "pause" : "play"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

export default PodcastComponent;
