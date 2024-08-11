/** @format */

import React from "react";
import { ScrollView, Text, View } from "react-native";
import { PodcastData } from "@/assets/podcast";
import PodcastComponent from "@/components/PodcastComponent";
import Modal from "react-native-modal";

function HomeScreen() {
  return (
    <View style={{ padding: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 500, padding: 10 }}>
        New Releases
      </Text>

      <Text style={{ fontSize: 20, fontWeight: 500, padding: 10 }}>
        All Podcasts
      </Text>
      <ScrollView>
        {PodcastData.map((item) => (
          <PodcastComponent
            key={item.author_name}
            audioUrl={item.audio_url}
            date={item.date}
            authorName={item.author_name}
            description={item.description}
            duration={item.duration}
            image={item.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
