/** @format */

import React, { createContext, useState, useEffect, useCallback } from "react";
import { Audio } from "expo-av";

interface Podcast {
  audioUrl: string;
  authorName: string;
  description: string;
  image: string;
  date: string;
  duration: string;
}

interface PodcastContextValue {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentPodcast: Podcast | null;
  setCurrentPodcast: (podcast: Podcast | null) => void;
  sound: Audio.Sound | null;
  setSound: (sound: Audio.Sound | null) => void;
  progress: number;
  setProgress: (progress: number) => void;
  currentTime: string;
  setCurrentTime: (currentTime: string) => void;
  totalDuration: string;
  setTotalDuration: (totalDuration: string) => void;
}

const defaultContextValue: PodcastContextValue = {
  isPlaying: false,
  setIsPlaying: () => {},
  currentPodcast: null,
  setCurrentPodcast: () => {},
  sound: null,
  setSound: () => {},
  progress: 0,
  setProgress: () => {},
  currentTime: "0:00",
  setCurrentTime: () => {},
  totalDuration: "0:00",
  setTotalDuration: () => {},
};

// Create the context with the default values
export const PodcastContext =
  createContext<PodcastContextValue>(defaultContextValue);
// @ts-ignore
export const PodcastProvider: React.FC<PodcastContextProps> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");

  useEffect(() => {
    if (sound) {
      // @ts-ignore
      const playbackStatusUpdate = (status: Audio.SoundPlaybackStatus) => {
        if (status.isLoaded) {
          setProgress(status.positionMillis / status.durationMillis);
          setCurrentTime(formatTime(status.positionMillis));
          setTotalDuration(formatTime(status.durationMillis));
          setIsPlaying(status.isPlaying);
        }
      };

      sound.setOnPlaybackStatusUpdate(playbackStatusUpdate);
    }

    // Clean up sound when the component unmounts or when the sound object changes
    return () => {
      if (sound) {
        sound.unloadAsync().catch((error) => {
          console.error("Error unloading sound:", error);
        });
      }
    };
  }, [sound]);

  // Helper function to format time from milliseconds to "mm:ss"
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const podcastContextValue = {
    isPlaying,
    setIsPlaying,
    currentPodcast,
    setCurrentPodcast,
    sound,
    setSound,
    progress,
    setProgress,
    currentTime,
    setCurrentTime,
    totalDuration,
    setTotalDuration,
  };

  return (
    <PodcastContext.Provider value={podcastContextValue}>
      {children}
    </PodcastContext.Provider>
  );
};
