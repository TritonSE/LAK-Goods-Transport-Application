import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { ConfirmationBox } from '../components/ConfirmationBox';
import { AppText, LabelWrapper, AppButton, ScreenHeader, AppTextInput } from '../components';
import { COLORS } from '../../constants';
import { JobOwnerView, postJob, updateJob, deleteJob, getUser } from '../api';
import { AddJobProps } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';
import { ImageUploadContext } from '../context/ImageUploadContext';
import { ImageUploadArea } from '../components/ImageUploadArea';

const PICKER_DEFAULT = '-- Select a district --';
const LOCATIONS = [
  PICKER_DEFAULT,
  'Bumthang',
  'Chhukha',
  'Dagana',
  'Gasa',
  'Haa',
  'Lhuentse',
  'Mongar',
  'Paro',
  'Pema Gatshel',
  'Punakha',
  'Samdrup Jongkhar',
  'Samtse',
  'Sarpang',
  'Thimphu',
  'Trashigang',
  'Trashi Yangtse',
  'Trongsa',
  'Tsirang',
  'Wangdue Phodrang',
  'Zhemgang',
];

type Validator = (text: string) => boolean;
type ValidatedField = {
  fieldName: string;
  fieldValue: string;
  validator: Validator;
};

const fieldNames = {
  jobTitle: 'jobTitle',
  phoneNumber: 'phoneNumber',
  deliveryDate: 'deliveryDate',
  pickupLocation: 'pickupLocation',
  dropoffLocation: 'dropoffLocation',
  imageSelect: 'imageSelect',
};

