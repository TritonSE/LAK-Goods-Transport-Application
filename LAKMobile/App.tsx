import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, ScreenHeader } from './src/components';
import JobThumbnail from './src/components/JobThumbnail';
import { SignupScreen, LoginScreen } from './src/screens';
import AddJobsFindJobs from './src/screens/AddJobsFindJobs';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText>Home!</AppText>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText>Settings!</AppText>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* <AddJobsFindJobs></AddJobsFindJobs>
      
      <StatusBar style="auto" /> */}

      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
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
