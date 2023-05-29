import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, AppButton, ScreenHeader } from '../components';
import { COLORS } from '../../constants';
import { ResetSuccessProps } from '../types/navigation';

export function ResetSuccess({ navigation, route }: ResetSuccessProps) {


  const routeToPage = () => {
    if (route.params.statusResetSuccess == 'logged_out') {
      navigation.navigate('Login');
    } else if (route.params.statusResetSuccess == 'logged_in') {
      navigation.navigate('JobLandingScreen');
    }
  }


  return (
    <View style={styles.container}>
      <ScreenHeader showArrow={true}>Reset Pin</ScreenHeader>

      <AppText style={headerText}>
        Reset pin successful! You have X reset(s) left this month.
      </AppText>

      <AppButton
        type="primary"
        title="Okay"
        onPress={routeToPage}
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
});

const headerText = StyleSheet.flatten([
  {
    width: '100%',
    marginTop: '30%',
    marginBottom: '8%',
  },
]);
