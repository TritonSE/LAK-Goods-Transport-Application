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

    <ImageCarousel imageIds={["a", "bc", "d"]} />
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
