import React from 'react';
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import SingleLineTextInput from '../components/SingleLineTextInput';


export default function AddJob() {

  const [pickupDistrict, setPickupDistrict] = useState('Unknown'); 
  const [dropoffDistrict, setDropoffDistrict] = useState('Unknown');

    const addJob = () => {
        console.log("temp");
    }

  return (
      
    <View style={styles.container}>

      {/* TODO: Add screen header component */}

      <SingleLineTextInput
        title = "Job Title"
        placeholder = "Ex. Box of apples"
      />

      <SingleLineTextInput
        title = "Client Name"
        placeholder = "Ex: Gabby Gibson"
      />

      <SingleLineTextInput
        title = "Date to be delivered"
        placeholder = "Ex. MM/DD/YYYY"
        footer = "(put N/A if not applicable)"
      />


      <SingleLineTextInput
        title = "Description"
        placeholder = {"Tell us about your package. Add any extra detail about its size. \n\n Ex. Package will fill up 1/3 of a truck."}
      />
      {/*  
      TODO:  
      (1) Add:   multiline = {true}   so that placeholder text can have newline characters.
      If this is added in SingleLineTextInput component, it messes up centering for placeholder
      text in TextInput without newline in placeholder text.

      (2) Edit: size of the TextInput box so that it shows all the placeholder text. 
      Right now you need to scroll down to see all the text.
       */}

      <SingleLineTextInput
        title = "Package Quantity"
        placeholder = "Ex: 6"
      />
      {/* TODO: Edit Width */}

      <SingleLineTextInput
        title = "Estimated price of delivery"
        placeholder = "Ex: $$"
      />
      {/* TODO: Edit Width */}


      <SingleLineTextInput
        title = "Pick-up location"
        placeholder = "Ex: Insert address or landmark"
      />
      <Picker
        selectedValue={pickupDistrict}
        onValueChange={(value, index) => setPickupDistrict(value)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="-- Select a district --" value="Unknown" />
        <Picker.Item label="Bumthang" value="Bumthang" />
        <Picker.Item label="Chhukha" value="Chhukha" />
        <Picker.Item label="Dagana" value="Dagana" />
        <Picker.Item label="Gasa" value="Gasa" />
        <Picker.Item label="Haa" value="Haa" />
        <Picker.Item label="Lhuentse" value="Lhuentse" />
        <Picker.Item label="Mongar" value="Mongar" />
        <Picker.Item label="Paro" value="Paro" />
        <Picker.Item label="Pema Gatshel" value="Pema Gatshel" />
        <Picker.Item label="Punakha" value="Punakha" />
        <Picker.Item label="Samdrup Jongkhar" value="Samdrup Jongkhar" />
        <Picker.Item label="Samtse" value="Samtse" />
        <Picker.Item label="Sarpang" value="Sarpang" />
        <Picker.Item label="Thimphu" value="Thimphu" />
        <Picker.Item label="Trashigang" value="Trashigang" />
        <Picker.Item label="Trashi Yangtse" value="Trashi Yangtse" />
        <Picker.Item label="Trongsa" value="Trongsa" />
        <Picker.Item label="Tsirang" value="Tsirang" />
        <Picker.Item label="Wangdue Phodrang" value="Wangdue Phodrang" />
        <Picker.Item label="Zhemgang" value="Zhemgang" />
      </Picker>
      {/*
      Districts for dropdown: https://en.wikipedia.org/wiki/Districts_of_Bhutan
      TODO: Do we need to add google-places-autocomplete for Pick-up location TextInput?
      */}


      <SingleLineTextInput
        title = "Drop-off location"
        placeholder = "Ex: Insert address or landmark"
      />
      <Picker
        selectedValue={dropoffDistrict}
        onValueChange={(value, index) => setDropoffDistrict(value)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="-- Select a district --" value="Unknown" />
        <Picker.Item label="Bumthang" value="Bumthang" />
        <Picker.Item label="Chhukha" value="Chhukha" />
        <Picker.Item label="Dagana" value="Dagana" />
        <Picker.Item label="Gasa" value="Gasa" />
        <Picker.Item label="Haa" value="Haa" />
        <Picker.Item label="Lhuentse" value="Lhuentse" />
        <Picker.Item label="Mongar" value="Mongar" />
        <Picker.Item label="Paro" value="Paro" />
        <Picker.Item label="Pema Gatshel" value="Pema Gatshel" />
        <Picker.Item label="Punakha" value="Punakha" />
        <Picker.Item label="Samdrup Jongkhar" value="Samdrup Jongkhar" />
        <Picker.Item label="Samtse" value="Samtse" />
        <Picker.Item label="Sarpang" value="Sarpang" />
        <Picker.Item label="Thimphu" value="Thimphu" />
        <Picker.Item label="Trashigang" value="Trashigang" />
        <Picker.Item label="Trashi Yangtse" value="Trashi Yangtse" />
        <Picker.Item label="Trongsa" value="Trongsa" />
        <Picker.Item label="Tsirang" value="Tsirang" />
        <Picker.Item label="Wangdue Phodrang" value="Wangdue Phodrang" />
        <Picker.Item label="Zhemgang" value="Zhemgang" />
      </Picker>
      {/*
      TODO: Should we add google-places-autocomplete for Drop-off location TextInput?
      */}
      

      <SingleLineTextInput
        title = "Phone number"
        placeholder = "Ex: 17113456"
      />
      {/* TODO: Add phone icon to text box */}


      <View style = {styles.center}>
        <View style = {styles.postJobButton}>
        <Button 
            title = "Post Job"
            onPress={addJob}
            color = "#DA5C5C"
            >
            </Button>
        </View>
      </View>
      
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Arial',
    padding: 10,
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
  picker: {   
    marginTop: -10, 
    marginBottom: 10,
    marginLeft: 15, 
  
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#8B8B8B",

    width: '80%',
    height: 35,

    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  
});
