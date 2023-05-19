import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton, LabelWrapper, AppText, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import { SignupProps } from '../types/navigation';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export function SignupScreen({ navigation }: SignupProps) {
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);

  const [location, setLocation] = useState('');
  const [locationValid, setLocationValid] = useState(false);

  const [pin, setPin] = useState('');
  const [PINValid, setPINValid] = useState(false);

  const [confirmPin, setConfirmPin] = useState('');
  const [confirmPINValid, setConfirmPINValid] = useState(false);

  const auth = useContext(AuthContext);
  const [signupError, setSignupError] = useState<Error | null>(null);

  const [isSignupPressed, setSignupPressed] = useState(false);

  const [loading, setLoading] = useState(false);

  const validateName = (): boolean => {
    // only spaces and letters allowed in regex pattern
    const nameRegex = new RegExp('^[A-Z][a-z]+ [A-Z][a-z]+$');
    const valid = nameRegex.test(name);
    setNameValid(valid);
    return valid;
  };

  const validatePhone = (): boolean => {
    // phone number must be 10-digit number
    const phoneRegex = new RegExp('^[0-9]{10}$');
    const valid = phoneRegex.test(phoneNumber);
    setPhoneValid(valid);
    return valid;
  };

  const validateLocation = (): boolean => {
    // only spaces and letters allowed in regex pattern, and must be non-empty
    const locationRegex = new RegExp('^[A-Za-z][A-Za-z ]*$');
    const valid = locationRegex.test(location);
    setLocationValid(valid);
    return valid;
  };

  const validatePin = (): boolean => {
    // must be 4-digit number
    const pinRegex = new RegExp('^[0-9]{4}$');
    const valid = pinRegex.test(pin);
    setPINValid(valid);
    return valid;
  };

  const validateConfirmPin = (): boolean => {
    // pin confirmation must be the same as original pin
    const valid = pin === confirmPin;
    setConfirmPINValid(valid);
    return valid;
  };

  const handleSubmit = async () => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    setSignupError(null);
    auth.clearError();
    setSignupPressed(true);

    validateName();
    validatePhone();
    validateLocation();
    validatePin();
    validateConfirmPin();

    if (nameValid && phoneValid && locationValid && PINValid && confirmPINValid) {
      setLoading(true);
      const user = await auth.signup(firstName, lastName, phoneNumber, location, pin);
      setLoading(false);
      if (user !== null) {
        console.log(user.uid);
        navigation.navigate('JobLandingScreen');
      } else {
        // Display errors (invalid password, email already in use, etc.)
        setSignupError(auth.error);
        console.error(auth.error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errText}>
        {isSignupPressed && signupError ? signupError.message : ''}
      </Text>
      <LabelWrapper label="Name (First Last)">
        <AppTextInput
          value={name}
          style={bigInputStyle}
          changeAction={setName}
          type="name"
          isValid={!isSignupPressed || nameValid}
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
          isValid={!isSignupPressed || phoneValid}
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
          isValid={!isSignupPressed || locationValid}
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
          isValid={!isSignupPressed || PINValid}
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
          isValid={!isSignupPressed || confirmPINValid}
          errMsg="Valid PIN confirmation required."
          maxLength={4}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <AppButton
        type={loading ? 'disabled' : 'primary'}
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
