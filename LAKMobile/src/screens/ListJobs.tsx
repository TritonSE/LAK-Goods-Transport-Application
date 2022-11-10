import React, { useState, useEffect, useMemo } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import debounce from 'lodash.debounce';

import { getJobs, JobData, JobOwnerView, PAGE_SIZE } from "../api";
import { JobThumbnail, AppButton, AppTextInput } from "../components";
import { COLORS } from '../../constants';
import { PickerStyles, FlatListStyles } from '../styles';

type JobTypePickerOption = 'Current Jobs' | 'Completed Jobs';
const PICKER_OPTIONS: JobTypePickerOption[] = [
    'Current Jobs',
    'Completed Jobs'
]

export function ListJobs() {
    const [displayJobOwned, setDisplayJobOwned] = useState<boolean>(true); // TODO toggle for add jobs/find jobs
    const [jobListType, setJobListType] = useState<JobTypePickerOption>('Current Jobs');
    const [searchString, setSearchString] = useState<string | null>(null);

    const [jobs, setJobs] = useState<JobData[] | JobOwnerView[]>([]);
    
    // NOTE: Page 0 is being used as a null page, but the first page is 1. 
    // Added this so that we are able to trigger hooks dependent on `page` when type of screen changes but page number does not
    const [page, setPage] = useState(0);
    
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    const resetJobsOnPage = () => {
        setJobs([]);
        setAllLoaded(false);
        setPage(0);
    }
    const debouncedResetJobs = useMemo(() => debounce(resetJobsOnPage, 300), [])

    useEffect(() => {
        // Resets the states for the screen
        resetJobsOnPage()
    }, [displayJobOwned, jobListType]);

    useEffect(() => {
        debouncedResetJobs()
    }, [searchString])
    
    useEffect(() => {
        // Fetches the job data for last reached page `page`. Enables lazy load on scrolling.
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
        getJobs(searchString, displayJobOwned, jobListType === 'Completed Jobs', page)
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
                            <View style={styles.header_row}>
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
                                <AppButton 
                                    textStyle={styles.addJobBtnText}
                                    type="primary" 
                                    size="small" 
                                    onPress={() => console.log('Add Job button pressed')} 
                                    title='Add Job' 
                                    style={styles.addJobBtn}/>
                            </View>
                            <AppTextInput
                                value={searchString ?? undefined}
                                onChangeText={(text) => setSearchString(text)}
                                style={[styles.searchTextInput]}
                                placeholder="Search by title, location, and dellivery date"
                                maxLength={100}
                                keyboardType="default"
                                icon="search"
                            />
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
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    header_row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        height: 55, // Hardcoded based on the height of the react-native picker
    },
    addJobBtn: {
        borderRadius: 4,
        height: '100%',
    },
    addJobBtnText: {
        fontSize: 16
    },
    searchTextInput: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: COLORS.mediumGrey,
        height: 40
    }
});