export function AddJob({ navigation, route }: AddJobProps) {
  const { dispatch, imageURIs, imageInfo, validateImageUpload } = useContext(ImageUploadContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user === null) {
      navigation.navigate('Login');
    }
  }, [auth, navigation]);

  const userId = auth.user ? auth.user.uid : '';

  const formType = route.params.formType;
  let screenHeader;
  if (formType === 'add') {
    screenHeader = 'Add Job';
  } else if (formType === 'edit') {
    screenHeader = 'Edit Job';
  } else {
    screenHeader = 'Repost Job';
  }

  const [isValid, setIsValid] = useState({
    [fieldNames.jobTitle]: true,
    [fieldNames.phoneNumber]: true,
    [fieldNames.deliveryDate]: true,
    [fieldNames.pickupLocation]: true,
    [fieldNames.dropoffLocation]: true,
    [fieldNames.imageSelect]: true,
  });
  const [jobTitle, setJobTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDistrict, setPickupDistrict] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [dropoffDistrict, setDropoffDistrict] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  //TODO: Abstract text validation to make more DRY
  const validatePresence: Validator = (text: string) => {
    const valid = text.length > 0;
    return valid;
  };

  const validatePhoneNumber: Validator = (text: string) => {
    const valid = text.length == 10;
    return valid;
  };

  const validateDate: Validator = (text: string) => {
    const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const valid = date_regex.test(text);
    return valid;
  };

  const validatePickerSelect: Validator = (value: string) => {
    const valid = value !== PICKER_DEFAULT;
    return valid;
  };

  const validators = {
    presence: validatePresence,
    phoneNumber: () => true,
    recieverPhoneNumber: () => true,
    date: validateDate,
    picker: validatePickerSelect,
    image: () => true,
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
      fieldValue: '',
      validator: validators.image,
    },
  ];

  const validateFields = () => {
    let isAllValid = true;
    const currentValid = { ...isValid };
    validatedFields.forEach((validatedField) => {
      const valid = validatedField.validator(validatedField.fieldValue);
      currentValid[validatedField.fieldName] = valid;
      if (!valid) {
        isAllValid = false;
      }
    });
    setIsValid(currentValid);
    return isAllValid;
  };

  useEffect(() => {
    getUser(userId, userId).then((user) => {
      if (user) {
        setClientName(user.firstName + ' ' + user.lastName);
        setPhoneNumber(user.phone || '');
        setPickupLocation(user.location.split(';')[0] || '');
        setPickupDistrict(user.location.split(';')[1] || PICKER_DEFAULT);
      }
    });
  }, [userId]);

  useEffect(() => {
    dispatch({ type: 'CLEAR_IMAGES' });
    if (formType !== 'add' && route.params.jobData) {
      const job: JobOwnerView = route.params.jobData;
      setJobTitle(job.title);
      setClientName(job.clientName);
      setPhoneNumber(job.phoneNumber);
      setReceiverName(job.receiverName);
      setReceiverPhoneNumber(job.receiverPhoneNumber);
      setDeliveryDate(job.deliveryDate);
      setDescription(job.description || '');
      setQuantity(job.packageQuantity?.toString() || '');
      setPrice(job.price?.toString() || '');
      setPickupLocation(job.pickupLocation);
      setPickupDistrict(job.pickupDistrict);
      setDropoffLocation(job.dropoffLocation);
      setDropoffDistrict(job.dropoffDistrict);
      dispatch({ type: 'SET_IMAGES', payload: job.imageIds });
    }
  }, [formType, route.params.jobData]);

  const createUpdateFromId = (jobId: string, newJob: object): JobOwnerView => {
    return {
      _id: jobId,
      ...newJob,
      applicants: route.params.jobData?.applicants || [],
      assignedDriverId: route.params.jobData?.assignedDriverId || '',
      startDate: route.params.jobData?.startDate || '',
      status: 'CREATED',
    } as JobOwnerView;
  };

  const createFormData = (
    images: Array<ImagePicker.ImagePickerAsset | null>,
    body: { [key: string]: any }
  ) => {
    const data = new FormData();
    if (images !== null) {
      images.filter((value) => value !== null).map((image) => {
        if (image !== null) {
          console.log("here")
          const uriArray = image.uri.split('.');
          const fileExtension = uriArray[uriArray.length - 1]; // e.g.: "jpg"
          const fileTypeExtended = `${image.type}/${fileExtension}`; // e.g.: "image/jpg"
          data.append('images', {
            name: 'demo.jpg',
            uri: image.uri,
            type: fileTypeExtended,
          } as unknown as Blob);
        }
      });
    }

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };

  const convertURIsToIds = (uris) => {
    uris = uris.filter((value) => value !== '').map((uri) => uri.split("/").slice(-1)[0])
    console.log(uris[0].split(".").length)
    uris = uris.filter((value) => value.split(".").length < 2).map(uri => uri)
    console.log(uris)
    return uris
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
      imageIds: convertURIsToIds(imageURIs),
    };
    console.log("imageInfo")
    console.log(imageInfo)
    const formedJob: FormData = createFormData(imageInfo, newJob);
    console.log(newJob.imageIds)
    console.log(formedJob._parts)
    dispatch({ type: 'CLEAR_IMAGES' });
    if (formType === 'add' || formType == 'repost') {
      setLoading(true);
      postJob(userId, formedJob).then((response) => {
        setLoading(false);
        console.log(response);
        if (response == null) {
          return;
        }
        const { jobId } = response;
        const updatedJob: JobOwnerView = createUpdateFromId(jobId, newJob);
        route.params.setJobData((prevJobs) => [...prevJobs, updatedJob]);
        navigation.navigate('JobLandingScreen');
      });
    } else if (formType === 'edit') {
      // const body = {
      //   //TODO pickup and dropoff district
      //   ...newJob,
      // };
      //TODO
      if (!route.params.jobData) {
        return;
      }
      console.log("here")
      updateJob(userId, route.params.jobData._id, formedJob).then((response) => {
        if (response === null) {
          return;
        }
        console.log(response);
        const { jobId } = response;
        const updatedJob: JobOwnerView = createUpdateFromId(jobId, newJob);
        route.params.setJobData((prevJobs) =>
          prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
        );
        navigation.navigate('JobLandingScreen');
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

    deleteJob(userId, route.params.jobData._id).then((response) => {
      if (response === null) {
        return;
      }
      const { jobId } = response;

      route.params.setJobData((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      navigation.navigate('JobLandingScreen');
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
            style={isValid[fieldNames.jobTitle] ? [inputStyle2, styles.spacer] : [inputStyleErr]}
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
            style={isValid['phoneNumber'] ? [inputStyle2, styles.spacer] : inputStyleErr}
            placeholder="Ex. 17113456"
            icon="phone-in-talk"
            keyboardType="numeric"
            type="phoneNumber"
            errMsg="Please insert a valid phone number"
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
            style={isValid['deliveryDate'] ? inputStyle2 : inputStyleErr}
            placeholder="Ex. MM/DD/YYYY"
            maxLength={10}
            type="deliveryDate"
            keyboardType="default"
            errMsg="Please put in a valid date"
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
              'Tell us about your package. Add any extra detail about its size. \n\n Ex. Package will fill up 1/3 of a truck.'
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
            style={isValid[fieldNames.pickupLocation] ? inputStyleFull : inputStyleErrFull}
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
            style={isValid[fieldNames.dropoffLocation] ? inputStyleFull : inputStyleErrFull}
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

        <ImageUploadArea />
        {isValid[fieldNames.imageSelect] ? (
          <></>
        ) : (
          <View>
            <AppText style={styles.errText}>
              At least one photo of the package is required. Tap on a photo to remove it.
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
          style={[styles.center, { width: '100%' }]}
          type={loading ? 'disabled' : 'primary'}
          title={formType === 'add' ? 'Post Job' : formType === 'edit' ? 'Update' : 'Repost'}
        />
        {formType === 'edit' && (
          <AppButton
            onPress={() => setConfirmationVisible(true)}
            style={[styles.center, { width: '100%', margin: 15 }]}
            title="Delete"
            type="secondary"
          />
        )}
      </ScrollView>
      {confirmationVisible ? (
        <ConfirmationBox
          checkMarkAppear={false}
          rejectVisible={true}
          title={'Delete job post?'}
          body={'This will be removed from the job board permanently.'}
          acceptName={'Delete'}
          rejectName={'Cancel'}
          onAccept={handleDeleteJob}
          onReject={() => setConfirmationVisible(false)}
        />
      ) : null}
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
    paddingBottom: 20, // this is adding margin below null errMsg as well
  },
  instructionText: {
    fontSize: 12,
    paddingBottom: 20, // this is adding margin below null instructionText as well
  },

  multilineInput: {
    borderWidth: 1,
    height: 75,
    width: '80%',
    borderRadius: 4,
    paddingHorizontal: 5,
    borderColor: COLORS.mediumGrey,
  },

  container: {
    padding: 32,
    paddingBottom: 140,
  },

  photos: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  photoInstructions: {
    fontSize: 12,
  },

  center: {
    alignSelf: 'center',
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
    width: '40%',
  },
]);

const inputStyle2 = StyleSheet.flatten([
  styles.input,
  {
    width: '60%',
  },
]);

const inputStyleFull = StyleSheet.flatten([
  styles.input,
  {
    width: '100%',
  },
]);

const inputStyleErr = StyleSheet.flatten([
  styles.errInput,
  {
    width: '60%',
  },
]);

const inputStyleErrFull = StyleSheet.flatten([
  styles.errInput,
  {
    width: '100%',
  },
]);
