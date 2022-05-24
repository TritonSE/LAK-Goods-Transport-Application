import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

import { getJobs, JobData, JobOwnerView } from "../api";
import { JobThumbnail } from "../components";

export function ListJobs() {
    const [displayJobOwned, setDisplayJobOwned] = useState<boolean>(true);
    const [displayJobFinished, setDisplayJobFinished] = useState<boolean>(false);

    const [jobs, setJobs] = useState<JobData[] | JobOwnerView[]>([]);
    const [page, setPage] = useState(1);
    const [allLoaded, setAllLoaded] = useState<boolean>(false);
    
    useEffect(() => {
        getJobs(displayJobOwned, displayJobFinished, page)
        .then(new_jobs => {
            if (new_jobs === null) {
                // TODO Handle Error
            } else if (new_jobs.length === 0) {
                setAllLoaded(true);
            } else {
                setJobs([...jobs, ...new_jobs]);
            }
        });
    }, [displayJobOwned, displayJobFinished, page]);
 
    return (
        <View style={{alignItems: 'center'}}>
            <FlatList 
                contentContainerStyle={{width: '100%'}}
                data={jobs}
                keyExtractor={item => item._id}
                renderItem={ ({ item, index }) => (
                    <JobThumbnail isJobOwner={true} job={(item as JobOwnerView)} />
                )}
                scrollEnabled={true}
                onEndReached={() => {
                    if (!allLoaded) setPage(page+1);
                }}
                onEndReachedThreshold={0}
                refreshing={true}
            />
        </View>
    )
}