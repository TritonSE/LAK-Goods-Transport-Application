import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, ScreenHeader, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import { ConfirmPhoneScreenProps } from '../types/navigation';

export function ConfirmPhoneScreen({ navigation }: ConfirmPhoneScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [phoneValid, setPhoneValid] = useState(false);

  const validatePhone = (): boolean => {
    const phoneRegex = new RegExp(/^(?:\+\d{1,15}|\d{1,16})$/);
    const valid = phoneRegex.test(phoneNumber);
    setPhoneValid(valid);
    return valid;
  };

  useEffect(() => {
    validatePhone();
  }, [phoneNumber]);

  return (
    <>
      <ScreenHeader showArrow={true}>Confirm Account</ScreenHeader>
      <View style={styles.container}>
        <AppText style={headerText}>
          Please enter the mobile number associated with your account.
        </AppText>

        <LabelWrapper label="Mobile Number">
          <AppTextInput
            value={phoneNumber}
            style={smallInputStyle}
            changeAction={setPhoneNumber}
            keyboardType="numeric"
            isValid={phoneValid}
            errMsg="Please enter a valid phone number."
          />
        </LabelWrapper>

        <AppButton
          type={'primary'}
          title="Submit"
          onPress={() =>
            navigation.navigate('PhoneVerificationScreen', { phoneNumber, mode: 'reset' })
          }
          style={styles.submitButton}
        />
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
});

const smallInputStyle = StyleSheet.flatten([
  styles.input,
  {
    width: '100%',
  },
]);

const headerText = StyleSheet.flatten([
  {
    width: '100%',
    marginTop: '15%',
    marginBottom: '8%',
  },
]);
