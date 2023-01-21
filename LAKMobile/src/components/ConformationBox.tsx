import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import { JobData } from "../api";


export const confirmationBox = () => {

    const clientName = ((jobDataObject : JobData) => {
        return jobDataObject.clientName;
    });

    const clientPhoneNumber = ((jobDataObject : JobData) => {
        return jobDataObject.phoneNumber;
    });

    const title = "Apply to Job?";
    const message = "By clicking confirm, you are agreeing to accept this job. Be sure to contact" +  
                            clientName + "at the phone number" + clientPhoneNumber;

  const createTwoButtonAlert = () =>
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        onPress: () => {console.log('Cancel button pressed'); return false;},
        style: 'cancel',
      },
      {text: 'Apply', onPress: () => {console.log('Apply button pressed'); return true;}},
    ]);

  return (
    <View style={styles.container}>
        <Button title={'ConfirmationBoxAlert'} onPress={createTwoButtonAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default confirmationBox;