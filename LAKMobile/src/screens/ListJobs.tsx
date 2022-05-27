import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { getJobs, JobData, JobOwnerView, PAGE_SIZE } from "../api";
import { JobThumbnail, ScreenHeader, AppButton } from "../components";
import { COLORS } from '../../constants';
import { PickerStyles, FlatListStyles } from '../styles';

type JobTypePickerOption = 'Current Jobs' | 'Completed Jobs';
const PICKER_OPTIONS: JobTypePickerOption[] = [
    'Current Jobs',
    'Completed Jobs'
]

export function ListJobs() {
    const [displayJobOwned, setDisplayJobOwned] = useState<boolean>(true);
    const [jobListType, setJobListType] = useState<JobTypePickerOption>('Current Jobs');

    const [jobs, setJobs] = useState<JobData[] | JobOwnerView[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const [allLoaded, setAllLoaded] = useState(false);

    useEffect(() => {
        // Resets the states for the screen
        setJobs([]);
        setAllLoaded(false);
        setPage(0);
    }, [displayJobOwned, jobListType]);
    
    useEffect(() => {
        if (page === 0) {
            setPage(1);
            return;
        }

        if (allLoaded || loading) {
            return;
        }  

        // Check if page already loaded
        if (jobs.length >= page * PAGE_SIZE) return;

        setLoading(true);
        getJobs(displayJobOwned, jobListType === 'Completed Jobs', page)
        .then(response => {
            if (response === null) {
                // TODO Handle Error
                return;
            }
            
            const { jobs: newJobs, lastPage } = response;
            
            setAllLoaded(lastPage);
            setJobs([...jobs, ...newJobs]);
            setLoading(false)
        });
    }, [page]);
 
    return <>
        {/* Temporary banner */}
        <View style={{height: 90, backgroundColor: COLORS.maroon}}></View> 
        
        <View style={{alignItems: 'center'}}>
            <View style={FlatListStyles.wrapper}>
                <FlatList 
                    style={FlatListStyles.container}
                    contentContainerStyle={FlatListStyles.contentContainer}
                    data={jobs}
                    keyExtractor={item => item._id}
                    renderItem={ ({ item, index }) => (
                        <JobThumbnail isJobOwner={true} job={(item as JobOwnerView)} />
                    )}
                    scrollEnabled={true}
                    ListHeaderComponent={
                        <View style={styles.header}>
                            <View style={[PickerStyles.wrapper]}>
                                <Picker
                                    selectedValue={jobListType}
                                    onValueChange = {(value, index) => setJobListType(value)}
                                    mode="dropdown" // Android only
                                >
                                    {PICKER_OPTIONS.map((option, index) => <Picker.Item key={index} label={option} value={option} />)}
                                </Picker>
                            </View>
                            <View style={styles.spacer}/>
                            <AppButton type="primary" size="small" onPress={() => console.log('Add Job button pressed')} title='Add Job' style={styles.addJobBtn}/>
                        </View>
                    }
                    onEndReached={() => {
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
    spacer: {
        flexGrow: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 55 // Hardcoded based on the height of the react-native picker
    },
    addJobBtn: {
        borderRadius: 4,
        height: '100%'
    },
});

