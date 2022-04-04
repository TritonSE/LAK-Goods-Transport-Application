import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppText, ScreenHeader } from './src/components';
import TabHeader from './src/components/TabHeader';
import { SignupScreen, LoginScreen } from './src/screens';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <ScreenHeader showArrow>Login</ScreenHeader>

        <LoginScreen/>

        <StatusBar style="auto" /> */}

        <TabHeader></TabHeader>
        
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
    // Font styling accross application
    fontFamily: 'Roboto',
    fontSize: 18,
    lineHeight: 18.75
  },
});
