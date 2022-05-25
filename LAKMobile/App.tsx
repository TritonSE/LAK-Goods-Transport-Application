import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ScreenHeader } from './src/components';
import { SignupScreen, LoginScreen, AddJob, ForgotPassword, OTP } from './src/screens';
import {ResetSuccess} from "./src/screens/ResetSuccess";
import {ResetPassword} from "./src/screens/ResetPassword";

export default function App() {
  return (
    // Thumbnail Demo

    <View style={styles.container}>
      <ResetPassword></ResetPassword>
    </View>

    // <SignupScreen />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
