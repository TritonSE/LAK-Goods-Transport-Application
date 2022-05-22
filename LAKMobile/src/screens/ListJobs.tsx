import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

import { getJobIds, getJobsByIds, JobData } from "../api";
import { JobThumbnail } from "../components";

export function ListJobs() {
    const [jobs, setJobs] = useState<JobData[]>([]);
    const [jobIds, setJobIds] = useState<string[]>([]);

    useEffect(() => {
        getJobIds(true, false)
        .then(jobIds => setJobIds(jobIds));
    }, []);


    useEffect(() => {
        getJobsByIds(jobIds)
        .then(jobs => setJobs(jobs));
    }, [JSON.stringify(jobIds)]);

    return (
        <View style={{alignItems: 'center'}}>
            <FlatList 
                contentContainerStyle={{width: '100%'}}
                data={jobs}
                keyExtractor={item => item._id}
                renderItem={ ({ item, index }) => (
                    <JobThumbnail job={item} displayStatus='In Progress'/>
                )}
                scrollEnabled={true}
            />
        </View>
    )
}