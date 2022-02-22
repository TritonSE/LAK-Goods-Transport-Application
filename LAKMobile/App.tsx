import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ScreenHeader } from './src/components';
import { SignupScreen, LoginScreen } from './src/screens';
import AddAndFindJobScreen from './src/screens/AddAndFindJobScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ScreenHeader showArrow>Login</ScreenHeader>
      <LoginScreen/>
      <StatusBar style="auto" /> */}
      <AddAndFindJobScreen/>
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
