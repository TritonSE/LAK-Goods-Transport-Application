import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, ScreenHeader } from '../components';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import firebaseConfig from '../../firebase-config.json';
import { COLORS } from '../../constants';
import { OTPProps } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';

export function OTP({ navigation }: OTPProps) {
  const auth = useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');


  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={auth.recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // androidHardwareAccelerationDisabled
        attemptInvisibleVerification={false} /*android emulator crashes if set to true*/
      />

      {
        // show the phone number input field when verification id is not set.
        !auth.verificationId && (
          <View style={styles.container}>
            <ScreenHeader showArrow={true}>Forgot Pin?</ScreenHeader>
            <AppText style={styles.headerText}>
              Please enter the mobile number associated with your account. Format is
              [+][countrycode][phone number].
            </AppText>

            <LabelWrapper label="Mobile Number">
              <TextInput
                style={[styles.input, styles.bigInputStyle]}
                autoFocus
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                /* phone number must be in format [+][country code][phone number] i.e. E164 format*/
                onChangeText={(phone) => setPhoneNumber(phone)}
              />
              <AppText style={styles.errorText}>{auth.otpError}</AppText>
            </LabelWrapper>

            <AppButton
              type="primary"
              onPress={() => auth.sendCode(phoneNumber)}
              disabled={!phoneNumber}
              title="Send OTP"
              style={styles.submitButton}
            />
          </View>
        )
      }

      {
        // if verification id exists show the confirm code input field.
        auth.verificationId && (
          <View style={styles.container}>
            <ScreenHeader showArrow={true}>OTP Verification</ScreenHeader>
            <AppText style={styles.headerText}>Please enter the OTP sent to your phone.</AppText>

            <TextInput
              style={[styles.input, styles.bigInputStyle]}
              autoFocus
              keyboardType="phone-pad"
              textContentType="oneTimeCode"
              editable={!!auth.verificationId}
              onChangeText={setVerificationCode}
            />
            <AppText style={styles.errorText}>{auth.otpError}</AppText>

            <AppButton
              title="Confirm Verification Code"
              disabled={!verificationCode}
              onPress={() => auth.verifyCode(verificationCode)}
            />
          </View>
        )
      }

      {auth.user !== null && (
        <View style={styles.container}>
          <AppButton
            type="primary"
            onPress={() => navigation.navigate('JobLandingScreen')}
            // disabled={!auth.allowLogin}
            title="Go to job landing page"
            style={styles.submitButton}
          />
        </View>
      )}
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
  },
});
