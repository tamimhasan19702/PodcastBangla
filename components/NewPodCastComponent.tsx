/** @format */

import React, { useState, useEffect } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";

export type NewPodcastComponentProp = {
  audioUrl: string;
  authorName: string;
  description: string;
  image: string;
  date: string;
  duration: string;
};

function NewPodcastComponent({
  audioUrl,
  authorName,
  description,
  image,
  date,
  duration,
}: NewPodcastComponentProp) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          // @ts-ignore
          setProgress(status.positionMillis / status.durationMillis);
          setCurrentTime(formatTime(status.positionMillis));
          // @ts-ignore
          setTotalDuration(formatTime(status.durationMillis));
          setIsPlaying(status.isPlaying);
        }
      });
    }

    return sound
      ? () => {
          sound.unloadAsync().catch((error) => {
            console.error("Error unloading sound:", error);
          });
        }
      : undefined;
  }, [sound]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handlePlayerPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const togglePlayPause = async () => {
    try {
      if (sound === null) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
      } else {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        // The playback status should automatically update via `setOnPlaybackStatusUpdate`
      }
    } catch (error) {
      console.error("Error handling playback:", error);
    }
  };

  const handleProgressChange = async (value: number) => {
    try {
      if (sound !== null) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          const newPosition = value * status.durationMillis;
          await sound.setPositionAsync(newPosition);
        }
      }
    } catch (error) {
      console.error("Error changing progress:", error);
    }
  };

  return (
    <>
      <Pressable onPress={handlePlayerPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            backgroundColor: isPlaying
              ? Colors.primary.pink
              : Colors.primary.white,
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: isPlaying ? Colors.primary.white : Colors.primary.dark,
              }}>
              {authorName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: isPlaying ? Colors.primary.white : Colors.primary.dark,
              }}>
              {description}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: isPlaying ? Colors.primary.white : Colors.primary.dark,
              }}>
              {date} • {duration}
            </Text>
          </View>
          <Pressable onPress={togglePlayPause}>
            <FontAwesome
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={30}
              color={isPlaying ? Colors.primary.white : Colors.primary.pink}
            />
          </Pressable>
        </View>
      </Pressable>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
        onBackdropPress={handlePlayerPress}
        onBackButtonPress={handlePlayerPress}>
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
          <View style={{ position: "relative", marginBottom: 20 }}>
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
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
      </Modal>
    </>
  );
}

export default NewPodcastComponent;
