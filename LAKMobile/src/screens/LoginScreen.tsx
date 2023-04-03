import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import { LoginProps } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

export function LoginScreen({ navigation }: LoginProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPIN] = useState('');

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPINValid, setIsPINValid] = useState(false);

  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [authError, setAuthError] = useState<Error | null>(null);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const phoneRegex = new RegExp('^[0-9]{10}$');
    setIsPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    const pinRegex = new RegExp('^[0-9]{4}$');
    setIsPINValid(pinRegex.test(pin));
  }, [pin]);

  return (
    <View style={styles.container}>
      <Text style={styles.errText}>{isLoginPressed && authError ? authError.message : ''}</Text>
      <LabelWrapper label="Mobile Number">
        <AppTextInput
          value={phoneNumber}
          style={bigInputStyle}
          changeAction={setPhoneNumber}
          type="phoneNumber"
          maxLength={10}
          keyboardType="default"
          isValid={!isLoginPressed || isPhoneValid}
          errMsg="Valid mobile number required."
        />
      </LabelWrapper>

      <LabelWrapper label="4 Digit PIN">
        <AppTextInput
          value={pin}
          style={smallInputStyle}
          changeAction={setPIN}
          type="pin"
          isValid={!isLoginPressed || isPINValid}
          maxLength={4}
          keyboardType="numeric"
          errMsg="Valid PIN required."
        />
      </LabelWrapper>
      <AppButton
        type="link"
        title="Forgot PIN?"
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPIN}
      />

      <AppButton
        type="primary"
        title="Log in"
        onPress={async () => {
          setAuthError(null);
          auth.clearError();
          setIsLoginPressed(true);
          await auth.login(phoneNumber, pin);
          if (auth.user !== null) {
            setPhoneNumber('');
            setPIN('');
            navigation.navigate('JobLandingScreen');
          } else {
            //Sets the Firebase error, which then displays it
            setAuthError(auth.error);
          }
        }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
    flex: 1,
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
