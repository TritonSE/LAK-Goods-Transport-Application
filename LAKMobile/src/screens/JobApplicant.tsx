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
    TabHeader
} from '../components';
import {DefaultProfilePic} from "../icons/DefaultProfilePicture";
import { DetailsScreen } from './DetailsScreen';
import { JobApplicantProps } from '../types/navigation';
import { getJobById } from '../api';
import { JobData, JobOwnerView } from '../api/data';

export function JobApplicant({navigation, route} : JobApplicantProps) {
    console.log(route)
    // const getJobData = async () => {
    //     // replace "10.0.2.2" with localhost if using web
 
    //     getJobById(jobId).then(response => {
    //         if (response == null) {
    //             return
    //         }
    //         setJobData(response);
    //         // await fetch("http://10.0.2.2:3000/api/users/get-by-ids", {
    //         //     method: "POST",
    //         //     mode: "cors",
    //         //     headers: {
    //         //         "content-type": "application/json",
    //         //     },
    //         //     body: JSON.stringify({userIds: [json.job.assignedDriverId]}),
    //         // }).then(async response => {
    //         //     let json = await response.json();
    //         //     setDriverData(json);
    //         // })
    //     })
    // }

    // React.useEffect(() => {
    //     getJobData();
    // }, [])

    return (
        <>
        <TabHeader jobData={route.params.jobData}/>        
        </>
    )

}