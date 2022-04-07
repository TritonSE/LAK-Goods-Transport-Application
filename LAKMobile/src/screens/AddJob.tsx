import React, { useState } from 'react';
import { PermissionsAndroid, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MediaType} from 'react-native-image-picker';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
  AppText,
  LabelWrapper,
  PrimaryButton, 
  ScreenHeader,
  PickerItem,
  AppTextInput,
} from '../components';
import { COLORS } from '../../constants';


const LOCATIONS = ["-- Select a district --", "Bumthang", "Chhukha", "Dagana", "Gasa", "Haa",
  "Lhuentse", "Mongar", "Paro", "Pema Gatshel", "Punakha", "Samdrup Jongkhar",
  "Samtse", "Sarpang", "Thimphu", "Trashigang", "Trashi Yangtse", "Trongsa",
  "Tsirang", "Wangdue Phodrang", "Zhemgang"];

export function AddJob() {
  const [pickupDistrict, setPickupDistrict] = useState('Unknown'); 
  const [dropoffDistrict, setDropoffDistrict] = useState('Unknown');
  const [addJobInformation, setAddJobInformation] = useState({
    jobTitle: "",
    clientName: "",
    deliveryDate: "",
    packageDescription: "",
    packageQuantity: "",
    estimatedPrice: "",
    pickUpLocation: "",
    dropOffLocation: "",
    phoneNumber: "",
  });

    const addJob = () => {
        console.log("temp ");
    }

    const requestCameraAccess = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "LAK Mobile Permissions",
            message:
              "LAK Mobile needs your permission to access your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
        } else {
          
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const photoPress = async () => {

      await requestCameraAccess();

      const mediaType = 'photo' as MediaType;

      const options = {
        storageOptions: {
            path: "images",
        },
        mediaType: mediaType,
        includeBase64: true,
    }

    try {
      const result = await launchImageLibrary(options);
    }
    catch(e){
     console.log(e); 
    }

    
  }

  const onTextInputChange = (e: any, id: string) => {
    // NOTE Pass in the id that will be the attribute we need to change
    setAddJobInformation({...addJobInformation, [id]: e.target.value});
    console.log(e);
  }

  // TODO Implement state manipulations once data managenement is setup on frontend
  
  return (
    <View>

    <View style = {styles.header}>
      <ScreenHeader showArrow>Add Job</ScreenHeader>
    </View>
      
    <ScrollView contentContainerStyle={styles.container}>

    <TouchableOpacity style={styles.photos} onPress={() => {photoPress();}}>

      <View style={styles.photoBox}>
        <Icon name="camera-plus" size={30} color="black" />

        <AppText style = {styles.photoText}>Upload or take a photo.</AppText>
      </View>

      <View style={styles.photoBox}>
        <Icon name="camera-plus" size={30} color="black" />

        <AppText style = {styles.photoText}>Upload or take a photo.</AppText>
      </View>

      <View style={styles.photoBox}>
        <Icon name="camera-plus" size={30} color="black" />

        <AppText style = {styles.photoText}>Upload or take a photo.</AppText>
      </View>

        
    </TouchableOpacity>

      <View style={[styles.spacer]}>
        <AppText style = {styles.photoInstructions}>At least one photo of the package is required.</AppText>
        <AppText style = {styles.photoInstructions}>Note: The first photo will be the thumbnail of the job listing.</AppText>
      </View>

      <LabelWrapper label='Job Title'>
        <AppTextInput
          style={[inputStyle2, styles.spacer]}
          placeholder = "Ex. Box of apples"
          maxLength={100}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label='Client Name'>
        <AppTextInput
          style={[inputStyle2, styles.spacer]}
          placeholder = 'Ex. Gabby Gibson'
          maxLength={100}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label='Date to be delivered'>
        <AppTextInput
          style={inputStyle2}
          placeholder = 'Ex. MM/DD/YYYY'
          maxLength={10}
          keyboardType="default"
        />
        <AppText style={[styles.inputFooterText, styles.spacer]}>(put N/A if not applicable)</AppText>
      </LabelWrapper>

      <LabelWrapper label='Description'>
        <AppTextInput
          multiline
          style={[styles.multilineInput, styles.spacer]}
          maxLength={1000}
          placeholder = {"Tell us about your package. Add any extra detail about its size. \n\n Ex. Package will fill up 1/3 of a truck."}
        />
      </LabelWrapper>

      {/*  
      TODO:  
      (2) Edit: size of the TextInput box so that it shows all the placeholder text. 
      Right now you need to scroll down to see all the text.
       */}

      <LabelWrapper label='Package Quantity'>
        <AppTextInput
          style={[inputStyle1, styles.spacer]}
          placeholder='Ex. 6'
          maxLength={10}
        />
      </LabelWrapper>

      <LabelWrapper label='Estimated price of delivery'>
        <AppTextInput 
          placeholder='Ex. $$'
          maxLength={20}
          style={[inputStyle1, styles.spacer]}
        />
      </LabelWrapper>

      <LabelWrapper label='Pick-up location'>
        <AppTextInput
          style={inputStyleFull}
          placeholder="Ex. Insert address or landmark"
          maxLength={100}
          icon='location-pin'
        />
        
        <View style={[styles.pickerWrapper, styles.spacer]}>
          <Picker
            selectedValue={pickupDistrict}
            onValueChange={(value, index) => setPickupDistrict(value)}
            mode="dropdown" // Android only
          >
            {LOCATIONS.map((location, index) => <Picker.Item key={index} label={location} value={location}/>)}
          </Picker>
        </View>
      </LabelWrapper>
      
      <LabelWrapper label='Drop-off location'>
        <AppTextInput
          style={inputStyleFull}
          placeholder="Ex. Insert address or landmark"
          maxLength={100}
          icon='location-pin'
        />
        <View style={[styles.pickerWrapper, styles.spacer]}>
          <Picker
            selectedValue={pickupDistrict}
            onValueChange={(value, index) => setDropoffDistrict(value)}
            mode="dropdown" // Android only
          >
            {LOCATIONS.map((location, index) => <Picker.Item key={index} label={location} value={location}/>)}
          </Picker>
        </View>
      </LabelWrapper>

      <LabelWrapper label='Phone number'>
        <AppTextInput 
          style={[inputStyleFull, styles.spacer]}
          placeholder = "Ex. 17113456"
          icon = "phone-in-talk"        
        />
      </LabelWrapper>

      <PrimaryButton style={[styles.center, { width: '100%'}]} title="Post Job" type='primary'/>
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.mediumGrey,
    height: 40,
  },
  
  inputFooterText: {
    fontSize: 12
  },

  multilineInput: {
    borderWidth: 1,
    height: 75,
    width: '80%',
    borderRadius: 4,
    paddingHorizontal: 5,
    borderColor: COLORS.mediumGrey,
  },
  
  container: {
    padding: 32,
    paddingBottom: 140,
  },

  header: {
    marginBottom: 100,
  },

  photoText: {
    fontSize: 10, 
    textAlign: 'center'
  },
  photoBox: {
    margin: 15,
    padding: 5,
    fontSize: 12, 
    width: 90,
    height: 90,
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  photos: {
      flexDirection: 'row',
      alignSelf: 'center'
  },
  photoInstructions: {
    fontSize: 12,
  },

  center: {
      alignSelf: 'center',
  },
  pickerWrapper: {
    padding: 0,
    margin: 0,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.mediumGrey,
  },
  spacer: {
    marginBottom: 20
  }
});

const inputStyle1 = StyleSheet.flatten([
  styles.input, 
  {
    width: '40%'
  }
])

const inputStyle2 = StyleSheet.flatten([
  styles.input, 
  {
    width: '60%'
  }
]);

const inputStyleFull = StyleSheet.flatten([
  styles.input, 
  {
    width: '100%',
  }
]);