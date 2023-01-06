import React, { useEffect, useState } from 'react';
import { JobData, JobOwnerView } from '../api/data';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
    StyleSheet,
    View,
    Linking,
    ScrollView
} from 'react-native';
import {
    ApplicantThumbnail,
    AppText,
} from '../components';

import { ApplicantData, UserData } from '../api/data';
import { assignDriver, denyDriver, getUsersByIds } from '../api';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation'
import { JobUpdate } from './ListJobs'


interface ApplicantScreenProps {
    jobData: JobOwnerView
    setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>
    carousel: JSX.Element
    navigation: any
}



export function ApplicantsScreen({ jobData, setJobData, carousel, navigation }: ApplicantScreenProps) {
    const userIds: Array<string> = jobData.applicants.map(applicant => applicant.userId)
    const [applicants, setApplicants] = useState<Array<ApplicantData>>([])

    useEffect(() => {
        getUsersByIds(userIds).then(async (response) => {
            console.log(navigation)
            if (response == null) {
                return null;
            }
            const applicantUsers: Array<UserData> = response;
            setApplicants(applicantUsers.map((applicant, i) => ({
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                phone: applicant.phone,
                vehicleInformation: "vehicle",
                driverId: userIds[i],
            }))
            )
        })
    }, [jobData])

    const updateWithAssigned = (driverId: string): JobOwnerView => {
        return ({
            ...jobData,
            status: 'ASSIGNED',
            assignedDriverId: driverId,
            startDate: (new Date()).toString()
        }) as JobOwnerView

    }

    const updateWithDenial = (driverId: string): JobOwnerView => {
        const newApplicants = jobData.applicants.filter(applicant => applicant.userId !== driverId)
        return ({
            ...jobData,
            applicants: newApplicants,
        })
    }

    const onAccept = (driverId?: string) => {
        if (!driverId) return;
        assignDriver(jobData._id, driverId).then(response => {
            if (response === null) {
                return
            }
            const resDriverId = response.driverId
            const updatedJob: JobOwnerView = updateWithAssigned(resDriverId)
            setJobData(prevJobs => prevJobs.map(job => (job._id === updatedJob._id ? updatedJob : job)))
            navigation.navigate("ListJobs")
        })
    }

    const onDeny = (driverId?: string) => {
        console.log("HERE")
        if (!driverId) return;
        console.log("NOW HERE")
        denyDriver(jobData._id, driverId).then(response => {
            if (response === null) {
                return
            }
            const resDriverId = response.driverId
            const updatedJob: JobOwnerView = updateWithDenial(resDriverId)
            setJobData(prevJobs => prevJobs.map(job => (job._id === updatedJob._id ? updatedJob : job)))
            navigation.navigate("ListJobs")
        })
    }


    return (
        <View>
            {carousel}

            <ScrollView>
                {
                    applicants.map((applicant, index) => (<ApplicantThumbnail key={index} onAccept={() => onAccept(applicant.driverId)} onDeny={() => onDeny(applicant.driverId)} applicantData={applicant} status='Unassigned' />))
                }

            </ScrollView>

        </View>
    );

}



const styles = StyleSheet.create({

})