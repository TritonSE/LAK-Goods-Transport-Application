import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, View, Image } from 'react-native';
import { AppText } from '../components';
import { COLORS } from '../../constants';
import React from 'react';
import { PrimaryButton } from '../components';
import Icon  from 'react-native-vector-icons/Feather';
import { Picker } from "@react-native-picker/picker";
import JobThumbnail from '../components/JobThumbnail';
import PickerItem from '../components/PickerItem'; 

const CURRENT_JOBS = ["Job 1", "Job 2", "Job 3"];

export default function AddJobsFindJobs() {
 
    return (
        <View style={styles.container}>

            <View style={styles.topRow}>
                {/* <View style={styles.pickerWrapper}> */}

                <Picker
                    selectedValue="Current Jobs"
                    mode="dropdown" // Android only
                    style={styles.picker}
                    >

                    {CURRENT_JOBS.map((currentJob => 
                        <PickerItem label="Current Jobs" value={currentJob}/>
                    ))}

                </Picker>

                {/* </View> */}

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
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    pickerWrapper: {
        // borderWidth: 1,
        // borderRadius: 4,
        // borderColor: "#8B8B8B",
    },
    picker: {
        marginRight: 10, 

        width: '60%',
        height: 40,
    },
    addJobButton: {
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
