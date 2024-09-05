/** @format */

import React from "react";
import { ScrollView, Text, View } from "react-native";
import { PodcastData } from "@/assets/podcast";
import PodcastComponent from "@/components/PodcastComponent";
import Modal from "react-native-modal";
import NewPodcastComponent from "@/components/NewPodCastComponent";
import { PodcastPlayerProvider } from "@/context/PodcastContext";

function HomeScreen() {
  return (
    <View style={{ padding: 15 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 500, padding: 10 }}>
          New Releases
        </Text>
        <Text>Currently Playing</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {PodcastData.map((item) => (
          <PodcastPlayerProvider
            audioUrl={item.audio_url}
            key={item.author_name}>
            <NewPodcastComponent
              date={item.date}
              authorName={item.author_name}
              description={item.description}
              duration={item.duration}
              image={item.image}
            />
          </PodcastPlayerProvider>
        ))}
      </ScrollView>

      <Text style={{ fontSize: 20, fontWeight: 500, padding: 10 }}>
        All Podcasts
      </Text>
      <ScrollView>
        {PodcastData.map((item) => (
          <PodcastPlayerProvider
            audioUrl={item.audio_url}
            key={item.author_name}>
            <PodcastComponent
              audioUrl={item.audio_url}
              date={item.date}
              authorName={item.author_name}
              description={item.description}
              duration={item.duration}
              image={item.image}
            />
          </PodcastPlayerProvider>
        ))}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
