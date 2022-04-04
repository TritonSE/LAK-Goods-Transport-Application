import { StyleSheet, View } from 'react-native';
import JobThumbnail from './src/components/JobThumbnail';
import { MOCK_JOB_DATA } from './constants';
import { AppText } from './src/components';

export default function App() {
  return (
    <View style={styles.container}>
      <JobThumbnail job={{...MOCK_JOB_DATA, applicants: 2}} image={require("./assets/abble.png")} displayStatus='Not Started' isJobOwner />
      <JobThumbnail job={MOCK_JOB_DATA} image={require("./assets/abble.png")} displayStatus='In Progress' isJobOwner daysAgo={2}/>
      <JobThumbnail job={{...MOCK_JOB_DATA, applicants: 4}} image={require("./assets/abble.png")} displayStatus='Applied' daysAgo={2}/>
      <JobThumbnail job={{...MOCK_JOB_DATA, applicants: 4}} image={require("./assets/abble.png")} displayStatus='Accepted' />
      <JobThumbnail job={MOCK_JOB_DATA} image={require("./assets/abble.png")} displayStatus='Denied' />
      <JobThumbnail job={MOCK_JOB_DATA} image={require("./assets/abble.png")} displayStatus='Finished' />
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
