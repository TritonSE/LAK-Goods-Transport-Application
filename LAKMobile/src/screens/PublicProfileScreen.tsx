import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Linking, Pressable} from 'react-native';
import {
    AppText,
    ScreenHeader,
} from '../components';
import {PublicProfilePicDefault} from "../icons/PublicProfilePicDefault";

type PublicProfileScreenProps = {
    userId: String;
}

export function PublicProfileScreen({userId}: PublicProfileScreenProps) {
    // temporary dummy data
    userId = "62306adf7f4a466b571f6b42";
    const [profileData, setProfileData] = useState(null);

    const getJobData = async () => {
        // replace "10.0.2.2" with localhost if using web
        await fetch("http://10.0.2.2:3000/api/users/get-by-ids", {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({userIds: [userId]}),
        }).then(async response => {
            let json = await response.json();
            setProfileData(json.users[0]);
            console.log(json.users[0])
        })
    }

    React.useEffect(() => {
        getJobData();
    }, [])


    return (
        <View>
            <ScreenHeader showArrow={true} children={"Profile"}/>
            <View style={styles.profileContainer}>
                <View style={styles.nameContainer}>
                    <PublicProfilePicDefault/>
                    <AppText style={styles.nameText}>
                        {profileData?.firstName} {profileData?.lastName}
                    </AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.sectionTitle}>Contact Information</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldText}>{profileData?.phone}</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldText}>{profileData?.location}</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.sectionTitle}>Vehicle Information</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldText}>Vehicle ID License</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldText}>Model/Color</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldText}>Type</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldText}>Make</AppText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    profileContainer: {
        paddingLeft: 32,
    },

    nameContainer: {
        marginTop: 126,
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 37,
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
        fontSize: 12,
        position: "absolute",
        bottom: 0,
        left: 32
    },

    reportButton: {

    }
})
