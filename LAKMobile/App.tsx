
import {  } from './src/screens';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ScreenHeader, ImageCarousel, ApplicantThumbnail } from "./src/components";
import { SignupScreen, LoginScreen, AddJob, ForgotPassword, OTP } from "./src/screens";
import { MOCK_APPLICANT_DATA } from './constants';

export default function App() {
  return <>
    <ListJobs />
    {/* // Thumbnail Demo */}
    {/* <View style={styles.container}>
      <ApplicantThumbnail applicantData={MOCK_APPLICANT_DATA} status='Accepted' style={{marginHorizontal: 10}}/>
      <ApplicantThumbnail applicantData={MOCK_APPLICANT_DATA} status='Unassigned' style={{marginHorizontal: 10}}/>
      <ApplicantThumbnail applicantData={MOCK_APPLICANT_DATA} status='Denied' style={{marginHorizontal: 10}}/>
    </View> */}


    <View style={styles.container}>
      <ForgotPassword></ForgotPassword>
    </View>

    // <SignupScreen />

  );
    {/* // Carousel Demo */}
    {/* <ImageCarousel
      imageIds={[
        "6230818f1ccd9cfc10ffcbde",
        "6230818f1ccd9cfc10ffcbe0",
        "623082900cd4cacb726883a7",
        "623082900cd4cacb726883a9",
      ]}
    /> */}
  </>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
