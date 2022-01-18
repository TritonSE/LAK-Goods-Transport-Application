import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ScreenHeader from './src/components/ScreenHeader';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ScreenHeader showArrow>Login</ScreenHeader>
      <LoginScreen/>
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
  },
});
