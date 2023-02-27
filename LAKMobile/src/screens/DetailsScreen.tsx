import React from 'react';
import {
    StyleSheet,
    View,
    Linking,
    ScrollView
} from 'react-native';
import { JobData } from '../api/data';
import {
    AppText,
} from '../components';

type DetailsScreenProps = {
    jobData: JobData
    carousel: JSX.Element
}

export function DetailsScreen({ carousel, jobData }: DetailsScreenProps) {
    return (
        <>
            {carousel}
            <ScrollView nestedScrollEnabled={true} style={styles.detailsComponent}>

                <AppText style={styles.jobText}>{jobData.title}</AppText>

                <View style={styles.fieldContainer}>
                    <AppText style={{ fontWeight: "bold" }}>Pick-up:</AppText>
                    <AppText>{jobData.pickupLocation}</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={{ fontWeight: "bold" }}>Drop-off:</AppText>
                    <AppText>{jobData.dropoffLocation}</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText style={{ fontWeight: "bold" }}>Deliver by date:</AppText>
                    <AppText>{jobData.deliveryDate}</AppText>
                </View>
                {jobData.packageQuantity ? (
                    <View style={styles.fieldContainer}>
                        <AppText>
                            <AppText style={{ fontWeight: "bold" }}>Package Quantity:</AppText> {jobData?.packageQuantity}
                        </AppText>
                    </View>
                ) : null}
                {jobData.price ? (
                    <View style={styles.fieldContainer}>
                        <AppText>
                            <AppText style={{ fontWeight: "bold" }}>Delivery Price:</AppText> {jobData?.price}
                        </AppText>
                    </View>
                ) : null}
                {jobData.description ? (
                    <View style={styles.fieldContainer}>
                        <AppText style={{ fontWeight: "bold" }}>Description:</AppText>
                        <AppText>{jobData.description}</AppText>
                    </View>
                ) : null}

                <View style={styles.fieldContainer}>
                    <AppText style={{ fontWeight: "bold" }}>Contacts:</AppText>
                    <AppText>Sender: {jobData.clientName}</AppText>
                    <AppText onPress={() => {
                        Linking.openURL('tel:' + jobData.phoneNumber);
                    }}
                        style={styles.phoneNumber}>
                        {jobData.phoneNumber}
                    </AppText>
                    {jobData.receiverName ? <AppText>Receiver: {jobData.receiverName} </AppText> : null}
                    {jobData.receiverPhoneNumber ?
                        <AppText onPress={() => {
                            Linking.openURL('tel:' + jobData.receiverPhoneNumber);
                        }}
                            style={styles.phoneNumber}>
                            {jobData.receiverPhoneNumber}
                        </AppText> : null}
                </View>
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({

    detailsComponent: {
        paddingLeft: 30,
        paddingRight: 30,
    },

    assignedPanel: { // style to create read panel
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

