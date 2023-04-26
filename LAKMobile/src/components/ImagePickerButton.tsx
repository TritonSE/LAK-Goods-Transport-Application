import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppText } from './AppText';
import { COLORS } from '../../constants';

interface ImagePickerButtonProps {
  sourceURI?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export function ImagePickerButton({ sourceURI, onSelect, disabled }: ImagePickerButtonProps) {
  return (
    <Pressable
      onPress={onSelect}
      disabled={disabled}
      style={disabled ? styles.disabledButton : styles.button}
    >
      {sourceURI ? (
        <Image resizeMode="cover" source={{ uri: sourceURI }} style={styles.image} />
      ) : (
        <>
          <Icon name="camera-plus" size={30} color={disabled ? COLORS.gray : 'black'} />
          <AppText style={disabled ? styles.disabledLabel : styles.label}>
            Upload or take a photo.
          </AppText>
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

  disabledButton: {
    margin: 15,
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: COLORS.gray,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledLabel: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.gray,
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
