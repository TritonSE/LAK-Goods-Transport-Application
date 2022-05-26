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
    const [displayJobOwned, setDisplayJobOwned] = useState<boolean>(true);
    const [jobListType, setJobListType] = useState<JobTypePickerOption>('Current Jobs');

    const [jobs, setJobs] = useState<JobData[] | JobOwnerView[]>([]);
    const [page, setPage] = useState(1);
    const [allLoaded, setAllLoaded] = useState<boolean>(false);
    console.log('render allLoaded', allLoaded);

    useEffect(() => {
        console.log('useEffect1: displayJobOwned', displayJobOwned, 'jobListType', jobListType)
        setJobs([]);
        setPage(0);
    }, [displayJobOwned, jobListType]);
    
    useEffect(() => {
        console.log('useEffect2 page', page)
        if (page === 0) {
            setPage(1);
            return;
        }

        setAllLoaded(false);
        getJobs(displayJobOwned, jobListType === 'Completed Jobs', page)
        .then(response => {
            if (response === null) {
                // TODO Handle Error
                return;
            }
            
            const { jobs: newJobs, lastPage } = response;

            for (let newJob of newJobs) {
                if (jobs.find((jobI, index) => newJob._id === jobI._id)) {
                    console.log('Duplicate found: ', newJob._id)
                }
            }

            setJobs([...jobs, ...newJobs]);
            setAllLoaded(lastPage);
        });
    }, [page]);
 
    return <>
        <View style={{height: 90, backgroundColor: COLORS.maroon}}></View>
        <View style={{alignItems: 'center'}}>
            
            <View style={{width: '100%', paddingHorizontal: 40, marginBottom: 10}}>
                
                <FlatList 
                    style={{width: '100%'}}
                    contentContainerStyle={{width: '100%'}}
                    data={jobs}
                    keyExtractor={item => item._id}
                    renderItem={ ({ item, index }) => (
                        <JobThumbnail isJobOwner={true} job={(item as JobOwnerView)} />
                    )}
                    scrollEnabled={true}
                    ListHeaderComponent={
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
                            <View style={styles.spacer}/>
                            <AppButton type="primary" size="small" onPress={() => console.log('Add Job button pressed')} title='Add Job' style={styles.addJobBtn}/>
                        </View>
                    }
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
        borderRadius: 4
    },
    spacer: {
        flexGrow: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    addJobBtn: {
        borderRadius: 4,
    }
})