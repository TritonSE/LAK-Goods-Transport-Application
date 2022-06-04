import React, { Reducer, useCallback, useReducer, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import {
  AppText,
  LabelWrapper,
  AppButton,
  ScreenHeader,
  AppTextInput,
  ImagePickerButton,
  ModalAlert,
} from "../components";
import { COLORS } from "../../constants";

const LOCATIONS = [
  "-- Select a district --",
  "Bumthang",
  "Chhukha",
  "Dagana",
  "Gasa",
  "Haa",
  "Lhuentse",
  "Mongar",
  "Paro",
  "Pema Gatshel",
  "Punakha",
  "Samdrup Jongkhar",
  "Samtse",
  "Sarpang",
  "Thimphu",
  "Trashigang",
  "Trashi Yangtse",
  "Trongsa",
  "Tsirang",
  "Wangdue Phodrang",
  "Zhemgang",
];

type ImagesReducerState = string[];

interface ImagesReducerAddAction {
  type: "ADD_IMAGE";
  payload: string;
}

interface ImagesReducerRemoveAction {
  type: "REMOVE_IMAGE";
  payload: number;
}

type ImagesReducerAction = ImagesReducerAddAction | ImagesReducerRemoveAction;

type ImagesReducer = Reducer<ImagesReducerState, ImagesReducerAction>;

const reducer: ImagesReducer = (state, action): ImagesReducerState => {
  let newState = state.slice();
  switch (action.type) {
    case "ADD_IMAGE":
      const index = newState.findIndex((value) => value === "");
      newState[index] = action.payload;
      break;
    case "REMOVE_IMAGE":
      newState[action.payload] = "";
      newState = newState.filter((value) => value !== "");
      while (newState.length < 3) {
        newState.push("");
      }
      break;
  }
  return newState;
};

export function AddJob() {
  const [imageURIs, dispatch] = useReducer(reducer, ["", "", ""]);
  const [permissionAlertVisible, setPermissionAlertVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDistrict, setPickupDistrict] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dropoffDistrict, setDropoffDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const openImagePicker = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setPermissionAlertVisible(true);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      return;
    }
    dispatch({ type: "ADD_IMAGE", payload: pickerResult.uri });
  }, []);

  const handleTapImage = useCallback(
    (index) => {
      if (imageURIs[index] === "") {
        openImagePicker();
      } else {
        dispatch({ type: "REMOVE_IMAGE", payload: index });
      }
    },
    [imageURIs, openImagePicker]
  );

  const submitJob = useCallback(() => {
    // TODO: when submitting, remember to filter out empty strings from imageURIs
    console.log("submitJob");
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <ScreenHeader showArrow>Add Job</ScreenHeader>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <LabelWrapper label="Job Title">
          <AppTextInput
            value={jobTitle}
            onChangeText={setJobTitle}
            style={[inputStyle2, styles.spacer]}
            placeholder="Ex. Box of apples"
            maxLength={100}
            keyboardType="default"
          />
        </LabelWrapper>

        <LabelWrapper label="Client Name">
          <AppTextInput
            value={clientName}
            onChangeText={setClientName}
            style={[inputStyle2, styles.spacer]}
            placeholder="Ex. Gabby Gibson"
            maxLength={100}
            keyboardType="default"
          />
        </LabelWrapper>

        <LabelWrapper label="Date to be delivered">
          <AppTextInput
            value={deliveryDate}
            onChangeText={setDeliveryDate}
            style={inputStyle2}
            placeholder="Ex. MM/DD/YYYY"
            maxLength={10}
            keyboardType="default"
          />
          <AppText style={[styles.inputFooterText, styles.spacer]}>
            (put N/A if not applicable)
          </AppText>
        </LabelWrapper>

        <LabelWrapper label="Description">
          <AppTextInput
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.multilineInput, styles.spacer]}
            maxLength={1000}
            placeholder={
              "Tell us about your package. Add any extra detail about its size. \n\n Ex. Package will fill up 1/3 of a truck."
            }
          />
        </LabelWrapper>

        {/*  
      TODO:  
      (2) Edit: size of the TextInput box so that it shows all the placeholder text. 
      Right now you need to scroll down to see all the text.
       */}

        <LabelWrapper label="Package Quantity">
          <AppTextInput
            value={quantity}
            onChangeText={setQuantity}
            style={[inputStyle1, styles.spacer]}
            placeholder="Ex. 6"
            maxLength={10}
          />
        </LabelWrapper>

        <LabelWrapper label="Estimated price of delivery">
          <AppTextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Ex. $$"
            maxLength={20}
            style={[inputStyle1, styles.spacer]}
          />
        </LabelWrapper>

        <LabelWrapper label="Pick-up location">
          <AppTextInput
            value={pickupLocation}
            onChangeText={setPickupLocation}
            style={inputStyleFull}
            placeholder="Ex. Insert address or landmark"
            maxLength={100}
            icon="location-pin"
          />

          <View style={[styles.pickerWrapper, styles.spacer]}>
            <Picker
              selectedValue={pickupDistrict}
              onValueChange={(value) => setPickupDistrict(value)}
              mode="dropdown" // Android only
            >
              {LOCATIONS.map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
          </View>
        </LabelWrapper>

        <LabelWrapper label="Drop-off location">
          <AppTextInput
            value={dropoffLocation}
            onChangeText={setDropoffLocation}
            style={inputStyleFull}
            placeholder="Ex. Insert address or landmark"
            maxLength={100}
            icon="location-pin"
          />
          <View style={[styles.pickerWrapper, styles.spacer]}>
            <Picker
              selectedValue={dropoffDistrict}
              onValueChange={(value) => setDropoffDistrict(value)}
              mode="dropdown" // Android only
            >
              {LOCATIONS.map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
          </View>
        </LabelWrapper>

        <LabelWrapper label="Phone number">
          <AppTextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={[inputStyleFull, styles.spacer]}
            placeholder="Ex. 17113456"
            icon="phone-in-talk"
          />
        </LabelWrapper>

        <View style={styles.photos}>
          {imageURIs.map((uri, index) => (
            <ImagePickerButton
              key={index}
              sourceURI={uri}
              onSelect={() => handleTapImage(index)}
            />
          ))}
        </View>

        <View style={[styles.spacer]}>
          <AppText style={styles.photoInstructions}>
            At least one photo of the package is required. Tap on a photo to
            remove it.
          </AppText>
          <AppText style={styles.photoInstructions}>
            Note: The first photo will be the thumbnail of the job listing.
          </AppText>
        </View>

        <AppButton
          onPress={submitJob}
          style={[styles.center, { width: "100%" }]}
          title="Post Job"
          type="primary"
        />
      </ScrollView>
      <ModalAlert
        title="Permission Needed"
        message="Please allow access to photos in Settings!"
        confirmLabel="Close"
        onConfirm={() => setPermissionAlertVisible(false)}
        visible={permissionAlertVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.mediumGrey,
    height: 40,
  },

  inputFooterText: {
    fontSize: 12,
  },

  multilineInput: {
    borderWidth: 1,
    height: 75,
    width: "80%",
    borderRadius: 4,
    paddingHorizontal: 5,
    borderColor: COLORS.mediumGrey,
  },

  container: {
    padding: 32,
    paddingBottom: 140,
  },

  header: {
    marginBottom: 100,
  },

  photos: {
    flexDirection: "row",
    alignSelf: "center",
  },
  photoInstructions: {
    fontSize: 12,
  },

  center: {
    alignSelf: "center",
  },
  pickerWrapper: {
    padding: 0,
    margin: 0,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.mediumGrey,
  },
  spacer: {
    marginBottom: 20,
  },
});

const inputStyle1 = StyleSheet.flatten([
  styles.input,
  {
    width: "40%",
  },
]);

const inputStyle2 = StyleSheet.flatten([
  styles.input,
  {
    width: "60%",
  },
]);

const inputStyleFull = StyleSheet.flatten([
  styles.input,
  {
    width: "100%",
  },
]);
