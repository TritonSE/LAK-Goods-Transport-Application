
import {  } from './src/screens';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ScreenHeader, ImageCarousel, ApplicantThumbnail } from "./src/components";
import { SignupScreen, LoginScreen, AddJob, ForgotPassword, OTP } from "./src/screens";
import { MOCK_APPLICANT_DATA } from './constants';
import { DetailsScreen } from './src/screens/DetailsScreen';

export default function App() {
  return <>
   <DetailsScreen jobId="63524f51b015a14af83b653d" />
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
