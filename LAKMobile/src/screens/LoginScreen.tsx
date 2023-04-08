import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import { LoginProps } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';

export function LoginScreen({ navigation }: LoginProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPIN] = useState('');

  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <LabelWrapper label="Mobile Number">
        <AppTextInput
          value={phoneNumber}
          style={bigInputStyle}
          changeAction={setPhoneNumber}
          type="phoneNumber"
          maxLength={10}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label="4 Digit PIN">
        <AppTextInput
          value={pin}
          style={smallInputStyle}
          changeAction={setPIN}
          type="pin"
          isValid={true}
          errMsg="Required field"
          maxLength={4}
          keyboardType="numeric"
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
          auth.clearError();
          await auth.login(phoneNumber, pin);
          if (auth.user !== null) {
            setPhoneNumber('');
            setPIN('');
            navigation.navigate('JobLandingScreen');
          } else {
            // Display the error now...
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
