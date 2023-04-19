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

  const authContext = useContext(AuthContext);


  const recaptchaVerifier = useRef<any>(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationID] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [error, setError] = useState('');


  // initialize phone provider and get verification id from recaptcha
  const sendCode = async () => {
    try {
        const phoneProvider = new PhoneAuthProvider(auth); 
        const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
        setVerificationID(verificationId);
        setError('');
        console.log('Success : Verification code has been sent to your phone');
    } catch (e){
        console.log('error in handle send verification', e);
        setError('There was an error with your entered mobile number.');
    }
};

  // get the otp and verify it
  const verifyCode = async () => {
    try {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        await signInWithCredential(auth, credential);
        console.log('successfully signed in with credential');
        await authContext.signInUserOTP(credential);
        console.log('successfully set auth context');
        navigation.navigate('JobLandingScreen');
    } catch(e){
      console.log('error in handle verify', e);
      setError('There was an error in validating your OTP.')
    }
  }


  return (
    <View style={styles.container}>

      <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            // androidHardwareAccelerationDisabled
            attemptInvisibleVerification={false} /*android emulator crashes if set to true*/
        />


{ // show the phone number input field when verification id is not set.
  !verificationId && (
    <View style={styles.container}>

      <ScreenHeader showArrow={true}>Forgot Pin?</ScreenHeader>
      <AppText style={styles.headerText}>
        Please enter the mobile number associated with your account. Format is [+][countrycode][phone number].
      </AppText>

      <LabelWrapper label="Mobile Number">
        <TextInput 
          style={[styles.input, styles.bigInputStyle]} 
          autoFocus 
          keyboardType='phone-pad' 
          textContentType='telephoneNumber'
          /* phone number must be in format [+][country code][phone number] i.e. E164 format*/
          onChangeText={(phone) => setPhoneNumber(phone)}
        />
        <AppText style={styles.errorText}>
          {error}
        </AppText>
     </LabelWrapper>

      <AppButton 
        type="primary"
        onPress={() => sendCode()}
        disabled={!phoneNumber}
        title= "Send OTP"
        style={styles.submitButton}
      />
    </View>
  )
  
}

{ // if verification id exists show the confirm code input field.
  verificationId && (
    <View style={styles.container}>
      <ScreenHeader showArrow={true}>OTP Verification</ScreenHeader>
      <AppText style={styles.headerText}>Please enter the OTP sent to your phone.</AppText>

        <TextInput
            style={[styles.input, styles.bigInputStyle]} 
            autoFocus 
            keyboardType='phone-pad' 
            textContentType='oneTimeCode'
            editable={!!verificationId}
            onChangeText={setVerificationCode}
        />
        <AppText style={styles.errorText}>
          {error}
        </AppText>

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

  headerText: {
    width: '100%',
    marginTop: '30%',
    marginBottom: '8%',
  },
  
  errorText: {
    width: '100%',
    color: 'red',
    marginTop: '8%',
    marginBottom: '8%',
  },

  bigInputStyle: {
    width: 200,
  }
});
