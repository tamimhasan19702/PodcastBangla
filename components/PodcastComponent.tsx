/** @format */

import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

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
  console.log(image);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
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

      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{authorName}</Text>
        <Text style={{ fontSize: 14, color: "#666" }}>{description}</Text>
        <Text style={{ fontSize: 12, color: "#999" }}>
          {date} • {duration}
        </Text>
      </View>

      {/* Play Button */}
      <TouchableOpacity style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 24, color: "#333" }}>▶️</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PodcastComponent;
