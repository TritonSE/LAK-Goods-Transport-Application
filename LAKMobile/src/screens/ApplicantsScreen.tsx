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


import { ApplicantData } from '../api/data';


interface ApplicantScreenProps {
    jobData: JobOwnerView
    carousel: JSX.Element
}



export function ApplicantsScreen({jobData, carousel} : ApplicantScreenProps) {


    useEffect(()=>{}, [])


    return (
        <View>
            {carousel}

            <ScrollView>

                {

                jobData.applicants.map(applicant=>{
                    let applicantData : ApplicantData = { }
                }<ApplicantThumbnail/>)

                }



                
                
            </ScrollView>
            
        </View>


                
    );

}



const styles = StyleSheet.create({

})