import { StyleSheet, Text, View } from 'react-native';
import AddJob from './src/screens/AddJob';

export default function App() {
  return (
    // Thumbnail Demo

    <View style={styles.container}>
      <AddJob></AddJob>
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
