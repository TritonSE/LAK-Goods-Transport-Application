import React, { Reducer, useCallback, useEffect, useReducer, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import type { ImagePickerErrorResult } from "expo-image-picker";
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

const PICKER_DEFAULT = "-- Select a district --"
const LOCATIONS = [
  PICKER_DEFAULT,
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



interface AddJobProps {
  formType: "add" | "edit" | "repost";
  jobID: string | null;
}

export function AddJob({ formType, jobID }: AddJobProps) {
  const [isValid, setIsValid] = useState({
    "jobTitle": false,
    "phoneNumber": false,
    "deliveryDate": false,
    "selectPickup": false,
    "selectDropoff": false,
    "imageSelect": false
  })
  interface ImagesReducerSetAction {
    type: "SET_IMAGES";
    payload: string[];
  }

  type ImagesReducerAction = ImagesReducerAddAction | ImagesReducerRemoveAction | ImagesReducerSetAction;

  type ImagesReducer = Reducer<ImagesReducerState, ImagesReducerAction>;

  const reducer: ImagesReducer = (state, action): ImagesReducerState => {
    let newState = state.slice();
    switch (action.type) {
      case "ADD_IMAGE":
        const index = newState.findIndex((value) => value === "");
        newState[index] = action.payload;
        setIsValid({...isValid, ["imageSelect"]: true})
        break;
      case "REMOVE_IMAGE":
        newState[action.payload] = "";
        newState = newState.filter((value) => value !== "");
        while (newState.length < 3) {
          newState.push("");
        }
        let valid = newState.some(v => v !== "")
        console.log(valid)
        setIsValid({...isValid, ["imageSelect"]: (valid)})
        break;
    }
    return newState;
  };

  const [imageURIs, dispatch] = useReducer(reducer, ["", "", ""]);
  const [permissionAlertVisible, setPermissionAlertVisible] = useState(false);
  const [imagePickPromptVisible, setImagePickPromptVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDistrict, setPickupDistrict] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dropoffDistrict, setDropoffDistrict] = useState("");


  type ImagesReducerState = string[];

  interface ImagesReducerAddAction {
    type: "ADD_IMAGE";
    payload: string;
  }

  interface ImagesReducerRemoveAction {
    type: "REMOVE_IMAGE";
    payload: number;
  }


  //TODO: Abstract text validation to make more DRY
  const validatePresence = (text: string, type: string) => {
    let valid = text.length > 0;
    setIsValid({...isValid, [type]: (valid)})
    return valid
  }

  const validatePhoneNumber = (text: string, type: string) => {
    let valid = (text.startsWith('1') || text.startsWith('7')) && text.length == 8
    setIsValid({...isValid, [type]: (valid)})
    return valid
  }

  const validateDate = (text: string, type: string) => {
    let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    let valid = date_regex.test(text);
    setIsValid({...isValid, [type]: (valid)})
    return valid
  }

  const validatePickerSelect = (value: string, type: string) => {
    let valid = value !== PICKER_DEFAULT
    setIsValid({...isValid, [type]: (valid)})
    return valid
  }



  const validators = {
    presence: validatePresence,
    phoneNumber: validatePhoneNumber,
    date: validateDate,
    picker: validatePickerSelect,
  }
  



  useEffect(() => {
    const getJobData = async () => {
      fetch("http://10.0.2.2:3000/api/jobs/" + jobID + "?user=client1", {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      }).then(async (response) => {
        let json = await response.json();
        console.log(JSON.stringify(json));
        const job = json.job;
        setJobTitle(job.title);
        setClientName(job.clientName);
        setPhoneNumber(job.phoneNumber);
        setDeliveryDate(job.deliveryDate);
        setDescription(job.description);
        setQuantity(job.packageQuantity.toString());
        setPrice(job.price.toString());
        setPickupLocation(job.pickupLocation);
        setPickupDistrict("");
        setDropoffLocation(job.dropoffLocation);
        setDropoffDistrict("");
        dispatch({ type: "SET_IMAGES", payload: job.imageIds });
      });
    };
    if (formType !== "add") {
      getJobData();
    }
  }, [formType, jobID]);

  const openImageLibrary = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setPermissionAlertVisible(true);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images});
    if (!pickerResult.cancelled) {
      dispatch({ type: "ADD_IMAGE", payload: pickerResult.uri });
    }
    setImagePickPromptVisible(false);
  }, []);

  const openCamera = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      setPermissionAlertVisible(true);
      return;
    }
    const cameraResult = await ImagePicker.launchCameraAsync();
    if (!cameraResult.cancelled) {
      dispatch({ type: "ADD_IMAGE", payload: cameraResult.uri });
    }
    setImagePickPromptVisible(false);
  }, []);

  const handleTapImage = useCallback(
    (index) => {
      if (imageURIs[index] === "") {
        setImagePickPromptVisible(true);
      } else {
        dispatch({ type: "REMOVE_IMAGE", payload: index });
      }
    },
    [imageURIs]
  );

  const submitJob = async() => {
    // TODO: when submitting, remember to filter out empty strings from imageURIs
    console.log("SUBMITTED")

    if (formType === "add" || formType=="repost") {
      const body={
        //TODO pickup and dropoff district
        title: jobTitle.trim(),
        clientName: clientName.trim(),
        phoneNumber: phoneNumber,
        deliveryDate: deliveryDate,
        description: description.trim(),
        packageQuantity: parseInt(quantity),
        price: parseInt(price),
        pickupLocation: pickupLocation.trim(),
        dropoffLocation: dropoffLocation.trim(),
        imageIds: imageURIs.filter((value) => value !== "")
      }
      fetch("http://10.0.2.2:3000/api/jobs/?user=client1", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        }, 
        body: JSON.stringify(body)
      }).then(async (response) => {
        let json = await response.json();
        console.log(JSON.stringify(json));
        console.log(json.jobId);

        //TODO


      });
    }
    else if (formType === "edit") {
      const body={
        //TODO pickup and dropoff district
        title: jobTitle,
        clientName: clientName,
        phoneNumber: phoneNumber,
        deliveryDate: deliveryDate,
        description: description,
        packageQuantity: parseInt(quantity),
        price: parseInt(price),
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        imageIds: imageURIs.filter((value) => value !== "")
      }
      //TODO
      fetch("http://10.0.2.2:3000/api/jobs/" + jobID + "?user=client1", {
        method: "PATCH",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body)
      }).then(async (response) => {
        let json = await response.json();
        console.log(JSON.stringify(json));
      })

    }
    else {
      //TODO
    }
  };

  const deleteJob = () => {
    // TODO
    console.log("JOBID IS " + jobID)
    fetch("http://10.0.2.2:3000/api/jobs/" + jobID +"?user=client1", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      }, 
    }).then(async (response) => {
      let json = await response.json();
      console.log(JSON.stringify(json));

      //TODO - Route out of page


    });
  };

  return (
    <View>
      <View style={styles.header}>
        <ScreenHeader showArrow>Add Job</ScreenHeader>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <LabelWrapper label="Job Title">
          <AppTextInput
            value={jobTitle}
            changeAction={setJobTitle}
            style={[inputStyle2, styles.spacer]}
            placeholder="Ex. Box of apples"
            checkValid={validators.presence}
            type="jobTitle"
            errMsg = "Please write a title for your listing."
            maxLength={100}
            keyboardType="default"
          />
        </LabelWrapper>

        <LabelWrapper label="Client Name">
          <AppTextInput
            value={clientName}
            changeAction={setClientName}
            style={[inputStyle2, styles.spacer]}
            placeholder="Ex. Gabby Gibson"
            maxLength={100}
            keyboardType="default"
          />
        </LabelWrapper>

        <LabelWrapper label="Phone number">
          <AppTextInput
            value={phoneNumber}
            changeAction={setPhoneNumber}
            style={[inputStyleFull, styles.spacer]}
            placeholder="Ex. 17113456"
            icon="phone-in-talk"
            checkValid={validators.phoneNumber}
            type="phoneNumber"
            keyboardType="numeric"
            errMsg="Please insert the sender's phone number"
          />
        </LabelWrapper>

        <LabelWrapper label="Receiver name">
          <AppTextInput
            value={receiverName}
            changeAction={setReceiverName}
            style={[inputStyle2, styles.spacer]}
            placeholder="First Last"
            maxLength={100}
            keyboardType="default"
          />
        </LabelWrapper>

        <LabelWrapper label="Receiver phone number">
          <AppTextInput
            value={receiverPhoneNumber}
            changeAction={setReceiverPhoneNumber}
            style={[inputStyleFull, styles.spacer]}
            placeholder="Ex. 17113456"
            icon="phone-in-talk"
            keyboardType="numeric"
          />
        </LabelWrapper>

        <LabelWrapper label="Date to be delivered">
          <AppTextInput
            value={deliveryDate}
            changeAction={setDeliveryDate}
            style={inputStyle2}
            placeholder="Ex. MM/DD/YYYY"
            maxLength={10}
            checkValid = {validators.date}
            type="deliveryDate"
            keyboardType="default"
            errMsg="Please put in a date or N/A if not applicable"
          />
          <AppText style={[styles.inputFooterText, styles.spacer]}>
            (put N/A if not applicable)
          </AppText>
        </LabelWrapper>

        <LabelWrapper label="Description">
          <AppTextInput
            value={description}
            changeAction={setDescription}
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
            changeAction={setQuantity}
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
            // checkValid={matchers.presence}
            icon="location-pin"
            errMsg="Please input an address or landmark"
          />

          <View style={[styles.pickerWrapper, styles.spacer]}>
            <Picker
              selectedValue={pickupDistrict}
              onValueChange={(value) => { validators.picker(value, "selectPickup"); setPickupDistrict(value)}}
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
            // pattern={matchers.presence}
            errMsg="Please input an address or landmark"
            icon="location-pin"
          />
          <View style={[styles.pickerWrapper, styles.spacer]}>
            <Picker
              selectedValue={dropoffDistrict}
              onValueChange={(value) => { validators.picker(value, "selectDropoff"); setDropoffDistrict(value) }}
              mode="dropdown" // Android only
            >
              {LOCATIONS.map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
          </View>
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
          type={Object.values(isValid).some(v => v === false) ? "disabled" : "primary"}
          title={
            formType === "add"
              ? "Post Job"
              : formType === "edit"
              ? "Update"
              : "Repost"
          }
        />
        {formType === "edit" && (
          <AppButton
            onPress={deleteJob}
            style={[styles.center, { width: "100%", margin: 15 }]}
            title="Delete"
            type="secondary"
          />
        )}
      </ScrollView>
      <ModalAlert
        title="Permission Needed"
        message="Please allow access to photos in Settings!"
        buttons={[
          {
            type: "primary",
            label: "Close",
            onPress: () => setPermissionAlertVisible(false),
          },
        ]}
        visible={permissionAlertVisible}
      />
      <ModalAlert
        title="Add Photo"
        buttons={[
          {
            type: "primary",
            label: "Upload from library",
            onPress: openImageLibrary,
          },
          { type: "primary", label: "Take with camera", onPress: openCamera },
          {
            type: "secondary",
            label: "Cancel",
            onPress: () => setImagePickPromptVisible(false),
          },
        ]}
        visible={imagePickPromptVisible}
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
