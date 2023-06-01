import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LabelWrapper, AppButton, ScreenHeader, AppTextInput, AppText } from '../components';
import { COLORS } from '../../constants';
import { ResetPasswordProps } from '../types/navigation';

import { AuthContext } from '../context/AuthContext';

export function ResetPassword({ navigation, route }: ResetPasswordProps) {
  const auth = useContext(AuthContext);

  const [newPIN, setNewPIN] = useState('');
  const [confirmPIN, setConfirmPIN] = useState('');

  const [PINValid, setPINValid] = useState(false);

  const [errorUpdating, setErrorUpdating] = useState('');

  const validatePin = (): boolean => {
    const pinRegex = new RegExp('^[0-9]{4}$');

    const validNew = pinRegex.test(newPIN);
    const validConfirm = pinRegex.test(confirmPIN);

    const bothValid = validNew && validConfirm && newPIN === confirmPIN;

    setPINValid(bothValid);
    return bothValid;
  };

  const handleSubmit = async () => {
    console.log('\nAuth', auth);
    const valid = validatePin();
    console.log(valid);
    const user = auth.user;
    console.log('\n User', user);
    if (user !== null && valid) {
      const successfulUpdate = await auth.updatePwd(newPIN);
      if (successfulUpdate) {
        navigation.navigate('ResetSuccess', {
          statusResetSuccess: route.params.statusResetPassword,
        });
      } else {
        setErrorUpdating('There was an error in resetting your PIN, please try again.');
      }
    }
  };

  useEffect(() => {
    validatePin();
  }, [newPIN, confirmPIN]);

  return (
    <View style={styles.container}>
      <ScreenHeader showArrow={true}>Forgot Pin?</ScreenHeader>
      <View style={marginTop} />
      <LabelWrapper label="New 4 digit pin">
        <AppTextInput
          value={newPIN}
          isValid={PINValid}
          style={smallInputStyle}
          changeAction={setNewPIN}
          type="pin"
          maxLength={4}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <LabelWrapper label="Confirm 4 digit pin">
        <AppTextInput
          value={confirmPIN}
          isValid={PINValid}
          style={smallInputStyle}
          changeAction={setConfirmPIN}
          type="pin"
          maxLength={4}
          keyboardType="numeric"
        />
      </LabelWrapper>

      {PINValid ? (
        <AppText style={styles.errText} /> /* dummy element to prevent elements jumping */
      ) : (
        <AppText style={styles.errText}>PINs must be valid and match.</AppText>
      )}

      <AppText style={styles.errText}>{errorUpdating}</AppText>

      <AppButton
        type="primary"
        title="Reset Pin"
        onPress={handleSubmit}
        style={styles.submitButton}
      />
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
  errText: {
    color: COLORS.red,
    fontSize: 12,
    // paddingBottom: 15,
  },
});

const smallInputStyle = StyleSheet.flatten([
  styles.input,
  {
    width: '45%',
  },
]);

const marginTop = StyleSheet.flatten([
  {
    marginTop: '30%',
  },
]);
