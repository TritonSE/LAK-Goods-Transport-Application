import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton, LabelWrapper, AppText, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import { SignupProps } from '../types/navigation';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export function SignupScreen({ navigation }: SignupProps) {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const [location, setLocation] = useState('');
  const [isLocationValid, setIsLocationValid] = useState(false);

  const [pin, setPin] = useState('');
  const [isPINValid, setIsPINValid] = useState(false);

  const [confirmPin, setConfirmPin] = useState('');
  const [isConfirmPINValid, setIsConfirmPINValid] = useState(false);

  const auth = useContext(AuthContext);
  const [authError, setAuthError] = useState<Error | null>(null);

  const [isSignupPressed, setIsSignupPressed] = useState(false);

  useEffect(() => {
    // only spaces and letters allowed in regex pattern
    const nameRegex = new RegExp('^[A-Z][a-z]+ [A-Z][a-z]+$');
    setIsNameValid(nameRegex.test(name));
  }, [name]);

  useEffect(() => {
    // phone number must be 10-digit number
    const phoneRegex = new RegExp('^[0-9]{10}$');
    setIsPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    // only spaces and letters allowed in regex pattern, and must be non-empty
    const locationRegex = new RegExp('^[A-Za-z][A-Za-z ]*$');
    setIsLocationValid(locationRegex.test(location));
  }, [location]);

  useEffect(() => {
    // must be 4-digit number
    const pinRegex = new RegExp('^[0-9]{4}$');
    setIsPINValid(pinRegex.test(pin));
  }, [pin]);

  useEffect(() => {
    // pin confirmation must be the same as original pin
    setIsConfirmPINValid(pin === confirmPin);
  }, [confirmPin, pin]);

  const handleSubmit = async () => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    setAuthError(null);
    auth.clearError();
    setIsSignupPressed(true);
    await auth.signup(firstName, lastName, phoneNumber, location, pin);
    if (auth.user !== null) {
      console.log(auth.user.uid);
      navigation.navigate('JobLandingScreen');
    } else {
      // Display errors (invalid password, email already in use, etc.)
      setAuthError(auth.error);
      console.error(auth.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errText}>{isSignupPressed && authError ? authError.message : ''}</Text>
      <LabelWrapper label="Name (First Last)">
        <AppTextInput
          value={name}
          style={bigInputStyle}
          changeAction={setName}
          type="name"
          isValid={isNameValid}
          errMsg="Valid first and last name required."
          maxLength={100}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label="Mobile Number">
        <AppTextInput
          value={phoneNumber}
          style={bigInputStyle}
          changeAction={setPhoneNumber}
          type="phoneNumber"
          isValid={!isSignupPressed || isPhoneValid}
          errMsg="Valid mobile number required."
          maxLength={10}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label="Location">
        <AppTextInput
          value={location}
          style={bigInputStyle}
          changeAction={setLocation}
          type="location"
          isValid={!isSignupPressed || isLocationValid}
          errMsg="Valid location required."
          maxLength={100}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label="4 digit pin password">
        <AppTextInput
          value={pin}
          style={smallInputStyle}
          changeAction={setPin}
          type="pin"
          isValid={!isSignupPressed || isPINValid}
          errMsg="Valid PIN required."
          maxLength={4}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <LabelWrapper label="Confirm password">
        <AppTextInput
          value={confirmPin}
          style={smallInputStyle}
          changeAction={setConfirmPin}
          type="confirmPin"
          isValid={!isSignupPressed || isConfirmPINValid}
          errMsg="Valid PIN confirmation required."
          maxLength={4}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <AppButton
        type="primary"
        title="Create Account"
        onPress={handleSubmit}
        style={styles.submitButton}
      />

      <View style={styles.loginLinkContainer}>
        <AppText>Already have an account?</AppText>
        <AppButton
          type="link"
          title="Log in here"
          onPress={() => navigation.navigate('Login')}
          style={styles.loginLink}
        />
      </View>
    </View>
  );
}

// Page Styling
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  // Shared across all inputs
  input: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.mediumGrey,
    padding: 10,
    height: 40,
    marginBottom: 14,
  },

  submitButton: {
    width: '100%',
    marginTop: 40,
    marginBottom: 1,
  },

  // Styling for "Log in here" components
  loginLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    justifyContent: 'space-evenly',
  },
  loginLink: {
    marginLeft: 5,
  },

  errText: {
    color: COLORS.red,
    fontSize: 12,
    paddingBottom: 20, // this is adding margin below null errMsg as well
  },
});

const bigInputStyle = StyleSheet.flatten([
  styles.input,
  {
    width: '100%',
  },
]);

const smallInputStyle = StyleSheet.flatten([
  styles.input,
  {
    width: '45%',
  },
]);
