/** @format */

// src/context/PodcastPlayerContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";

// Define the context's data structure
interface PodcastPlayerContextProps {
  isPlaying: boolean;
  progress: number;
  currentTime: string;
  totalDuration: string;
  togglePlayPause: (audioUrl: string) => void;
  handleProgressChange: (value: number) => void;
  sound: Audio.Sound | null;
}

// Define the props for the provider, including children
interface PodcastPlayerProviderProps {
  children: React.ReactNode;
}

// Create the context with default values
const PodcastPlayerContext = createContext<
  PodcastPlayerContextProps | undefined
>(undefined);

// Create the context provider component
export const PodcastPlayerProvider: React.FC<PodcastPlayerProviderProps> = ({
  children,
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

  const togglePlayPause = async (audioUrl: string) => {
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

// Create a custom hook for easier context access
export const usePodcastPlayer = () => {
  const context = useContext(PodcastPlayerContext);
  if (!context) {
    throw new Error(
      "usePodcastPlayer must be used within a PodcastPlayerProvider"
    );
  }
  return context;
};
