import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { getJobs, JobData, JobOwnerView } from "../api";
import { JobThumbnail, ScreenHeader, AppButton } from "../components";
import { COLORS } from '../../constants';

type JobTypePickerOption = 'Current Jobs' | 'Completed Jobs';
const PICKER_OPTIONS: JobTypePickerOption[] = [
    'Current Jobs',
    'Completed Jobs'
]

export function ListJobs() {
    console.log('render');
    const [displayJobOwned, setDisplayJobOwned] = useState<boolean>(true);
    const [jobListType, setJobListType] = useState<JobTypePickerOption>('Current Jobs');

    const [jobs, setJobs] = useState<JobData[] | JobOwnerView[]>([]);
    const [page, setPage] = useState(1);
    const [allLoaded, setAllLoaded] = useState<boolean>(false);

    useEffect(() => {
        console.log('use1')
        setJobs([]);
        setPage(0);
    }, [displayJobOwned, jobListType]);
    
    useEffect(() => {
        console.log('use2', page)
        if (page === 0) {
            setPage(1);
            return;
        }

        setAllLoaded(false);
        getJobs(displayJobOwned, jobListType === 'Completed Jobs', page)
        .then(new_jobs => {
            if (new_jobs === null) {
                // TODO Handle Error
            } else if (new_jobs.length === 0) {
                setAllLoaded(true);
            } else {
                setJobs([...jobs, ...new_jobs]);
            }
        });
    }, [page]);
 
    return <>
        <View style={{height: 90, backgroundColor: COLORS.maroon}}></View>
        <View style={{maxHeight: '95%'}}>
            <View style={styles.header}>
                <View style={[styles.pickerWrapper]}>
                    <Picker
                        style={{margin: 0, height: 25}} 

                        selectedValue={jobListType}
                        onValueChange = {(value, index) => setJobListType(value)}
                        mode="dropdown" // Android only
                    >
                        {PICKER_OPTIONS.map((option, index) => <Picker.Item key={index} label={option} value={option} style={{margin: 0, padding: 0, height: 25}} />)}
                    </Picker>
                </View>
                <AppButton type="primary" size="small" onPress={() => console.log('Add Job button pressed')} title='Add Job'/>
            </View>
            <View style={{alignItems: 'center', marginBottom: 10}}>
                
                <FlatList 
                    contentContainerStyle={{width: '100%'}}
                    data={jobs}
                    keyExtractor={item => item._id}
                    renderItem={ ({ item, index }) => (
                        <JobThumbnail isJobOwner={true} job={(item as JobOwnerView)} />
                    )}
                    scrollEnabled={true}
                    onEndReached={() => {
                        console.log('allLoaded', allLoaded);
                        if (!allLoaded) {
                            setPage(page+1);
                        }
                    }}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    pickerWrapper: {
        borderColor: COLORS.mediumGrey,
        borderWidth: 1,
        width: 200,
        padding: 0,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    }
})