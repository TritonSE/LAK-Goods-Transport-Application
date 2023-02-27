import React, {
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import type { ImagePickerErrorResult } from "expo-image-picker";
import { ConfirmationBox } from '../components/ConfirmationBox';
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
import {
  getJobById,
  JobData,
  JobOwnerView,
  postJob,
  updateJob,
  deleteJob,
} from "../api";
import { AddJobProps } from "../types/navigation";
import { AuthContext } from "../auth/context";

const PICKER_DEFAULT = "-- Select a district --";
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

type Validator = (text: string) => boolean;
type ImagesReducerState = string[];
type ValidatedField = {
  fieldName: string;
  fieldValue: string;
  validator: Validator;
};

const fieldNames = {
  jobTitle: "jobTitle",
  phoneNumber: "phoneNumber",
  deliveryDate: "deliveryDate",
  pickupLocation: "pickupLocation",
  dropoffLocation: "dropoffLocation",
  imageSelect: "imageSelect",
};

export function AddJob({ navigation, route }: AddJobProps) {  
  let formType = route.params.formType;
  let screenHeader;
  if (formType === "add") {
    screenHeader = "Add Job"
  } else if (formType === "edit") {
    screenHeader = "Edit Job"
  } else {
    screenHeader = "Repost Job"
  }

  const [isValid, setIsValid] = useState({
    [fieldNames.jobTitle]: true,
    [fieldNames.phoneNumber]: true,
    [fieldNames.deliveryDate]: true,
    [fieldNames.pickupLocation]: true,
    [fieldNames.dropoffLocation]: true,
    [fieldNames.imageSelect]: true,
  });
  interface ImagesReducerSetAction {
    type: "SET_IMAGES";
    payload: string[];
  }

  type ImagesReducerAction =
    | ImagesReducerAddAction
    | ImagesReducerRemoveAction
    | ImagesReducerSetAction;

  type ImagesReducer = Reducer<ImagesReducerState, ImagesReducerAction>;


  const [imageInfo, setImageInfo] = useState<Array<ImagePicker.ImagePickerAsset | null>>([null, null, null])

  const reducer: ImagesReducer = (state, action): ImagesReducerState => {
    let newState = state.slice();
    switch (action.type) {
      case "ADD_IMAGE":
        const index = newState.findIndex((value) => value === "");
        newState[index] = action.payload.uri;
        if (imageInfo) {
          let newImageInfo = imageInfo.map((im, i) => {
            return (i === index ? action.payload : im)
          })
          setImageInfo(newImageInfo)
        }
        setIsValid({ ...isValid, ["imageSelect"]: true });
        break;
      case "REMOVE_IMAGE":
        newState[action.payload] = "";
        newState = newState.filter((value) => value !== "");
        while (newState.length < 3) {
          newState.push("");
        }
        let valid = newState.some((v) => v !== "");
        setIsValid({ ...isValid, ["imageSelect"]: valid });
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
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const auth = useContext(AuthContext);

  if (auth.user === null) {
    navigation.navigate('Login');
  }

  const userId = auth.user ? auth.user.uid : '';

  interface ImagesReducerAddAction {
    type: "ADD_IMAGE";
    payload: ImagePicker.ImagePickerAsset;
  }

  interface ImagesReducerRemoveAction {
    type: "REMOVE_IMAGE";
    payload: number;
  }

  //TODO: Abstract text validation to make more DRY
  const validatePresence: Validator = (text: string) => {
    let valid = text.length > 0;
    return valid;
  };

  const validatePhoneNumber: Validator = (text: string) => {
    let valid =
      (text.startsWith("1") || text.startsWith("7")) && text.length == 8;
    return valid;
  };

  const validateDate: Validator = (text: string) => {
    let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    let valid = date_regex.test(text);
    return valid;
  };

  const validatePickerSelect: Validator = (value: string) => {
    let valid = value !== PICKER_DEFAULT;
    return valid;
  };

  const validateImageUpload: Validator = () => {
    return imageURIs.findIndex((value) => value !== "") !== -1;
  };

  const validators = {
    presence: validatePresence,
    phoneNumber: validatePhoneNumber,
    recieverPhoneNumber: validatePhoneNumber,
    date: validateDate,
    picker: validatePickerSelect,
    image: validateImageUpload
  };

  const validatedFields: Array<ValidatedField> = [
    {
      fieldName: fieldNames.jobTitle,
      fieldValue: jobTitle,
      validator: validators.presence,
    },
    {
      fieldName: fieldNames.phoneNumber,
      fieldValue: phoneNumber,
      validator: validators.phoneNumber,
    },
    {
      fieldName: fieldNames.deliveryDate,
      fieldValue: deliveryDate,
      validator: validators.date,
    },
    {
      fieldName: fieldNames.pickupLocation,
      fieldValue: pickupLocation,
      validator: validators.presence,
    },
    {
      fieldName: fieldNames.dropoffLocation,
      fieldValue: dropoffLocation,
      validator: validators.presence,
    },
    {
      fieldName: fieldNames.imageSelect,
      fieldValue: "",
      validator: validators.image,
    },
  ];

  const validateFields = () => {
    let isAllValid: boolean = true;
    const currentValid = { ...isValid };
    validatedFields.forEach((validatedField) => {
      let valid = validatedField.validator(validatedField.fieldValue);
      currentValid[validatedField.fieldName] = valid;
      if (!valid) {
        isAllValid = false;
      }
    });
    setIsValid(currentValid);
    return isAllValid;
  };

  useEffect(() => {
    if (formType !== "add" && route.params.jobData) {
      const job: JobOwnerView = route.params.jobData;
      setJobTitle(job.title);
      setClientName(job.clientName);
      setPhoneNumber(job.phoneNumber);
      setReceiverName(job.receiverName);
      setReceiverPhoneNumber(job.receiverPhoneNumber);
      setDeliveryDate(job.deliveryDate);
      setDescription(job.description || "");
      setQuantity(job.packageQuantity?.toString() || "");
      setPrice(job.price?.toString() || "");
      setPickupLocation(job.pickupLocation);
      setPickupDistrict(job.pickupDistrict);
      setDropoffLocation(job.dropoffLocation);
      setDropoffDistrict(job.dropoffDistrict);
      dispatch({ type: "SET_IMAGES", payload: job.imageIds });
    }
  }, [formType, route.params.jobData]);

  const openImageLibrary = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setPermissionAlertVisible(true);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!pickerResult.canceled) {
      dispatch({ type: "ADD_IMAGE", payload: pickerResult.assets[0] });
    }
    setImagePickPromptVisible(false);
  }, []);

  const openCamera = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      setPermissionAlertVisible(true)
      return;
    }
    const cameraResult = await ImagePicker.launchCameraAsync();
    if (!cameraResult.canceled) {
      dispatch({ type: "ADD_IMAGE", payload: cameraResult.assets[0] });
    }
    setImagePickPromptVisible(false);
  }, []);

  const handleTapImage = useCallback(
    (index: any) => {
      if (imageURIs[index] === "") {
        setImagePickPromptVisible(true);
      } else {
        dispatch({ type: "REMOVE_IMAGE", payload: index });
      }
    },
    [imageURIs]
  );

  const createUpdateFromId = (
    jobId: string,
    newJob: object
  ): JobOwnerView => {
    return ({
      _id: jobId,
      ...newJob,
      applicants: route.params.jobData?.applicants || [],
      assignedDriverId: route.params.jobData?.assignedDriverId || "",
      startDate: route.params.jobData?.startDate || "",
      status: "CREATED",
    }) as JobOwnerView
  }

  const createFormData = (images: Array<ImagePicker.ImagePickerAsset | null>, body: { [key: string]: any }) => {
    const data = new FormData();
    if (images !== null && images[0] !== null) {
      images.map((image) => {
        if (image !== null) {
          const uriArray = image.uri.split(".");
          const fileExtension = uriArray[uriArray.length - 1];  // e.g.: "jpg"
          const fileTypeExtended = `${image.type}/${fileExtension}`; // e.g.: "image/jpg"
          data.append("images", {
            name: "demo.jpg",
            uri: image.uri,
            type: fileTypeExtended,
          } as unknown as Blob)
        }
      })
    }

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  }

  const submitJob = async () => {
    // TODO: when submitting, remember to filter out empty strings from imageURIs
    if (!validateFields()) {
      return;
    }
    const newJob = {
      title: jobTitle.trim(),
      clientName: clientName.trim(),
      phoneNumber: phoneNumber,
      receiverName: receiverName.trim(),
      receiverPhoneNumber: receiverPhoneNumber.trim(),
      deliveryDate: deliveryDate,
      description: description.trim(),
      packageQuantity: parseInt(quantity),
      price: parseInt(price),
      pickupLocation: pickupLocation.trim(),
      pickupDistrict: pickupDistrict.trim(),
      dropoffLocation: dropoffLocation.trim(),
      dropoffDistrict: dropoffDistrict.trim(),
      imageIds: imageURIs.filter((value) => value !== ""),
    };
    const formedJob: FormData = createFormData(imageInfo, newJob);
    if (formType === "add" || formType == "repost") {
      postJob(userId, formedJob).then(response => {
        console.log(response);
        if (response == null) {
          return;
        }
        const { jobId } = response;
        const updatedJob: JobOwnerView = createUpdateFromId(jobId, newJob)
        route.params.setJobData(prevJobs => [...prevJobs, updatedJob])
        navigation.navigate("JobLandingScreen");
      });
    } else if (formType === "edit") {
      const body = {
        //TODO pickup and dropoff district
        ...newJob,
      };
      //TODO
      if (!route.params.jobData) {
        return;
      }

      updateJob(userId, route.params.jobData._id, formedJob).then(response => {
        if (response === null) {
          return;
        }
        console.log(response);
        const { jobId } = response;
        const updatedJob: JobOwnerView = createUpdateFromId(jobId, newJob)
        route.params.setJobData(prevJobs => prevJobs.map(job => job._id === updatedJob._id ? updatedJob : job))
        navigation.navigate("JobLandingScreen");
      });
    } else {
      //TODO
    }
  };

  const handleDeleteJob = () => {
    // TODO
    if (!route.params.jobData) {
      return;
    }
    
    
    deleteJob(userId, route.params.jobData._id).then(response => {
      if (response === null) {
        return;
      }
      const { jobId } = response;

      route.params.setJobData(prevJobs => prevJobs.filter(job => job._id !== jobId))
      navigation.navigate("JobLandingScreen");
    });
    
    

  };

  return (
    <View>
      <View>
        <ScreenHeader showArrow>{screenHeader}</ScreenHeader>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <LabelWrapper label="Job Title">
          <AppTextInput
            value={jobTitle}
            changeAction={setJobTitle}
            style={
              isValid[fieldNames.jobTitle]
                ? [inputStyle2, styles.spacer]
                : [inputStyleErr2]
            }
            placeholder="Ex. Box of apples"
            isValid={isValid[fieldNames.jobTitle]}
            type="jobTitle"
            errMsg="Please write a title for your listing."
            maxLength={100}
            keyboardType="default"
          />
        </LabelWrapper>

        <LabelWrapper label="Your Name">
          <AppTextInput
            value={clientName}
            changeAction={setClientName}
            style={[inputStyle2, styles.spacer]}
            placeholder="Ex. Gabby Gibson"
            maxLength={100}
            keyboardType="default"
          />
        </LabelWrapper>

        <LabelWrapper label="Your Phone number">
          <AppTextInput
            value={phoneNumber}
            changeAction={setPhoneNumber}
            isValid={isValid[fieldNames.phoneNumber]}
            style={
              isValid["phoneNumber"]
                ? [inputStyle2, styles.spacer]
                : inputStyleErr2
            }
            placeholder="Ex. 17113456"
            icon="phone-in-talk"
            keyboardType="numeric"
            type="phoneNumber"
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
            type="recieverPhoneNumber"
          />
        </LabelWrapper>

        <LabelWrapper label="Date to be delivered">
          <AppTextInput
            value={deliveryDate}
            changeAction={setDeliveryDate}
            isValid={isValid[fieldNames.deliveryDate]}
            style={isValid["deliveryDate"] ? inputStyle2 : inputStyleErr2}
            placeholder="Ex. MM/DD/YYYY"
            maxLength={10}
            type="deliveryDate"
            keyboardType="default"
            errMsg="Please put in a date or N/A if not applicable"
            instructionText="put N/A if not applicable"
          />
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

        <LabelWrapper label="Package Quantity">
          <AppTextInput
            value={quantity}
            changeAction={setQuantity}
            style={[inputStyle1, styles.spacer]}
            placeholder="Ex. 6"
            keyboardType="numeric"
            maxLength={10}
          />
        </LabelWrapper>

        <LabelWrapper label="Estimated price of delivery">
          <AppTextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Ex. $$"
            maxLength={20}
            keyboardType="numeric"
            style={[inputStyle1, styles.spacer]}
          />
        </LabelWrapper>

        <LabelWrapper label="Pick-up location">
          <AppTextInput
            value={pickupLocation}
            onChangeText={setPickupLocation}
            isValid={isValid[fieldNames.pickupLocation]}
            style={
              isValid[fieldNames.pickupLocation]
                ? inputStyleFull
                : inputStyleErrFull
            }
            placeholder="Ex. Insert address or landmark"
            maxLength={100}
            icon="location-pin"
            errMsg="Please input an address or landmark"
          />

          <View style={[styles.pickerWrapper, styles.spacer]}>
            <Picker
              selectedValue={pickupDistrict}
              onValueChange={(value) => {
                setPickupDistrict(value);
              }}
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
            style={
              isValid[fieldNames.dropoffLocation]
                ? inputStyleFull
                : inputStyleErrFull
            }
            isValid={isValid[fieldNames.dropoffLocation]}
            placeholder="Ex. Insert address or landmark"
            maxLength={100}
            errMsg="Please input an address or landmark"
            icon="location-pin"
          />

          <View style={[styles.pickerWrapper, styles.spacer]}>
            <Picker
              selectedValue={dropoffDistrict}
              onValueChange={(value) => {
                setDropoffDistrict(value);
              }}
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
        {isValid[fieldNames.imageSelect] ? (
          <>
          </>
        ): (
          <View>
          <AppText style={styles.errText}>
            At least one photo of the package is required. Tap on a photo to
            remove it.
          </AppText>
          </View>
          
        )}
          <View>
            <AppText style={styles.instructionText}>
            Note: The first photo will be the thumbnail of the job listing.
            </AppText>
          </View>

        <AppButton
          onPress={submitJob}
          style={[styles.center, { width: "100%" }]}
          type="primary"
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
            onPress={() => setConfirmationVisible(true)}
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
      { confirmationVisible ? (<ConfirmationBox
                checkMarkAppear = {false}
                rejectVisible = {true}
                title={"Delete job post?"}
                body={"This will be removed from the job board permanently."}
                acceptName={"Delete"}
                rejectName={"Cancel"}
                onAccept={() => handleDeleteJob()}
                onReject={() => setConfirmationVisible(false)} />) : null }
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

  errInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.red,
    height: 40,
  },
  errText: {
    color: COLORS.red,
    fontSize: 12,
    paddingBottom: 20  // this is adding margin below null errMsg as well
  },
  instructionText: {
    fontSize: 12,
    paddingBottom: 20  // this is adding margin below null instructionText as well
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
const inputStyleErr1 = StyleSheet.flatten([
  styles.errInput,
  {
    width: "40%",
  },
]);

const inputStyleErr2 = StyleSheet.flatten([
  styles.errInput,
  {
    width: "60%",
  },
]);

const inputStyleErrFull = StyleSheet.flatten([
  styles.errInput,
  {
    width: "100%",
  },
]);
