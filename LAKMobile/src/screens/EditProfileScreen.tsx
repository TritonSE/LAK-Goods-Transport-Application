import { Picker } from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, FlatList, ScrollView, TextInput} from 'react-native';
import { COLORS } from '../../constants';

import { getCurrentUser, getUser, updateUser, UserData, VehicleData } from '../api';
import { imageIdToSource } from '../api/consumer';
import {
    AppButton,
    AppText,
    ScreenHeader,
    IconButtonWrapper,
    LabelWrapper,
    ImagePickerButton
} from '../components';
import {PublicProfilePicDefault, EditIcon} from "../icons";
import { EditProfileScreenProps } from '../types/navigation';

export function EditProfileScreen({navigation, route}: EditProfileScreenProps) {
    const [profileData, setProfileData] = useState<UserData | null>(null);
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [district, setDistrict] = useState("");
    const [driverLicenseId, setDriverLicenseId] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleMake, setVehicleMake] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");

    const PICKER_LOCATION_DEFAULT = "-- Select a district --";
    const PICKER_TYPE_DEFAULT = "-- Pick a type --";
    const LOCATIONS = [
        PICKER_LOCATION_DEFAULT,
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
        setLocation(profileData?.location.split(";")[0] || "");
        setDistrict(profileData?.location.split(";")[1] || "");
        setDriverLicenseId(profileData?.driverLicenseId || "");
        if (profileData?.vehicleData) {
            setVehicleType(profileData?.vehicleData.vehicleType || "");
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
            location: location.trim() + ";" + district.trim(),
            driverLicenseId: driverLicenseId,
            vehicleData: updatedVehicleData
        }

        updateUser(route.params.userId, updatedUser).then(response => {
            if (response == null) {
                return;
            }
            setProfileData(updatedUser);
            navigation.navigate("ProfileScreen");
            
        })
    }
    
    const isUserTheViewer = getCurrentUser() === route.params.userId;

    return (
        <View style={styles.mainContainer}>
            <ScreenHeader showArrow={true} children={"Edit Profile"}/>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.nameContainer}>
                    <PublicProfilePicDefault/>
                </View>

                <LabelWrapper label='User Name'>
                    <TextInput
                    style={styles.input}
                    keyboardType="default"
                    defaultValue={profileData?.firstName + " " + profileData?.lastName}
                    value={userName}
                    />
                </LabelWrapper>
                
                <View style={[styles.sectionTitleContainer]}>
                    <AppText style={styles.sectionTitle}>Contact Information</AppText>
                </View>

                <LabelWrapper label='Mobile Number'>
                    <TextInput
                    style={bigInputStyle}
                    keyboardType="default"
                    defaultValue={profileData?.phone}
                    value={phoneNumber}
                    />
                </LabelWrapper>

                <LabelWrapper label='Location'>
                    <TextInput
                    style={bigInputStyle}
                    keyboardType="default"
                    defaultValue={profileData?.location}
                    value={location}
                    />
                </LabelWrapper>
                <View style={[styles.pickerWrapper, styles.spacer]}>
                    <Picker
                    mode="dropdown" // Android only
                    
                    >
                    {LOCATIONS.map((location, index) => (
                        <Picker.Item key={index} label={location} value={district} />
                    ))}
                    </Picker>
                </View>
                {!profileData?.vehicleData && 
                    <View>
                        <View style={[styles.sectionTitleContainer]}>
                            <AppText style={styles.sectionTitle}>Vehicle Information</AppText>
                        </View>

                        <LabelWrapper label='Type'>
                            <View style={[styles.pickerWrapper, styles.spacer, {width: '45%'}]}>
                                <Picker
                                mode="dropdown" // Android only
                                >
                                {CARS.map((type, index) => (
                                    <Picker.Item key={index} label={type} value={vehicleModel} />
                                ))}
                                </Picker>
                            </View>
                        </LabelWrapper>
                        <LabelWrapper label='Model'>
                            <TextInput
                            style={smallInputStyle}
                            keyboardType="default"
                            //defaultValue = {profileData?.vehicleData.vehicleModel}
                            value={vehicleModel}
                            />
                        </LabelWrapper>

                        <LabelWrapper label='Make'>
                            <TextInput
                            style={smallInputStyle}
                            keyboardType="default"
                            //defaultValue = {profileData?.vehicleData.vehicleMake}
                            value={vehicleMake}
                            />
                        </LabelWrapper>

                        <LabelWrapper label='Color'>
                            <TextInput
                            style={smallInputStyle}
                            keyboardType="default"
                            //defaultValue = {profileData?.vehicleData.vehicleColor}
                            value={vehicleColor}
                            />
                        </LabelWrapper>
                        <View style={styles.photos}>
                            <ImagePickerButton onSelect={() => console.log("Pressed 1")}/>
                            <ImagePickerButton onSelect={() => console.log("Pressed 2")}/>
                            <ImagePickerButton onSelect={() => console.log("Pressed 3")}/>
                        </View>
                    </View>
                    
                }
            </ScrollView>
            <View style={styles.footer}>
                { 
                    isUserTheViewer && 
                    <View style={styles.center}>
                        <AppButton
                            type='primary'
                            title='Save Changes'
                            onPress={submitChanges}
                            style={styles.footerButton}
                        />
                    </View>
                }
                {
                    !isUserTheViewer && 
                    <AppButton title={"Report"} size={"small"} type={"tertiary"} style={styles.reportButton}></AppButton>
                }
            </View>
            
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
        paddingHorizontal: 20
    },

    profileContainer: {
        paddingTop: 10,
        paddingLeft: 32,
    },

    nameContainer: {
        flexDirection:'row',
        alignItems:'center',
        paddingVertical: 10,
        marginVertical: 10,
    },

    nameText: {
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 28,
    },

    fieldContainer: {
        borderBottomColor: "#C4C4C4",
        borderBottomWidth: 1,
        paddingLeft: 32,
        marginLeft: -32,
        height: 36,
    },

    fieldText: {
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 33,
    },

    sectionTitle: {
        fontSize: 18,
        position: "absolute",
        bottom: 0,
        left: 32,
        color: "#8B8B8B",
        fontWeight: "700",
    },

    sectionTitleContainer: {
        borderBottomColor: "#C4C4C4",
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingLeft: 32,
        marginLeft: -32,
        height: 36,
        marginTop: 20
    },

    reportButton: {
        marginLeft: 30,
        marginBottom: 30
    },

    vehicleImage: {
        width: 58,
        height: 55,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 20,
    },

    editButton: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginHorizontal: 25
    },

    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    
    footerButton: {
        marginBottom: 15
    },

    footer: {
        marginTop: 10,
        bottom: 0,
    },
    input: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: COLORS.mediumGrey,
        padding: 10,
        height: 40,
        marginBottom: 14,
        fontSize: 16,
    },
    picker: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: COLORS.mediumGrey,
        height: 40,
        alignContent: 'center',
        marginBottom: 14,
    },
    pickerWrapper: {
        padding: 0,
        margin: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.mediumGrey,
        marginBottom: 14,
    },      
    spacer: {
        marginBottom: 20,
    },
    photos: {
        flexDirection: "row",
        alignSelf: "center",
    },
})

const bigInputStyle = StyleSheet.flatten([
    styles.input, 
    {
      width: '100%',
    }
  ]);
  
const smallInputStyle = StyleSheet.flatten([
    styles.input, 
    {
      width: '45%'
    }
  ])