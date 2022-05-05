import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { API_URL } from "@env";

interface ImageCarouselProps {
  imageIds: string[];
}

const IMAGE_HEIGHT = 150;
const THUMBNAIL_WIDTH = 32;
const THUMBNAIL_HEIGHT = 28;

// const imageIdToSource = (imageId: string): ImageSourcePropType => ({
//   uri: `${API_URL}/api/images/${imageId}`,
// });

const imageIdToSource = (imageId: string): ImageSourcePropType =>
  imageId.length % 2 == 0
    ? require("../apples.png")
    : require("../vegetables.png");

export function ImageCarousel({ imageIds }: ImageCarouselProps) {
  const [selectedImageId, setSelectedImageId] = useState(imageIds[0]);

  return (
    <View style={styles.wrapper}>
      <Image
        resizeMode="center"
        source={imageIdToSource(selectedImageId)}
        style={styles.bigImage}
      />
      <FlatList
        data={imageIds}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedImageId(item)}
            style={styles.thumbnailPressable}
          >
            <Image
              resizeMode="cover"
              source={imageIdToSource(item)}
              style={styles.thumbnailImage}
            />
          </Pressable>
        )}
        getItemLayout={(data, index) => ({
          length: THUMBNAIL_WIDTH + 2,
          offset: (THUMBNAIL_WIDTH + 2) * index,
          index,
        })}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.thumbnailsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    backgroundColor: "#000",
  },
  bigImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
  },
  thumbnailsList: {
    width: "100%",
    height: "auto",
  },
  thumbnailPressable: {
    flex: 1,
    paddingLeft: 2,
  },
  thumbnailImage: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
  },
});
