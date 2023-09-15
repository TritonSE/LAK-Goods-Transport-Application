import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, ScreenHeader, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import { PhoneVerificationScreenProps } from '../types/navigation';
import { AuthContext, getFirebaseConfig } from '../context/AuthContext';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export function PhoneVerificationScreen({ navigation, route }: PhoneVerificationScreenProps) {
  const auth = useContext(AuthContext);

  const phone = route.params.phoneNumber;
  const mode = route.params.mode;
  const [verificationID, setVerificationID] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [validCode, setValidCode] = useState<boolean>(true);
  const recaptchaVerifier = useRef<any>();
  const [displayError, setDisplayError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validateCode = (): boolean => {
    // Must be a 6-digit number
    const regex = new RegExp('^[0-9]{6}$');
    const valid = regex.test(verificationCode);
    setValidCode(valid);
    return valid;
  };

  const sendSMSCode = (mode: string) => {
    auth
      .sendSMSCode(phone, recaptchaVerifier.current, mode)
      .then((verificationID) => setVerificationID(verificationID));
  };

  useEffect(() => {
    sendSMSCode(mode);
  }, []);

  const onSubmit = async () => {
    setDisplayError('');
    if (!validateCode()) {
      return;
    }
    if (mode === 'signup' && route.params.userData) {
      // After routing here from the SignupScreen, we wait for the user to confirm
      // their phone number. After it's confirmed, we can register and link their PIN
      // sign up with their phone.
      const { firstName, lastName, phoneNumber, location, pin } = route.params.userData;
      setLoading(true);
      const success = await auth.verifyPhone(verificationID, verificationCode);
      if (success) {
        // also register the user in the backend and link their email/phone in firebase
        const user = await auth.registerUser(firstName, lastName, phoneNumber, location, pin);
        setLoading(false);
        if (user !== null) {
          navigation.navigate('JobLandingScreen');
        }
      }
      setLoading(false);
      setDisplayError(auth.error?.message || '');
    } else if (mode === 'reset') {
      // After routing here from Reset or Forgot PIN, we verify the user's phone number,
      // then send them to the ResetPassword screen.
      setLoading(true);
      const success = await auth.verifyPhone(verificationID, verificationCode);
      setLoading(false);
      if (success) {
        navigation.navigate('ResetPassword', {
          statusResetPassword: 'logged_out',
        });
      } else {
        setDisplayError(auth.error?.message || '');
      }
    }
  };

  return (
    <>
      <ScreenHeader showArrow={true}>Verify Phone</ScreenHeader>
      <View style={styles.container}>
        <AppText style={styles.errText}>{displayError} </AppText>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={getFirebaseConfig()}
          attemptInvisibleVerification={false}
        />
        <AppText style={headerText}>
          {`Enter the 6-digit verification code that we sent to ${phone}.`}
        </AppText>

        <LabelWrapper label="OTP">
          <AppTextInput
            value={verificationCode}
            style={smallInputStyle}
            changeAction={setVerificationCode}
            keyboardType="numeric"
            maxLength={6}
            isValid={validCode}
            errMsg="Please enter a valid verification code."
          />
        </LabelWrapper>

        <AppButton
          type={loading ? 'disabled' : 'primary'}
          title="Submit"
          onPress={onSubmit}
          style={styles.submitButton}
        />
        <View style={styles.resendCode}>
          <AppText style={styles.resendCode}>{`Didn't get anything?`}</AppText>
          <AppButton
            type="link"
            title="Resend Code"
            onPress={() => sendSMSCode('reset')}
            style={styles.resendCodeLink}
            textStyle={styles.resendCodeLinkText}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 32,
    paddingRight: 32,
  },

  errText: {
    color: COLORS.red,
    fontSize: 12,
    paddingBottom: 20, // this is adding margin below null errMsg as well
    marginTop: '15%',
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

  resendCode: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },

  resendCodeLink: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  resendCodeLinkText: {
    fontSize: 16,
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
    marginBottom: '8%',
  },
]);
