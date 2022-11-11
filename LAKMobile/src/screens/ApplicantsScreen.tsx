import React, {useEffect, useState} from 'react';
import { JobData, JobOwnerView } from '../api/data';
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
import { getUsersByIds } from '../api';


interface ApplicantScreenProps {
    jobData: JobOwnerView
    carousel: JSX.Element
}



export function ApplicantsScreen({jobData, carousel} : ApplicantScreenProps) {
    const userIds: Array<string> = jobData.applicants.map(applicant => applicant.userId)
    const [applicants, setApplicants] = useState<Array<ApplicantData>>([])

    useEffect(()=> {
        getUsersByIds(userIds).then(async (response) => {
            if (response == null) {
                return null;
            }
            const applicantUsers: Array<UserData> = response;
            setApplicants(applicantUsers.map(applicant => ({firstName: applicant.firstName, 
            lastName: applicant.lastName, phone: applicant.phone, vehicleInformation: "vehicle"}))
         )
        })
    }, [jobData])


    return (
        <View>
            {carousel}

            <ScrollView>
                {
                applicants.map((applicant,index) =>( <ApplicantThumbnail key={index} applicantData={applicant} status='Unassigned' />))
                }     
                
            </ScrollView>
            
        </View>


                
    );

}



const styles = StyleSheet.create({

})