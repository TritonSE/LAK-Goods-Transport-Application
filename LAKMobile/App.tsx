import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import JobThumbnail from './src/components/JobThumbnail';

export default function App() {
  return (
    <View style={styles.container}>
      <JobThumbnail title="Box of apples" pickup="Location" dropoff="Location" deliver="MM/DD/YYYY" quantity="Amount" days={1} applicants={1} image={require("./assets/abble.png")} inProgress />
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
