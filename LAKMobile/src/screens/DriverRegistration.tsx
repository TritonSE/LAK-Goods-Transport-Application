import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ScrollView } from 'react-native';
import { DriverRegistrationProps, JobLandingScreenProps } from '../types/navigation';
import { COLORS } from '../../constants';
import {
    AppButton,
    AppText,
    ScreenHeader,
    IconButtonWrapper,
    LabelWrapper,
    ImagePickerButton
} from '../components';
import { getCurrentUser, getUser, updateUser, UserData, VehicleData } from '../api';
import { JobLandingScreen } from './JobLandingScreen';

export function DriverRegistration({navigation, route}: DriverRegistrationProps) {
    const [profileData, setProfileData] = useState<UserData | null>(null);
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [driverLicenseId, setDriverLicenseId] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleMake, setVehicleMake] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const PICKER_TYPE_DEFAULT = "-- Pick type --";

    const uploadPhoto = () => {
        console.log("temp");
    }

    const CARS = [
        PICKER_TYPE_DEFAULT,
        "Taxi",
        "Private",
        "Truck",
    ];
    
    useEffect(() => {
        getUser(route.params.userId)
        .then(user => {
            setProfileData(user)
        })
    }, [route.params.userId])

    useEffect(() => {
        setUserName(profileData?.firstName + " " + profileData?.lastName);
        setPhoneNumber(profileData?.phone || "");
        setLocation(profileData?.location || "");
        setDriverLicenseId(profileData?.driverLicenseId || "");
        if (profileData?.vehicleData) {
            setVehicleType(profileData?.vehicleData.vehicleType || PICKER_TYPE_DEFAULT);
            setVehicleModel(profileData?.vehicleData.vehicleModel || "");
            setVehicleMake(profileData?.vehicleData.vehicleMake || "");
            setVehicleColor(profileData?.vehicleData.vehicleColor || "");
        }
    }, [profileData])

    const submitChanges = async () => {
        const updatedVehicleData : VehicleData = {
            vehicleType: vehicleType.trim(),
            vehicleModel: vehicleModel.trim(),
            vehicleMake: vehicleMake.trim(),
            vehicleColor: vehicleColor.trim(),
            imageIds: [] //Change this once the image uploading is fixed
        }

        const updatedUser : UserData = {
            phone: phoneNumber,
            firstName: userName.split(" ")[0].trim(),
            lastName: userName.split(" ")[1].trim(),
            location: location,
        }
        if (driverLicenseId != "") {
            updatedUser.driverLicenseId = driverLicenseId
            updatedUser.vehicleData = updatedVehicleData
        }

        console.log(updatedUser)
        updateUser(route.params.userId, updatedUser).then(response => {
            if (response == null) {
                return;
            }
            setProfileData(updatedUser);
            navigation.navigate('JobLandingScreen');
        })
    }

    return (
        <View style={styles.mainContainer}>
            <ScreenHeader showArrow={true} children={"Driver Registration"}/>
            <ScrollView style={styles.scrollContainer}>
                <View style={[styles.sectionTitleContainer]}>
                    <AppText style={styles.sectionTitle}>Personal Information</AppText>
                </View>

                <LabelWrapper label='Name (First Last)'>
                    <TextInput
                    style={styles.input}
                    keyboardType="default"
                    defaultValue={profileData?.firstName + " " + profileData?.lastName}
                    onChangeText={(value) => setUserName(value)}
                    />
                </LabelWrapper>

                <LabelWrapper label='Mobile Number'>
                    <TextInput
                    style={styles.input}
                    keyboardType="default"
                    defaultValue={profileData?.phone}
                    onChangeText={(value) => setPhoneNumber(value)}
                    />
                </LabelWrapper>

                <LabelWrapper label="Driver's License ID">
                    <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={(value) => setDriverLicenseId(value)}
                    />
                </LabelWrapper>
                
                <View style={[styles.sectionTitleContainer]}>
                    <AppText style={styles.sectionTitle}>Vehicle Information</AppText>
                </View>

                <LabelWrapper label='Type'>
                    <View style={[styles.pickerWrapper]}>
                        <Picker
                        mode="dropdown" // Android only
                        onValueChange={(itemValue : string) => setVehicleType(itemValue)}
                        selectedValue={vehicleType}
                        >
                        {CARS.map((type, index) => (
                            <Picker.Item key={index} label={type} value={type} />
                        ))}
                        </Picker>
                    </View>
                </LabelWrapper>
                
                <LabelWrapper label='Model'>
                    <TextInput
                    style={smallInputStyle}
                    keyboardType="default"
                    defaultValue={profileData?.vehicleData?.vehicleModel}
                    onChangeText={(value) => setUserName(value)}
                    />
                </LabelWrapper>

                <LabelWrapper label='Make'>
                    <TextInput
                    style={smallInputStyle}
                    keyboardType="default"
                    defaultValue = 'Ex. Honda'
                    value={vehicleMake}
                    onChangeText={(value) => setVehicleMake(value)}
                    />
                </LabelWrapper>

                <LabelWrapper label='Color'>
                    <TextInput
                    style={smallInputStyle}
                    keyboardType="default"
                    defaultValue={profileData?.vehicleData?.vehicleColor}
                    onChangeText={(value) => setVehicleColor(value)}
                    />
                </LabelWrapper>

                <LabelWrapper label='Photo of Vehicle'>
                    <View style={styles.photos}>
                        <ImagePickerButton onSelect={() => console.log("Pressed 1")}/>
                        <ImagePickerButton onSelect={() => console.log("Pressed 2")}/>
                        <ImagePickerButton onSelect={() => console.log("Pressed 3")}/>
                    </View>
                </LabelWrapper>

                <View style={styles.center}>
                    <AppButton
                        style={styles.registerButton}
                        type='primary'
                        title='Register'
                        onPress={submitChanges}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        maxHeight: "100%",
        flex: 1
    },

    scrollContainer: {
        overflow: 'hidden',
        paddingHorizontal: 20,
    },

    sectionTitle: {
        fontSize: 18,
        position: "absolute",
        bottom: 0,
        left: 32
    },

    sectionTitleContainer: {
        borderBottomColor: "#C4C4C4",
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 5,
        paddingLeft: 32,
        marginLeft: -32,
        height: 36,
    },

    center: {
        justifyContent: "center",
        alignItems: "center",
    },

    photos: {
        flexDirection: "row",
        alignSelf: "center",
    },
    
    uploadPhotoButton: {
        width: '60%',
        borderRadius: 5,
        color: COLORS.mediumGrey,
        borderColor: COLORS.mediumGrey,
        marginBottom: 10,
        elevation: 2.5,
    },

    registerButton: {
        marginTop: 20,
        marginBottom: 20
    },

    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.mediumGrey,
        padding: 10,
        height: 40,
        marginBottom: 14,
    },
    
    pickerWrapper: {
        padding: 0,
        margin: 0,
        marginBottom: 20,
        width: '45%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.mediumGrey,
    },

    title: {
        fontSize: 16,
        color: '#8B8B8B',
    },
});
  
const smallInputStyle = StyleSheet.flatten([
    styles.input, 
    {
      width: '45%'
    },
])