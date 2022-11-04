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
    Job
} from '../types/job'
import {
    AppText,
    ScreenHeader,
} from '../components';
import {DefaultProfilePic} from "../icons/DefaultProfilePicture";
import { DetailsScreen } from './DetailsScreen';

type JobApplicantProps = {
    jobId: string
}

export function JobApplicant({jobId}: JobApplicantProps) {
    const user = "client1"
    const [jobData, setJobData] = useState<Job | null>(null);

    const getJobData = async () => {
        // replace "10.0.2.2" with localhost if using web
        await fetch("http://localhost:3000/api/jobs/" + jobId + "?user=" + user, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            let json = await response.json()
            console.log(json.job)
            let jobresponse:Job = {
                clientName: json?.job.clientName,
                deliveryDate: json?.job.deliveryDate,
                description: json?.job.description,
                dropoffLocation: json?.job.dropoffLocation,
                title: json?.job.title,
                phoneNumber: json?.job.phoneNumber,
                pickupLocation: json?.job.pickupLocation,
                status: json?.job.status,
            }
            setJobData(jobresponse);
            // await fetch("http://10.0.2.2:3000/api/users/get-by-ids", {
            //     method: "POST",
            //     mode: "cors",
            //     headers: {
            //         "content-type": "application/json",
            //     },
            //     body: JSON.stringify({userIds: [json.job.assignedDriverId]}),
            // }).then(async response => {
            //     let json = await response.json();
            //     setDriverData(json);
            // })
        })
    }

    React.useEffect(() => {
        getJobData();
    }, [])

    return (

        <DetailsScreen jobData={jobData} />
    )

}