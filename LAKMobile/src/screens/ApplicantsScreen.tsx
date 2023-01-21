import React, { useEffect, useState } from 'react';
import { JobData, JobOwnerView } from '../api/data';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {Alert} from 'react-native';

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
    const userIds: Array<string> = jobData.applicants.map(applicant => applicant.userId)
    const [applicants, setApplicants] = useState<Array<ApplicantData>>([])

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

    // changes start here
    const clientName = ((jobDataObject : JobData) => {
        return jobDataObject.clientName;
    });
    
    const clientPhoneNumber = ((jobDataObject : JobData) => {
        return jobDataObject.phoneNumber;
    });
    
    const title = "Apply to Job?";
    const message = "By clicking confirm, you are agreeing to accept this job. Be sure to contact" +  
                                clientName + "at the phone number" + clientPhoneNumber;
    
    const createTwoButtonAlert = () =>
    Alert.alert(title, message, [
        {
        text: 'Cancel',
        onPress: () => {console.log('Cancel button pressed'); return false;},
        style: 'cancel',
        },
        {text: 'Accept', onPress: () => {console.log('Accept button pressed'); return true;}},
    ]);
  // changes end here

    const onAccept = (driverId?: string) => {
        
        createTwoButtonAlert();

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

        </View>
    );

}



const styles = StyleSheet.create({

})