import React from 'react';
import { useState } from "react";
import { Button, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import SingleLineTextInput from '../components/SingleLineTextInput';
import MultilineTextInput from '../components/MultilineTextInput';
import AppText from '../components/AppText';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MediaType} from 'react-native-image-picker';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { PrimaryButton, ScreenHeader } from '../components';
import PickerItem from '../components/PickerItem';

const LOCATIONS = ["-- Select a district --", "Bumthang", "Chhukha", "Dagana", "Gasa", "Haa",
  "Lhuentse", "Mongar", "Paro", "Pema Gatshel", "Punakha", "Samdrup Jongkhar",
  "Samtse", "Sarpang", "Thimphu", "Trashigang", "Trashi Yangtse", "Trongsa",
  "Tsirang", "Wangdue Phodrang", "Zhemgang"];

export default function AddJob() {
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
    setAddJobInformation({...addJobInformation, [id]: e.target.value});
    console.log(e);
  }

  return (
    <View>

    <View style = {styles.header}>
      <ScreenHeader showArrow>Add Job</ScreenHeader>
    </View>
      
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 150, }}>

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

      <View style={styles.photoInstructions}>
        <AppText style = {styles.photoInstructions}>At least one photo of the package is required.</AppText>
        <AppText style = {styles.photoInstructions}>Note: The first photo will be the thumbnail of the job listing.</AppText>
      </View>

      <SingleLineTextInput
        title = "Job Title"
        placeholder = "Ex. Box of apples"
        maxLength={100}
        onChange={onTextInputChange}
        value={addJobInformation.jobTitle}
        id={"jobTitle"}
        width='60%'
      />

      <SingleLineTextInput
        title="Client Name"
        placeholder="Ex. Gabby Gibson"
        maxLength={100}
        onChange={onTextInputChange}
        value={addJobInformation.clientName}
        id={"clientName"}
        width='60%'
      />

      <SingleLineTextInput
        title="Date to be delivered"
        placeholder="Ex. MM/DD/YYYY"
        footer="(put N/A if not applicable)"
        maxLength={10}
        onChange={onTextInputChange}
        value={addJobInformation.deliveryDate}
        id={"deliveryDate"}
        width='60%'
      />

      <MultilineTextInput
        title = "Description"
        placeholder = {"Tell us about your package. Add any extra detail about its size. \n\n Ex. Package will fill up 1/3 of a truck."}
        maxLength={1000}
        {/* onChange={onTextInputChange} */}
      />
      {/*  
      TODO:  
      (2) Edit: size of the TextInput box so that it shows all the placeholder text. 
      Right now you need to scroll down to see all the text.
       */}

      <SingleLineTextInput
        title="Package Quantity"
        placeholder="Ex. 6"
        maxLength={10}
        onChange={onTextInputChange}
        value={addJobInformation.packageQuantity}
        id={"packageQuantity"}
        width='40%'
      />

      <SingleLineTextInput
        title="Estimated price of delivery"
        placeholder="Ex. $$"
        maxLength={20}
        onChange={onTextInputChange}
        value={addJobInformation.estimatedPrice}
        id={"estimatedPrice"}
        width='40%'
      />

      <SingleLineTextInput
        title="Pick-up location"
        placeholder="Ex. Insert address or landmark"
        icon="location-pin"
        maxLength={100}
        onChange={onTextInputChange}
        value={addJobInformation.pickUpLocation}
        id={"pickUpLocation"}
        width='80%'
      />

      <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={pickupDistrict}
            onValueChange={(value, index) => setPickupDistrict(value)}
            mode="dropdown" // Android only
            style={styles.picker}
          >
            {LOCATIONS.map(location => <PickerItem label={location} value={location}/>)}
          </Picker>
      </View>

      <SingleLineTextInput
        title="Drop-off location"
        placeholder="Ex. Insert address or landmark"
        icon="location-pin"
        maxLength={100}
        onChange={onTextInputChange}
        value={addJobInformation.dropOffLocation}
        id={"dropOffLocation"}
        width='80%'
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={dropoffDistrict}
          onValueChange={(value, index) => setDropoffDistrict(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          {LOCATIONS.map(location => <PickerItem label={location} value={location}/>)}
        </Picker>
      </View>

      <SingleLineTextInput
        title = "Phone number"
        placeholder = "Ex. 17113456"
        icon = "phone-in-talk"
        onChange={onTextInputChange}
        value={addJobInformation.phoneNumber}
        id={"phoneNumber"}
        maxLength={20}
        width='80%'
      />

      <View style = {styles.center}>
        <View style = {styles.postJobButton}>

          <PrimaryButton title="Post Job" type='primary'/>
    
        </View>
      </View>
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 100,
  },
  insideScroll: {
    display: 'flex',
  },
  photoText: {
    fontSize: 10, 
    textAlign: 'center'
  },
  photoBox: {
    margin: 15,
    padding: 5,
    fontSize: 12, 
    width: 80,
    height: 80,
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  photos: {
      flexDirection: 'row',
  },
  photoInstructions: {
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 12,
  },
  inputBox: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 2,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    margin: 10
  },
  postJobButton: {
    width: '80%',
    margin: 10,
    color: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#8B8B8B',
  },
  inputLabel: {
    margin: 5,
    fontSize: 14,
  },
  center: {
      alignItems: 'center',
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: '78%',
    marginLeft: 15,
  },
  picker: {   
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#8B8B8B",

    width: '100%',
    height: 35,
  },
  
});
