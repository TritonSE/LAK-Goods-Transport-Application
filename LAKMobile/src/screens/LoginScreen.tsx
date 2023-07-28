import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, AppTextInput, ScreenHeader } from '../components';
import { COLORS } from '../../constants';
import { LoginProps } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';
import { InternationalPhoneInput } from '../components/InternationalPhoneInput';

export function LoginScreen({ navigation }: LoginProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPIN] = useState('');

  const [phoneValid, setPhoneValid] = useState(false);
  const [PINValid, setPINValid] = useState(false);

  const [loginPressed, setLoginPressed] = useState(false);
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  const validatePhone = (): boolean => {
    const phoneRegex = new RegExp(/^(?:\+\d{1,15}|\d{1,16})$/);
    const valid = phoneRegex.test(phoneNumber);
    setPhoneValid(valid);
    return valid;
  };

  const validatePin = (): boolean => {
    const pinRegex = new RegExp('^[0-9]{4}$');
    const valid = pinRegex.test(pin);
    setPINValid(valid);
    return valid;
  };

  const handleSubmit = async () => {
    setLoginError(null);
    auth.clearError();
    setLoginPressed(true);
    const _phoneValid = validatePhone();
    const _pinValid = validatePin();
    if (_phoneValid && _pinValid) {
      setLoading(true);
      const user = await auth.login(phoneNumber, pin);
      setLoading(false);

      if (user !== null) {
        setPhoneNumber('');
        setPIN('');
        navigation.navigate('JobLandingScreen');
      } else {
        //Sets the Firebase error, which then displays it
        setLoginError(auth.error);
      }
    }
  };

  return (
    <>
      <ScreenHeader>Login</ScreenHeader>
      <View style={styles.container}>
        <Text style={styles.errText}>{loginPressed && loginError ? loginError.message : ''}</Text>
        <LabelWrapper label="Mobile Number">
          <InternationalPhoneInput setPhoneNumber={setPhoneNumber} />
        </LabelWrapper>

        <LabelWrapper label="4 Digit PIN">
          <AppTextInput
            value={pin}
            style={smallInputStyle}
            changeAction={setPIN}
            type="pin"
            isValid={!loginPressed || PINValid}
            maxLength={4}
            keyboardType="numeric"
            errMsg="Valid PIN required."
          />
        </LabelWrapper>
        <AppButton
          type="link"
          title="Forgot PIN?"
          onPress={() => navigation.navigate('ConfirmPhoneScreen')}
          style={styles.forgotPIN}
        />

        {/* ternary to check if loading, set type to disabled */}
        <AppButton
          type={loading ? 'disabled' : 'primary'}
          title="Log in"
          onPress={handleSubmit}
          style={styles.submitButton}
        />

        <View style={styles.signupPrompt}>
          <AppText>{"Don't have an account?"}</AppText>
          <AppButton
            type="link"
            title="Sign up here."
            onPress={() => navigation.navigate('Signup')}
            style={styles.signupLink}
          />
        </View>

        <AppText>{'If you have any questions, contact us at laktaa.bhutan@gmail.com'}</AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
    paddingRight: 32,
    paddingTop: '20%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.mediumGrey,
    padding: 10,
    height: 40,
    marginBottom: 14,
  },

  forgotPIN: {
    marginTop: -10,
    elevation: 0,
  },

  submitButton: {
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
    padding: 5,
  },

  signupPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '10%',
  },

  signupLink: {
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
