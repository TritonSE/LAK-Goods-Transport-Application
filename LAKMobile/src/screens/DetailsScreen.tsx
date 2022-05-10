import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import {
    AppText,
    ScreenHeader,
} from '../components';
import {DetailsArrow} from "../icons/DetailsArrow";

type DetailsScreenProps = {
    jobId: String;
}

export function DetailsScreen({jobId}: DetailsScreenProps) {
    jobId = "62307de6ec658d185f81dff3";
    const [jobData, setJobData] = useState();

    const getJobData = async () => {
        const data = await fetch("http://localhost:3000/api/jobs/" + jobId, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            let json = await response.json()
            console.log(json.job.clientName)
            setJobData(json);
        })
    }

    React.useEffect(() => {
        getJobData();
    }, [])


    return (
        <View>
            <ScreenHeader children={""} showArrow={true}/>
            <View style={styles.detailsComponent}>
                <AppText style={styles.jobText}>{jobData?.job?.title}</AppText>
                <AppText style={styles.pickDropComponent}>
                    Pick up <DetailsArrow></DetailsArrow> Drop Off
                </AppText>
                <View style={styles.colContainer}>
                    <AppText>Deliver by
                        date<br/><b>{jobData?.job?.deliveryDate}</b></AppText>
                    <AppText style={styles.deliverPrice}>Delivery
                        Price<br/><b>{jobData?.job?.price}</b></AppText>
                </View>
                <AppText style={styles.packageQuantity}>
                    Package Quantity: {jobData?.job?.packageQuantity}
                </AppText>
                <View style={styles.fieldContainer}>
                    <AppText><b>Description</b></AppText>
                    <AppText>{jobData?.job?.description}</AppText>
                </View>
                <View style={styles.fieldContainer}>
                    <AppText><b>Contact</b></AppText>
                    <AppText>{jobData?.job?.clientName}</AppText>
                    <AppText onPress={() => {
                        Linking.openURL('tel:' + jobData?.job?.phoneNumber);
                    }}
                             style={styles.phoneNumber}>
                        {jobData?.job?.phoneNumber}
                    </AppText>
                </View>
            </View>
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

    jobText: {
        marginTop: 20,
        fontFamily: "normal",
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 28,
        color: "#94100C",
    },

    pickDropComponent: {
        marginTop: 20,
        fontWeight: "700",
        lineHeight: 19,
    },

    dateText: {
        marginTop: 20,
        width: "40%"
    },

    colContainer: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'flex-start', // if you want to fill rows left to right
    },

    deliverPrice: {
        paddingLeft: 100,
    },

    packageQuantity: {
        marginTop: 20,
        fontWeight: "700",
        lineHeight: 19,
    },

    fieldContainer: {
        marginTop: 20,
    },

    phoneNumber: {
        color: 'blue',
    }
})

