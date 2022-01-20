import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import SingleLineTextInput from '../components/SingleLineTextInput';

export default function AddJob() {

    const addJob = () => {
        console.log("temp");
    }

  return (
      
    <View style={styles.container}>

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

      <View style = {styles.center}>
        <View style = {styles.postJobButton}>
        <Button 
            title = "add reusable button"
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
  }
});
