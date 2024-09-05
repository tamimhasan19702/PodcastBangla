/** @format */

import React from "react";
// @ts-ignore
import { View, Text, Image, Pressable } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
type ModalPlayerProps = {
  audioUrl: string;
  authorName: string;
  description: string;
  image: string;
  date: string;
  duration: string;
  isPlaying: boolean;
  progress: number;
  currentTime: string;
  totalDuration: string;
  togglePlayPause: () => void;
  handleProgressChange: (value: number) => void;
  sound: Audio.Sound | null;
};

const ModalPlayer = ({
  audioUrl,
  authorName,
  description,
  image,
  date,
  duration,
  isPlaying,
  progress,
  currentTime,
  totalDuration,
  togglePlayPause,
  handleProgressChange,
  sound,
}: ModalPlayerProps) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "80%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      }}>
      <View style={{ position: "relative", marginBottom: 20 }}>
        <Image
          source={{ uri: image }}
          style={{
            borderRadius: 20,
            width: 250,
            height: 250,
          }}
        />
        <Pressable onPress={togglePlayPause}>
          <FontAwesome
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={50}
            color="white"
            style={{
              position: "absolute",
              top: "25%",
              left: "25%",
            }}
          />
        </Pressable>
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
      <Text style={{ fontSize: 12, color: "#999", marginBottom: 20 }}>
        {date} • {duration}
      </Text>

      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={Colors.primary.pink}
        maximumTrackTintColor="#999"
        thumbTintColor={Colors.primary.pink}
        value={progress}
        onValueChange={handleProgressChange}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}>
        <Text style={{ fontSize: 16, color: "#333" }}>{currentTime}</Text>
        <Entypo
          name="dot-single"
          size={20}
          color="#333"
          style={{ marginHorizontal: 5 }}
        />
        <Text style={{ fontSize: 16, color: "#333" }}>{totalDuration}</Text>
      </View>

      <Pressable onPress={togglePlayPause} style={{ marginTop: 20 }}>
        <FontAwesome
          name={isPlaying ? "pause" : "play"}
          size={30}
          color={Colors.primary.pink}
        />
      </Pressable>
    </View>
  );
};

export default ModalPlayer;
