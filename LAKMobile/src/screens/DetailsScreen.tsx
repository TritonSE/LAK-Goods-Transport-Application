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
    // temporary dummy data
    jobId = "62307de6ec658d185f81dff3";
    const [jobData, setJobData] = useState(null);

    const getJobData = async () => {
        // replace "10.0.2.2" with localhost if using web
        const data = await fetch("http://10.0.2.2:3000/api/jobs/" + jobId, {
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
            <ScreenHeader showArrow={true}/>
            {jobData!=null ? (
                <View>
                <View style={styles.detailsComponent}>
                    <AppText style={styles.jobText}>{jobData?.job.title}</AppText>
                    <AppText style={styles.pickDropComponent}>
                        Pick up <DetailsArrow></DetailsArrow> Drop Off
                    </AppText>
                    <View style={styles.colContainer}>
                        <AppText>
                            <Text style={{fontWeight: "bold"}}>Deliver by date{"\n"}</Text>
                            {jobData?.job.deliveryDate}
                        </AppText>
                        {jobData?.job.price ? (
                            <AppText style={styles.deliverPrice}>
                                <Text style={{fontWeight: "bold"}}>Delivery Price{"\n"}</Text>
                                {jobData?.job.price}
                            </AppText>
                        ):null}
                    </View>

                    {jobData?.job.packageQuantity ? (
                        <AppText style={styles.packageQuantity}>
                            Package Quantity: {jobData?.job.packageQuantity}
                        </AppText>
                    ):null}
                    {jobData?.job.description ? (
                        <View style={styles.fieldContainer}>
                            <AppText style={{fontWeight: "bold"}}>Description</AppText>
                            <AppText>{jobData?.job.description}</AppText>
                        </View>
                    ):null}

                    <View style={styles.fieldContainer}>
                        <AppText style={{fontWeight: "bold"}}>Contact</AppText>
                        <AppText>{jobData?.job.clientName}</AppText>
                        <AppText onPress={() => {
                            Linking.openURL('tel:' + jobData?.job.phoneNumber);
                        }}
                                 style={styles.phoneNumber}>
                            {jobData?.job.phoneNumber}
                        </AppText>
                    </View>
                </View>
                </View>
            ):null}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
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

