import React, {useState} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {confirmPasswordReset, getAuth, updatePassword } from 'firebase/auth';
import { LabelWrapper, AppButton, ScreenHeader } from '../components';
import { COLORS } from '../../constants';
import {initializeApp} from 'firebase/app';
import { ResetPasswordProps } from '../types/navigation';
import firebaseConfig from '../auth/firebase-config.json';
import { pinToPass } from '../context/AuthContext';
// import firebase from 'firebase';


export function ResetPassword({ navigation, route}: ResetPasswordProps) {

  const [pin, setPin] = useState('')

  const saveNewPin = async () =>{
    console.log("RESET PASSWORD AUTH")
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // console.log(route.params.verificationCode)
    console.log(pin)
    try{
      // await confirmPasswordReset(auth, route.params.verificationCode, pin);
      const user = auth.currentUser;
      const newPassword = await pinToPass(pin)
      await updatePassword(route.params.user, newPassword)
      console.log(user)
      console.log('Password Updated Successfully!')
      navigation.navigate('ResetSuccess')
    }catch(e){
      console.log(e)
    }
    
  
  //  firebase.auth().currentUser.updatePassword(pin)

    // admin.auth().updateUser(route.params.uid, {
    //   password: pin
    // })
    //   .then((userRecord) => {
    //     console.log('Successfully updated user', userRecord.toJSON());
    //   })
    //   .catch((error) => {
    //     console.log('Error updating user:', error);
    //   });
    // try{
    //   route.params.user.updatePassword(pin)
    //   console.log('works')
    // }catch(e){
    //   console.log(e)
    // }
    
    
  }

  return (
    <View style={styles.container}>
      <ScreenHeader showArrow={true}>Reset Pin</ScreenHeader>
      <View style={marginTop} />
      <LabelWrapper label="New 4 digit pin">
        <TextInput style={smallInputStyle} keyboardType="numeric" />
      </LabelWrapper>

      <LabelWrapper label="Confirm 4 digit pin">
        <TextInput style={smallInputStyle} keyboardType="numeric" 
        onChangeText={(pin) => setPin(pin)}
        />
      </LabelWrapper>

      <AppButton
        type="primary"
        title="Reset Pin"
        onPress={() => saveNewPin()}
        style={styles.submitButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
    flex: 1,
    alignItems: 'flex-start',
  },

  input: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.mediumGrey,
    padding: 5,
    height: 40,
    marginBottom: 8,
  },

  submitButton: {
    width: '100%',
    marginTop: 40,
    padding: 5,
  },

  signupPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  signupLink: {
    marginLeft: 5,
  },
});

const smallInputStyle = StyleSheet.flatten([
  styles.input,
  {
    width: '45%',
  },
]);

const marginTop = StyleSheet.flatten([
  {
    marginTop: '30%',
  },
]);
