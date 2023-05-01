import React from 'react';
import { JobApplicant } from './src/screens/JobApplicant';
import { StyleSheet, View } from 'react-native';
import {
  SignupScreen,
  LoginScreen,
  PhoneVerificationScreen,
  AddJob,
  ProfileScreen,
  JobLandingScreen,
  DriverRegistration,
  EditProfileScreen,
} from './src/screens';
import { ResetSuccess } from './src/screens/ResetSuccess';
import { ResetPassword } from './src/screens/ResetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import { ApplicantsScreen } from './src/screens/ApplicantsScreen';
import { ImageUploadProvider } from './src/context/ImageUploadContext';
import { DriverApplyScreen } from './src/screens/DriverApplyScreen';
import { ConfirmPhoneScreen } from './src/screens/ConfirmPhoneScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ImageUploadProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="ResetSuccess" component={ResetSuccess} />
              <Stack.Screen name="ConfirmPhoneScreen" component={ConfirmPhoneScreen} />
              <Stack.Screen name="PhoneVerificationScreen" component={PhoneVerificationScreen} />
              <Stack.Screen name="JobLandingScreen" component={JobLandingScreen} />
              <Stack.Screen name="JobApplicant" component={JobApplicant} />
              <Stack.Screen name="AddJob" component={AddJob} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="ApplicantsScreen" component={ApplicantsScreen} />
              <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
              <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
              <Stack.Screen name="DriverApplyScreen" component={DriverApplyScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ImageUploadProvider>
    </AuthProvider>
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
