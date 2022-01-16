import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DriverRegistration() {

    const uploadPhoto = () => {
        console.log("temp");
    }

  return (
      
    <View style={styles.container}>

    <Text style={styles.title}>Personal Information</Text>

      <View style={styles.horizontalLine}/>

      <Text style={styles.inputLabel}>Name (First, Last)</Text>
      
      <TextInput
        style={styles.inputBox}
        value=""
        placeholder=""
      />
    
      <Text style={styles.inputLabel}>Mobile Number</Text>
    
      <TextInput
        style={styles.inputBox}
        value=""
        placeholder=""
      />

    <Text style={styles.inputLabel}>Driver's License ID</Text>

      <TextInput
        style={styles.inputBox}
        value=""
        placeholder=""
      />

    <Text style={styles.title}>Vehicle Information</Text>

      <View style={styles.horizontalLine}/>

      <Text style={styles.inputLabel}>Type</Text>
      
      <TextInput
        style={styles.inputBox}
        value=""
        placeholder=""
      />

      <Text style={styles.inputLabel}>Model</Text>
      <TextInput
        style={styles.inputBox}
        value=""
        placeholder="Ex. Honda"
      />

      Model
      <TextInput
        style={styles.inputBox}
        value=""
        placeholder="Ex. Civic"
      />
      
      Color
      <TextInput
        style={styles.inputBox}
        value=""
        placeholder=""
      />

      Photo of Vehicle
      
      <Button 
        title = "Upload a Photo"
        onPress={uploadPhoto}
        color = "#DA5C5C"
        >
        </Button>
        
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
  uploadPhotoButton: {
    margin: 10,
    color: 'white'
  },
  title: {
    fontSize: 16,
    color: '#8B8B8B',
  },
  inputLabel: {
    margin: 5,
    fontSize: 14,
  }
});
