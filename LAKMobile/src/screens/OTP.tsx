import React, {useRef, useContext, useState} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, ScreenHeader } from '../components';
import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {getApp,initializeApp} from 'firebase/app';
import {getAuth,PhoneAuthProvider,signInWithCredential} from 'firebase/auth';
import firebaseConfig from '../../firebase-config.json';
import { COLORS } from '../../constants';
import { OTPProps } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';

export function OTP({ navigation }: OTPProps) {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  const recaptchaVerifier = useRef<any>(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationID] = useState('');
  const [verificationCode, setVerificationCode] = useState('');


  const sendCode = async () => {
    try{
        const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
        const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current); // get the verification id
        setVerificationID(verificationId); // set the verification id
        console.log('Success : Verification code has been sent to your phone'); // If Ok, show message.
    }catch(error){
        console.log('error in handle send verification', error);
    }
};

const verifyCode = async () => {
  try{
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode); // get the credential
      await signInWithCredential(auth, credential); // verify the credential
      navigation.navigate('Signup'); // navigate to the reset password screen
  }catch(error){
    console.log('error in handle verify', error);
  }
}


  return (
    <View style={styles.container}>

      <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            androidHardwareAccelerationDisabled
            attemptInvisibleVerification={false} /*android emulator crashes if set to true*/
        />


{ // show the phone number input field when verification id is not set.
  !verificationId && (
    <View>
      <AppText style={headerText}>Enter the phone number</AppText>

      <LabelWrapper label="OTP">
        <TextInput 
          style={smallInputStyle} 
          autoFocus 
          keyboardType='phone-pad' 
          textContentType='telephoneNumber'
          /* phone number must be in format [+][country code][phone number] i.e. E164 format*/
          onChangeText={(phone) => setPhoneNumber(phone)}
        />
     </LabelWrapper>

      <AppButton 
        type="primary"
        onPress={() => sendCode()}
        disabled={!phoneNumber}
        title= "Send Verification Code"
        style={styles.submitButton}
      />
    </View>
  )
  
}

{ // if verification id exists show the confirm code input field.
  verificationId && (
      <View>
      <AppText style={headerText}>Enter the verification code</AppText>

          <TextInput
              editable={!!verificationId}
              placeholder= "123456"
              onChangeText={setVerificationCode}
          />

          <AppButton
              title= "Confirm Verification Code"
              disabled={!verificationCode}
              onPress = {() => verifyCode()}
          />
      </View>
  )
}



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

const headerText = StyleSheet.flatten([
  {
    width: '100%',
    marginTop: '30%',
    marginBottom: '8%',
  },
]);
