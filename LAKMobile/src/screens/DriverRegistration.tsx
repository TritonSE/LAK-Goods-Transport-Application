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
                    <View style={[styles.pickerWrapper]}>
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
                    {/**type, textStyle*/}
                    <LabelWrapper label='Photo of Vehicle'>
                        <AppButton
                            style={styles.uploadPhotoButton}
                            title = "Upload vehicle photo"
                            onPress={uploadPhoto}
                            type="quaternary"
                        />
                    </LabelWrapper>
                </View>

                <View style={styles.center}>
                    <AppButton
                        style={styles.registerButton}
                        type='primary'
                        title='Register'
                        onPress={() => console.log('Driver information submitted')}
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