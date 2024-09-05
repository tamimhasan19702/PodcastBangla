/** @format */

import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, Pressable, Animated, Easing } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Slider from "@react-native-community/slider";
import { usePodcastPlayer } from "@/context/PodcastContext";

interface NewPodcastComponentProp {
  audioUrl: string;
  authorName: string;
  description: string;
  image: string;
  date: string;
  duration: string;
}

function NewPodcastComponent({
  audioUrl,
  authorName,
  description,
  image,
  date,
  duration,
}: NewPodcastComponentProp) {
  const {
    isPlaying,
    progress,
    currentTime,
    totalDuration,
    togglePlayPause,
    handleProgressChange,
    sound,
  } = usePodcastPlayer();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const translateYAnim = useState(new Animated.Value(800))[0]; // Start with modal off-screen

  useEffect(() => {
    if (isModalVisible) {
      // Animate the modal up to 20% from the bottom
      Animated.timing(translateYAnim, {
        toValue: 0, // Modal will slide to visible position
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      // Animate the modal down to hide it
      Animated.timing(translateYAnim, {
        toValue: 1000, // Modal will slide back down off-screen
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  const handlePlayerPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Pressable
        onPress={handlePlayerPress}
        style={{ width: 300, height: 420 }}>
        <View
          style={{
            flexDirection: "column",
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
            width: "90%",
            gap: 5,
          }}>
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10, // Adjust for rounded corners like the album image
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: isPlaying ? Colors.primary.white : Colors.primary.dark,
              textAlign: "center",
            }}>
            {authorName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: isPlaying ? Colors.primary.white : Colors.primary.dark,
              textAlign: "center",
            }}>
            {description}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: isPlaying ? Colors.primary.white : Colors.primary.dark,
              textAlign: "center",
            }}>
            {date} • {duration}
          </Text>
          <Pressable onPress={() => togglePlayPause()}>
            <FontAwesome
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={40}
              color={isPlaying ? Colors.primary.white : Colors.primary.pink}
            />
          </Pressable>
        </View>
      </Pressable>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        style={{ justifyContent: "flex-end", margin: 0 }}
        onBackdropPress={handlePlayerPress}
        onBackButtonPress={handlePlayerPress}>
        <Animated.View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
            alignItems: "center",
            width: "100%",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
            transform: [{ translateY: translateYAnim }],
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
            <Pressable onPress={() => togglePlayPause(audioUrl)}>
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

          <Pressable
            onPress={() => togglePlayPause(audioUrl)}
            style={{ marginTop: 20 }}>
            <FontAwesome
              name={isPlaying ? "pause" : "play"}
              size={30}
              color={Colors.primary.pink}
            />
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
}

export default NewPodcastComponent;
