import React from 'react';
import { JobApplicant } from './src/screens/JobApplicant';
import { StyleSheet, View } from 'react-native';
import {
  SignupScreen,
  LoginScreen,
  ForgotPassword,
  OTP,
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
import { AuthProvider } from './src/auth/context';
import { ApplicantsScreen } from './src/screens/ApplicantsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
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
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetSuccess" component={ResetSuccess} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="JobLandingScreen" component={JobLandingScreen} />
            <Stack.Screen name="JobApplicant" component={JobApplicant} />
            <Stack.Screen name="AddJob" component={AddJob} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ApplicantsScreen" component={ApplicantsScreen} />
            <Stack.Screen
              name="DriverRegistration"
              component={DriverRegistration}
              initialParams={{ userId: getCurrentUser() }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              initialParams={{ userId: getCurrentUser() }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
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
