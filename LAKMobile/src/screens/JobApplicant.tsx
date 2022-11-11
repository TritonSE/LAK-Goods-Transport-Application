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
    return (
        <TabHeader jobData={route.params.jobData}/>        
    )

}