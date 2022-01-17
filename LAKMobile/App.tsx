import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SignupScreen } from './src/screens';
export default function App() {
  return (
    <View style={styles.container}>      
      <StatusBar style="auto" />
      <SignupScreen />
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
