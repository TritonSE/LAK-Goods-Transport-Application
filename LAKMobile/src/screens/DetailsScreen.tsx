import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    Pressable,
    ScrollView
} from 'react-native';
import {
    AppText,
    ScreenHeader,
} from '../components';
import {DefaultProfilePic} from "../icons/DefaultProfilePicture";

type DetailsScreenProps = {
    jobId: String;
}

export function DetailsScreen({jobId}: DetailsScreenProps) {
    // temporary dummy data
    jobId = "623082910cd4cacb726883ab";
    const user = "client1"
    const [jobData, setJobData] = useState(null);
    const [driverData, setDriverData] = useState(null);

    const getJobData = async () => {
        // replace "10.0.2.2" with localhost if using web
        await fetch("http://10.0.2.2:3000/api/jobs/" + jobId + "?user=" + user, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            let json = await response.json()
            setJobData(json);
            console.log(json)
            await fetch("http://10.0.2.2:3000/api/users/get-by-ids", {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({userIds: [json.job.assignedDriverId]}),
            }).then(async response => {
                let json = await response.json();
                setDriverData(json);
            })
        })
    }

    React.useEffect(() => {
        getJobData();
    }, [])


    return (
        <View>
            <ScreenHeader showArrow={true}/>
            {jobData != null ? (
                <ScrollView style={styles.detailsComponent}>
                    <View style={styles.assignedPanel}>
                        <AppText style={styles.assignedText}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <DefaultProfilePic/><AppText><AppText style={styles.assignedName}>  {driverData?.users[0].firstName} {driverData?.users[0].lastName}</AppText> <AppText style={styles.assignedText}>is assigned to this job.</AppText></AppText>
                            </View>
                        </AppText>
                        <Pressable style={styles.assignedButton}><AppText style={styles.buttonText}>Mark as Done</AppText></Pressable>
                        <Pressable style={styles.assignedButton}><AppText style={styles.buttonText}>Cancel Job</AppText></Pressable>
                    </View>

                    <AppText style={styles.jobText}>{jobData?.job.title}</AppText>

                    <View style={styles.fieldContainer}>
                        <AppText style={{fontWeight: "bold"}}>Pick-up:</AppText>
                        <AppText>{jobData?.job.pickupLocation}</AppText>
                    </View>
                    <View style={styles.fieldContainer}>
                        <AppText style={{fontWeight: "bold"}}>Drop-off:</AppText>
                        <AppText>{jobData?.job.dropoffLocation}</AppText>
                    </View>
                    <View style={styles.fieldContainer}>
                        <AppText style={{fontWeight: "bold"}}>Deliver by date:</AppText>
                        <AppText>{jobData?.job.deliveryDate}</AppText>
                    </View>
                    {jobData?.job.packageQuantity ? (
                        <View style={styles.fieldContainer}>
                            <AppText>
                                <AppText style={{fontWeight: "bold"}}>Package Quantity:</AppText> {jobData?.job.packageQuantity}
                            </AppText>
                        </View>
                    ) : null}
                    {jobData?.job.price ? (
                        <View style={styles.fieldContainer}>
                            <AppText>
                                <AppText style={{fontWeight: "bold"}}>Delivery Price:</AppText> {jobData?.job.price}
                            </AppText>
                        </View>
                    ) : null}
                    {jobData?.job.description ? (
                        <View style={styles.fieldContainer}>
                            <AppText style={{fontWeight: "bold"}}>Description:</AppText>
                            <AppText>{jobData?.job.description}</AppText>
                        </View>
                    ) : null}

                    <View style={styles.fieldContainer}>
                        <AppText style={{fontWeight: "bold"}}>Contacts:</AppText>
                        <AppText>Sender: {jobData?.job.clientName}</AppText>
                        <AppText onPress={() => {
                            Linking.openURL('tel:' + jobData?.job.phoneNumber);
                        }}
                                 style={styles.phoneNumber}>
                            {jobData?.job.phoneNumber}
                        </AppText>
                        <AppText>Receiver: {driverData?.users[0].firstName} {driverData?.users[0].lastName}</AppText>
                        <AppText onPress={() => {
                            Linking.openURL('tel:' + driverData?.users[0].phone);
                        }}
                                 style={styles.phoneNumber}>
                            {driverData?.users[0].phone}
                        </AppText>
                    </View>
                </ScrollView>
            ) : null}
        </View>


    );
}

const styles = StyleSheet.create({

    detailsComponent: {
        marginTop: 268,
        paddingLeft: 30,
        paddingTop: 20,
        paddingRight: 30,
    },

    assignedPanel: {
        width: 304,
        backgroundColor: "#F5C7C5",
        borderRadius: 6,
        paddingTop: 16,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 16,
    },

    assignedName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333333",

    },

    assignedText: {
        fontSize: 12,

    },

    assignedButton: {
        width: 160,
        height: 34,
        marginTop: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        display: "flex",
        alignSelf: "center",
    },

    buttonText: {
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 34,
        color: "#94100C",
        display: "flex",
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
    },

    jobText: {
        marginTop: 20,
        fontFamily: "normal",
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 28,
        color: "#94100C",
    },

    fieldContainer: {
        marginTop: 20,
    },

    phoneNumber: {
        color: 'blue',
    }
})

