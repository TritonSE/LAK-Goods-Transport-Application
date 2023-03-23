import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppText } from './AppText';

interface ImagePickerButtonProps {
  sourceURI?: string;
  onSelect: () => void;
}

export function ImagePickerButton({ sourceURI, onSelect }: ImagePickerButtonProps) {
  return (
    <Pressable onPress={onSelect} style={styles.button}>
      {sourceURI ? (
        <Image resizeMode="cover" source={{ uri: sourceURI }} style={styles.image} />
      ) : (
        <>
          <Icon name="camera-plus" size={30} color="black" />
          <AppText style={styles.label}>Upload or take a photo.</AppText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 15,
    width: 90,
    height: 90,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
