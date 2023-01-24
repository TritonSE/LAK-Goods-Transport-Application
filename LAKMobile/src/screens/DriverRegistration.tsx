import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, TextInput, View, ScrollView } from 'react-native';
import { DriverRegistrationProps, JobLandingScreenProps } from '../types/navigation';
import { COLORS } from '../../constants';

import {
    AppButton,
    AppText,
    ScreenHeader,
    IconButtonWrapper,
    LabelWrapper
} from '../components';

export function DriverRegistration({route}: JobLandingScreenProps) {
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
                    placeholder=''
                    />
                </LabelWrapper>

                <LabelWrapper label='Mobile Number'>
                    <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder=''
                    />
                </LabelWrapper>

                <LabelWrapper label="Driver's License ID">
                    <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder=''
                    />
                </LabelWrapper>
                
                <View style={[styles.sectionTitleContainer]}>
                    <AppText style={styles.sectionTitle}>Vehicle Information</AppText>
                </View>

                <LabelWrapper label='Type'>
                    <View style={[styles.pickerWrapper, {width: '45%'}]}>
                        <Picker
                        mode="dropdown" // Android only
                        >
                        {CARS.map((location, index) => (
                            <Picker.Item key={index} label={location} value={location} />
                        ))}
                        </Picker>
                    </View>
                </LabelWrapper>
                <LabelWrapper label='Model'>
                    <TextInput
                    style={smallInputStyle}
                    keyboardType="default"
                    defaultValue = 'Ex. Civic'
                    />
                </LabelWrapper>

                <LabelWrapper label='Make'>
                    <TextInput
                    style={smallInputStyle}
                    keyboardType="default"
                    defaultValue = 'Ex. Honda'
                    />
                </LabelWrapper>

                <LabelWrapper label='Color'>
                    <TextInput
                    style={smallInputStyle}
                    keyboardType="default"
                    />
                </LabelWrapper>

                <View style={styles.center}>
                    <LabelWrapper label='Photo of Vehicle'>
                        <AppButton
                            title = "Upload a Photo"
                            onPress={uploadPhoto}
                        />
                    </LabelWrapper>
                </View>             

                <View style={styles.center}>
                    <AppButton
                        type='primary'
                        title='Register'
                        onPress={() => console.log('Driver information submitted')}
                        style={styles.footerButton}
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
        color: 'black', // check this line here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        marginTop: 10,
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
    },
    
    pickerWrapper: {
        padding: 0,
        margin: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.mediumGrey,
    },

    spacer: {
        marginBottom: 20,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'Arial',
        padding: 10,
    },

    inputBox: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 2,
    },

    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        margin: 10
    },

    uploadPhotoButton: {
        margin: 10,
        color: 'white'
    },

    title: {
        fontSize: 16,
        color: '#8B8B8B',
    },

    inputLabel: {
        margin: 5,
        fontSize: 14,
    },
});
  
const smallInputStyle = StyleSheet.flatten([
    styles.input, 
    {
      width: '45%'
    },
])