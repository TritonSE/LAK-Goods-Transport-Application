import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenHeader } from './src/components';
import JobThumbnail from './src/components/JobThumbnail';
import { SignupScreen, LoginScreen } from './src/screens';
import AddJobsFindJobs from './src/screens/AddJobsFindJobs';

export default function App() {
  return (
    <View style={styles.container}>
      <AddJobsFindJobs></AddJobsFindJobs>
      <StatusBar style="auto" />
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
