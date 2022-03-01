import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, View, Image } from 'react-native';
import { AppText } from '../components';
import { COLORS } from '../../constants';
import React, { useState } from 'react';
import { PrimaryButton } from '../components';
import Icon  from 'react-native-vector-icons/Feather';
import { Picker } from "@react-native-picker/picker";
import JobThumbnail from '../components/JobThumbnail';
import PickerItem from '../components/PickerItem'; 

const CURRENT_JOBS = ["Job 1", "Job 2", "Job 3"];

export default function AddJobsFindJobs() {

    const [selectedJob, setSelectedJob] = useState("Current Jobs");
 
    return (
        <View style={styles.container}>
            

            <View style={styles.topRow}>

                <View style ={styles.pickerWrapper}>

                <Picker
                    selectedValue={selectedJob}
                    mode="dropdown" // Android only
                    style={styles.picker}
                    onValueChange={(value) => setSelectedJob(value)}
                    >

                    {CURRENT_JOBS.map((currentJob) => 
                        <PickerItem label={currentJob} value={currentJob}/>
                    )}

                </Picker>
                </View>



                <PrimaryButton style={styles.addJobButton} title ="Add a Job" type="primary"></PrimaryButton>
            </View>

            <JobThumbnail title="Box of apples" pickup="Location" dropoff="Location" deliver="MM/DD/YYYY" quantity="Amount" days={1} applicants={1} image={require("./../../assets/apple.png")} inProgress />
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    topRow: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    pickerWrapper: {
        width: '40%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#8B8B8B",
    },
    picker: {
        marginRight: 10, 

        width: '100%',
        height: 40,
    },
    addJobButton: {
        marginLeft: 20,
        width: '40%',
        borderRadius: 5,
    },
    jobsContainer: {
        // backgroundColor: 'lightgray',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    text: {
        // flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'flex-start',
    },
    imageContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin: 10,
    },
    icon: {
        marginTop: 20,
    },
    image: {
        height: 20,
        width: 10,
    },
    statusButton: {
        marginTop: 20,
    }
});
