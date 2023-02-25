import React, { useEffect, useState } from 'react';
import { JobData, JobOwnerView } from '../api/data';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {Alert} from 'react-native';
import { ConfirmationBox } from '../components/ConfirmationBox';

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

import { UserData } from '../api/data';
import { assignDriver, denyDriver, getUsersByIds } from '../api';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation'


interface ApplicantScreenProps {
    jobData: JobOwnerView
    setJobData: React.Dispatch<React.SetStateAction<JobData[] | JobOwnerView[]>>
    carousel: JSX.Element
    navigation: any
}

// Define the interface here
interface ApplicantData{
    userData: UserData
    driverID: string
}



export function ApplicantsScreen({ jobData, setJobData, carousel, navigation }: ApplicantScreenProps) {
    //temporary fix until we figure out the true data structure for applicants in a job
    const applicantsProps = jobData.applicants || [];
    const userIds: Array<string> = applicantsProps.map(applicant => applicant.userId);
    const [applicants, setApplicants] = useState<Array<ApplicantData>>([])
    const [confirmationVisible, setConfirmationVisible] = useState(false);

    useEffect(() => {
        getUsersByIds(userIds).then(async (response) => {
            if (response == null) {
                return null;
            }
            const applicantUsers: Array<UserData> = response;
            setApplicants(applicantUsers.map((applicant, i) => ({
                userData: applicant,
                driverID: userIds[i],
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

        setConfirmationVisible(true)
    }

    const onDeny = (driverId?: string) => {
        if (!driverId) return;
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
                    applicants.map((applicant, index) => (<ApplicantThumbnail key={index} onAccept={() => onAccept(applicant.driverID)} onDeny={() => onDeny(applicant.driverID)} applicantData={applicant.userData} status='Unassigned' />))
                }

            </ScrollView>

            { confirmationVisible ? (<ConfirmationBox
                rejectVisible = {true}
                checkMarkAppear = {true}
                title={"Apply to job?"}
                body={"Be sure to contact client at phone number"}
                acceptName={"Apply"}
                rejectName={"Cancel"}
                onAccept={() => navigation.navigate('DetailsScreen')}
                onReject={() => setConfirmationVisible(false)} />) : null }
        
        </View>

        
    );

}



const styles = StyleSheet.create({

})