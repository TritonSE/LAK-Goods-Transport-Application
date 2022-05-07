import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ScreenHeader, ImageCarousel } from "./src/components";
import { SignupScreen, LoginScreen, AddJob } from "./src/screens";

export default function App() {
  return (
    // Thumbnail Demo

    // <View style={styles.container}>
    //   <AddJob></AddJob>
    // </View>

    // <SignupScreen />

    <ImageCarousel
      imageIds={[
        "6230818f1ccd9cfc10ffcbde",
        "6230818f1ccd9cfc10ffcbe0",
        "623082900cd4cacb726883a7",
        "623082900cd4cacb726883a9",
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
