/** @format */

import React, { useContext, useState, useEffect } from "react";
import { Text, View, Image, Pressable } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { usePodcastPlayer } from "@/context/PodcastContext";
import ModalPlayer from "./ModalPlayer";

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

  const handlePlayerPress = () => {
    setIsModalVisible(!isModalVisible);
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
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        onBackdropPress={handlePlayerPress}
        onBackButtonPress={handlePlayerPress}>
        <ModalPlayer
          audioUrl={audioUrl}
          authorName={authorName}
          description={description}
          image={image}
          date={date}
          duration={duration}
          isPlaying={isPlaying}
          progress={progress}
          currentTime={currentTime}
          totalDuration={totalDuration}
          togglePlayPause={togglePlayPause}
          handleProgressChange={handleProgressChange}
          sound={sound}
        />
      </Modal>
    </>
  );
}

export default PodcastComponent;
