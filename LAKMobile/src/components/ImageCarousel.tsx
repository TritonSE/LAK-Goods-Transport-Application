import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { imageIdToSource } from '../api/consumer';

interface ImageCarouselProps {
  imageIds: string[];
}

const IMAGE_HEIGHT = 180;
const THUMBNAIL_WIDTH = 48;
const THUMBNAIL_HEIGHT = 42;
const THUMBNAIL_GUTTER = 3;

export function ImageCarousel({ imageIds }: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.wrapper}>
      <Image
        resizeMode="center"
        source={imageIdToSource(imageIds[selectedIndex])}
        style={styles.bigImage}
      />
      <FlatList
        data={imageIds}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => setSelectedIndex(index)}
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
          length: THUMBNAIL_WIDTH + 2 * THUMBNAIL_GUTTER,
          offset: (THUMBNAIL_WIDTH + 2 * THUMBNAIL_GUTTER) * index,
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
    paddingLeft: THUMBNAIL_GUTTER,
  },
  thumbnailImage: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
  },
});
