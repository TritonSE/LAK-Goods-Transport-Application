import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DriverRegistrationProps } from '../types/navigation';
import { COLORS } from '../../constants';
import { AppButton, AppText, ScreenHeader, LabelWrapper, ModalAlert } from '../components';
import { getUser, updateUser, UserData, VehicleData } from '../api';
import { AuthContext } from '../context/AuthContext';
import { ImageUploadContext } from '../context/ImageUploadContext';
import { ImageUploadArea } from '../components/ImageUploadArea';

export function DriverRegistration({ navigation }: DriverRegistrationProps) {
  const { dispatch, imageURIs, imageInfo } = useContext(ImageUploadContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user === null) {
      navigation.navigate('Login');
    }
  }, [auth, navigation]);

  const userId = auth.user ? auth.user.uid : '';

  const [profileData, setProfileData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [driverLicenseId, setDriverLicenseId] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const current = new Date();
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleLicensePlateNumber, setVehicleLicensePlateNumber] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const PICKER_TYPE_DEFAULT = '-- Pick type --';

  const CARS = [PICKER_TYPE_DEFAULT, 'Taxi', 'Private', 'Truck'];

  useEffect(() => {
    getUser(userId, userId).then((user) => {
      setProfileData(user);
    });
  }, [userId]);

  useEffect(() => {
    dispatch({ type: 'CLEAR_IMAGES' });
    setUserName(profileData?.firstName + ' ' + profileData?.lastName);
    setPhoneNumber(profileData?.phone || '');
    setLocation(profileData?.location || '');
    setDriverLicenseId(profileData?.driverLicenseId || '');
    setDateApplied(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`);
    if (profileData?.vehicleData) {
      setVehicleType(profileData.vehicleData.vehicleType || PICKER_TYPE_DEFAULT);
      setVehicleModel(profileData.vehicleData.vehicleModel || '');
      setVehicleMake(profileData.vehicleData.vehicleMake || '');
      setVehicleColor(profileData.vehicleData.vehicleColor || '');
      setVehicleLicensePlateNumber(profileData.vehicleData.vehicleLicensePlateNumber || '');
      dispatch({ type: 'SET_IMAGES', payload: profileData.vehicleData.imageIds });
    }
  }, [profileData]);

  const createFormData = (
    images: Array<ImagePicker.ImagePickerAsset | null>,
    body: { [key: string]: string }
  ) => {
    const data = new FormData();
    if (images !== null && images[0] !== null) {
      images.map((image) => {
        if (image !== null) {
          const uriArray = image.uri.split('.');
          const fileExtension = uriArray[uriArray.length - 1]; // e.g.: "jpg"
          const fileTypeExtended = `${image.type}/${fileExtension}`; // e.g.: "image/jpg"
          data.append('images', {
            name: 'demo.jpg',
            uri: image.uri,
            type: fileTypeExtended,
          } as unknown as Blob);
        }
      });
    }

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const submitChanges = async () => {
    if (
      vehicleType == PICKER_TYPE_DEFAULT ||
      vehicleModel == '' ||
      vehicleMake == '' ||
      vehicleColor == '' ||
      driverLicenseId == ''
    ) {
      setAlertVisible(true);
    } else {
      const updatedVehicleData: VehicleData = {
        vehicleType: vehicleType.trim(),
        vehicleModel: vehicleModel.trim(),
        vehicleMake: vehicleMake.trim(),
        vehicleColor: vehicleColor.trim(),
        vehicleLicensePlateNumber: vehicleLicensePlateNumber.trim(),
        imageIds: imageURIs.filter((value) => value !== ''),
      };

      const updatedUser: UserData = {
        phone: phoneNumber,
        firstName: userName.split(' ')[0].trim(),
        lastName: userName.split(' ')[1].trim(),
        location: location,
        dateApplied: dateApplied,
      };
      if (driverLicenseId != '') {
        updatedUser.driverLicenseId = driverLicenseId;
        updatedUser.vehicleData = updatedVehicleData;
      }

      const formData = createFormData(imageInfo, {
        ...updatedUser,
        vehicleData: JSON.stringify(updatedVehicleData),
      });
      updateUser(userId, formData).then((response) => {
        if (response == null) {
          return;
        }
        setProfileData(updatedUser);
        dispatch({ type: 'CLEAR_IMAGES' });
        navigation.navigate('ProfileScreen', { userId });
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScreenHeader showArrow={true}>{'Driver Registration'}</ScreenHeader>
      <ModalAlert
        title="Required Fields"
        message="Please fill out all required fields! (Driver's License ID and Vehicle Information)"
        buttons={[
          {
            type: 'primary',
            label: 'Close',
            onPress: () => setAlertVisible(false),
          },
        ]}
        visible={alertVisible}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={[styles.sectionTitleContainer]}>
          <AppText style={styles.sectionTitle}>Personal Information</AppText>
        </View>

        <LabelWrapper label="Name (First Last)">
          <TextInput
            style={styles.input}
            keyboardType="default"
            defaultValue={profileData?.firstName + ' ' + profileData?.lastName}
            onChangeText={(value) => setUserName(value)}
          />
        </LabelWrapper>

        <LabelWrapper label="Mobile Number">
          <AppText style={styles.input}>{phoneNumber}</AppText>
        </LabelWrapper>

        <LabelWrapper label="Driver's License ID">
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(value) => setDriverLicenseId(value)}
          />
        </LabelWrapper>

        <View style={[styles.sectionTitleContainer]}>
          <AppText style={styles.sectionTitle}>Vehicle Information</AppText>
        </View>

        <LabelWrapper label="Type">
          <View style={[styles.pickerWrapper]}>
            <Picker
              mode="dropdown" // Android only
              onValueChange={(itemValue: string) => setVehicleType(itemValue)}
              selectedValue={vehicleType}
            >
              {CARS.map((type, index) => (
                <Picker.Item key={index} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </LabelWrapper>

        <LabelWrapper label="Model">
          <TextInput
            style={smallInputStyle}
            keyboardType="default"
            defaultValue={profileData?.vehicleData?.vehicleModel}
            onChangeText={(value) => setVehicleModel(value)}
          />
        </LabelWrapper>

        <LabelWrapper label="Make">
          <TextInput
            style={smallInputStyle}
            keyboardType="default"
            defaultValue="Ex. Honda"
            value={vehicleMake}
            onChangeText={(value) => setVehicleMake(value)}
          />
        </LabelWrapper>

        <LabelWrapper label="Color">
          <TextInput
            style={smallInputStyle}
            keyboardType="default"
            defaultValue={profileData?.vehicleData?.vehicleColor}
            onChangeText={(value) => setVehicleColor(value)}
          />
        </LabelWrapper>

        <LabelWrapper label="License Plate Number">
          <TextInput
            style={smallInputStyle}
            keyboardType="default"
            defaultValue={profileData?.vehicleData?.vehicleLicensePlateNumber}
            onChangeText={(value) => setVehicleLicensePlateNumber(value)}
          />
        </LabelWrapper>

        <LabelWrapper label="Photo of Vehicle">
          <ImageUploadArea />
        </LabelWrapper>

        <View style={styles.center}>
          <AppButton
            style={styles.registerButton}
            type="primary"
            title="Register"
            onPress={submitChanges}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    maxHeight: '100%',
    flex: 1,
  },

  scrollContainer: {
    overflow: 'hidden',
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    position: 'absolute',
    bottom: 0,
    left: 32,
  },

  sectionTitleContainer: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 5,
    paddingLeft: 32,
    marginLeft: -32,
    height: 36,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  photos: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  uploadPhotoButton: {
    width: '60%',
    borderRadius: 5,
    color: COLORS.mediumGrey,
    borderColor: COLORS.mediumGrey,
    marginBottom: 10,
    elevation: 2.5,
  },

  registerButton: {
    marginTop: 20,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.mediumGrey,
    padding: 10,
    height: 40,
    marginBottom: 14,
  },

  pickerWrapper: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
    width: '45%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.mediumGrey,
  },

  title: {
    fontSize: 16,
    color: '#8B8B8B',
  },
});

const smallInputStyle = StyleSheet.flatten([
  styles.input,
  {
    width: '45%',
  },
]);
