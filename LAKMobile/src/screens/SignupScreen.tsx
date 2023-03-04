import { StyleSheet, View } from 'react-native';
import { AppButton, LabelWrapper, AppText, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import {SignupProps} from '../types/navigation';
import { useContext, useState } from 'react';
import { AuthContext } from '../auth/context';

export function SignupScreen({navigation}: SignupProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const auth = useContext(AuthContext);

  const handleSubmit = async () => {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];

    auth.clearError();
    await auth.signup(firstName, lastName, phoneNumber, location, pin);
    if (auth.user !== null) {
      console.log(auth.user.uid);
      navigation.navigate('JobLandingScreen')
    } else {
      // Display errors now! (invalid password, email already in use, etc.)
    }
  }

  return (
    <View style={styles.container}>
      <LabelWrapper label='Name (First, Last)'>
        <AppTextInput
          value={name}
          style={bigInputStyle}
          changeAction={setName}
          type="name"
          isValid={true}
          errMsg="Required field"
          maxLength={100}
          keyboardType="default"
        />
      </LabelWrapper>
      
      <LabelWrapper label='Mobile Number'>
        <AppTextInput
          value={phoneNumber}
          style={bigInputStyle}
          changeAction={setPhoneNumber}
          type="phoneNumber"
          isValid={true}
          errMsg="Required field"
          maxLength={10}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label='Location'>
        <AppTextInput
          value={location}
          style={bigInputStyle}
          changeAction={setLocation}
          type="location"
          isValid={true}
          errMsg="Required field"
          maxLength={100}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label='4 digit pin password'>
        <AppTextInput
          value={pin}
          style={smallInputStyle}
          changeAction={setPin}
          type="pin"
          isValid={true}
          errMsg="Required field"
          maxLength={4}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <LabelWrapper label='Confirm password'>
      <AppTextInput
          value={confirmPin}
          style={smallInputStyle}
          changeAction={setConfirmPin}
          type="confirmPin"
          isValid={true}
          errMsg="Required field"
          maxLength={4}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <AppButton
        type='primary'
        title='Create Account'
        onPress={handleSubmit}
        style={styles.submitButton}
        />

      <View style={styles.loginLinkContainer}>
        <AppText>Already have an account?</AppText>
        <AppButton 
          type='link' 
          title='Log in here' 
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
    justifyContent: 'space-evenly'
  },
  loginLink: {
    marginLeft: 5,
  }
});

const bigInputStyle = StyleSheet.flatten([
  styles.input, 
  {
    width: '100%',
  }
]);

const smallInputStyle = StyleSheet.flatten([
  styles.input, 
  {
    width: '45%'
  }
])