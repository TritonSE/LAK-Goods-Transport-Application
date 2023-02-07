import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, FlatList, ScrollView} from 'react-native';

import { getCurrentUser, getUser, UserData } from '../api';
import { imageIdToSource } from '../api/consumer';
import {
    AppButton,
    AppText,
    ScreenHeader,
    IconButtonWrapper
} from '../components';
import {PublicProfilePicDefault, EditIcon} from "../icons";
import { ProfileScreenProps } from '../types/navigation';

export function ProfileScreen({navigation, route}: ProfileScreenProps) {
    const [profileData, setProfileData] = useState<UserData | null>(null);

    useEffect(() => {
        getUser(route.params.userId)
        .then(user => {
            setProfileData(user)
        })
    }, [route.params])
    
    const isUserTheViewer = getCurrentUser() === route.params.userId;

    return (
        <View style={styles.mainContainer}>
            <ScreenHeader showArrow={true} children={"Profile"}/>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.profileContainer}>
                    <View style={styles.nameContainer}>
                        <PublicProfilePicDefault/>
                        <AppText style={styles.nameText}>
                            {profileData?.firstName} {profileData?.lastName}
                        </AppText>
                    </View>
                    {isUserTheViewer && <IconButtonWrapper style={styles.editButton} onPress={() => navigation.navigate('EditProfileScreen', {userId: getCurrentUser()})}>
                        <EditIcon />
                    </IconButtonWrapper>}
                    <View style={[styles.fieldContainer]}>
                        <AppText style={styles.sectionTitle}>Contact Information</AppText>
                    </View>
                    <View style={styles.fieldContainer}>
                        <AppText style={styles.fieldText}>{profileData?.phone}</AppText>
                    </View>
                    <View style={styles.fieldContainer}>
                        <AppText style={styles.fieldText}>{profileData?.location.split(";")[0]}</AppText>
                    </View>

                    { profileData?.driverLicenseId && <View>
                            <View style={styles.fieldContainer}>
                                <AppText style={styles.sectionTitle}>Driver Information</AppText>
                            </View>
                            <View style={styles.fieldContainer}>
                                <AppText style={styles.fieldText}>{profileData?.driverLicenseId}</AppText>
                            </View>
                        </View>}
                    
                    { profileData?.vehicleData && <View>
                            <View style={styles.fieldContainer}>
                                <AppText style={styles.sectionTitle}>Vehicle Information</AppText>
                            </View>
                            <View style={styles.fieldContainer}>
                                <AppText style={styles.fieldText}>{profileData?.vehicleData.vehicleType}</AppText>
                            </View>
                            <View style={styles.fieldContainer}>
                                <AppText style={styles.fieldText}>{profileData?.vehicleData.vehicleModel}</AppText>
                            </View>
                            <View style={styles.fieldContainer}>
                                <AppText style={styles.fieldText}>{profileData?.vehicleData.vehicleType}</AppText>
                            </View>
                            <View style={styles.fieldContainer}>
                                <AppText style={styles.fieldText}>{profileData?.vehicleData.vehicleMake}</AppText>
                            </View>
                        </View>}
                    { profileData?.vehicleData?.imageIds && <View>
                            <FlatList 
                                data={profileData?.vehicleData.imageIds}
                                renderItem={({item, index}) => (
                                    <Image source={imageIdToSource(item)} style={styles.vehicleImage}/>
                                )}
                                horizontal
                                keyExtractor={(item) => item}
                            />
                        </View>}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                { 
                    isUserTheViewer && 
                    <View style={styles.center}>
                        <AppButton
                            type='secondary'
                            title='Change pin'
                            onPress={() => console.log('Change pin pressed')}
                            style={styles.footerButton}
                        />
                        <AppButton
                            type='primary'
                            title='Log out'
                            onPress={() => console.log('Log out pressed')}
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
        overflow: 'hidden'
    },

    profileContainer: {
        paddingTop: 10,
        paddingLeft: 32,
    },

    nameContainer: {
        flexDirection:'row',
        alignItems:'center',
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
    }
})
