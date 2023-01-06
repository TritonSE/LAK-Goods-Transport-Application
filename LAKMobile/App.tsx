import { MOCK_APPLICANT_DATA } from './constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ScreenHeader, ImageCarousel, ApplicantThumbnail } from './src/components';
import { SignupScreen, LoginScreen, AddJob, ForgotPassword, OTP, ListJobs } from './src/screens';
import { ResetSuccess } from "./src/screens/ResetSuccess";
import { ResetPassword } from "./src/screens/ResetPassword";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { JobApplicant } from './src/screens/JobApplicant';

const Stack = createNativeStackNavigator();



export default function App() {
  return <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListJobs" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetSuccess" component={ResetSuccess} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="ListJobs" component={ListJobs} />
        <Stack.Screen name="JobApplicant" component={JobApplicant} />
        <Stack.Screen name="AddJob" component={AddJob} />
      </Stack.Navigator>
    </NavigationContainer>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});