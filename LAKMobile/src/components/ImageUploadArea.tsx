import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePickerButton } from './ImagePickerButton';
import * as ImagePicker from 'expo-image-picker';
import { ModalAlert } from './ModalAlert';
import { ImageUploadContext } from '../context/ImageUploadContext';

/**
 * This component handles the image uploading interface for forms like AddJob, EditProfileScreen,
 * and DriverRegistration. The forms can then access the uploaded images through ImageUploadContext.
 */
export function ImageUploadArea() {
  const { dispatch, imageURIs } = useContext(ImageUploadContext);
  const [permissionAlertVisible, setPermissionAlertVisible] = useState(false);
  const [imagePickPromptVisible, setImagePickPromptVisible] = useState(false);

  const openImageLibrary = useCallback(async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setPermissionAlertVisible(true);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!pickerResult.canceled) {
      dispatch({ type: 'ADD_IMAGE', payload: pickerResult.assets[0] });
    }
    setImagePickPromptVisible(false);
  }, []);

  const openCamera = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      setPermissionAlertVisible(true);
      return;
    }
    const cameraResult = await ImagePicker.launchCameraAsync();
    if (!cameraResult.canceled) {
      dispatch({ type: 'ADD_IMAGE', payload: cameraResult.assets[0] });
    }
    setImagePickPromptVisible(false);
  }, []);

  const handleTapImage = useCallback(
    (index: number) => {
      if (imageURIs[index] === '') {
        setImagePickPromptVisible(true);
      } else {
        dispatch({ type: 'REMOVE_IMAGE', payload: index });
      }
    },
    [imageURIs]
  );

  return (
    <View>
      <View style={styles.photos}>
        {imageURIs.map((uri, index) => (
          <ImagePickerButton key={index} sourceURI={uri} onSelect={() => handleTapImage(index)} />
        ))}
      </View>
      <ModalAlert
        title="Permission Needed"
        message="Please allow access to photos in Settings!"
        buttons={[
          {
            type: 'primary',
            label: 'Close',
            onPress: () => setPermissionAlertVisible(false),
          },
        ]}
        visible={permissionAlertVisible}
      />
      <ModalAlert
        title="Add Photo"
        buttons={[
          {
            type: 'primary',
            label: 'Upload from library',
            onPress: openImageLibrary,
          },
          { type: 'primary', label: 'Take with camera', onPress: openCamera },
          {
            type: 'secondary',
            label: 'Cancel',
            onPress: () => setImagePickPromptVisible(false),
          },
        ]}
        visible={imagePickPromptVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  photos: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
