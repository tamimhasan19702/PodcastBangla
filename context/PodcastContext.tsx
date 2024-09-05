/** @format */

// src/context/PodcastPlayerContext.tsx

import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";

interface PodcastPlayerContextProps {
  isPlaying: boolean;
  progress: number;
  currentTime: string;
  totalDuration: string;
  togglePlayPause: () => void;
  handleProgressChange: (value: number) => void;
  sound: Audio.Sound | null;
}

interface PodcastPlayerProviderProps {
  children: React.ReactNode;
  audioUrl: string;
}

const PodcastPlayerContext = createContext<
  PodcastPlayerContextProps | undefined
>(undefined);

const usePodcastPlayer = () => {
  const context = React.useContext(PodcastPlayerContext);
  if (!context) {
    throw new Error(
      "usePodcastPlayer must be used within a PodcastPlayerProvider"
    );
  }
  return context;
};

const PodcastPlayerProvider: React.FC<PodcastPlayerProviderProps> = ({
  children,
  audioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setProgress(status.positionMillis / status.durationMillis);
          setCurrentTime(formatTime(status.positionMillis));
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
    <PodcastPlayerContext.Provider
      value={{
        isPlaying,
        progress,
        currentTime,
        totalDuration,
        togglePlayPause,
        handleProgressChange,
        sound,
      }}>
      {children}
    </PodcastPlayerContext.Provider>
  );
};

export { PodcastPlayerProvider, usePodcastPlayer };
