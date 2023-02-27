import React from 'react';
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";
import { COLORS } from "../../constants";
import { IconButtonWrapper} from '../components';
import { NoAvailableJobsIcon, NoJobsIcon, NoMatchingJobsIcon } from '../icons'
import { ProfileButtonIcon } from '../icons/ProfileButtonIcon';


interface NoJobProps {
    type?: 'noAvailableJobs' | 'noJobs' | 'noMatchingJobs';
    title: string;
    body: string;
    buttonName: string;
    buttonVisible: boolean;
    onButtonClick: () => void;
}

export const NoJobs = ({type, title, body, buttonName, buttonVisible, onButtonClick}: NoJobProps) => {

    return (
        <View style={styles.container}>
            
            {/* icon stuff here */}
            <View style={styles.icon}>
                <NoAvailableJobsIcon />
                {/* if (type == 'noAvailableJobs') {
                    <NoAvailableJobsIcon />
                } else if (type == 'noJobs') {
                    <NoJobsIcon />
                } else {
                    <NoMatchingJobsIcon />
                } */}
            </View>
            
            <AppText style={styles.heading}>{title}</AppText>

            <AppText style={[styles.body]}>{body}</AppText>

            <View style={styles.buttonContainer}>
                { buttonVisible ? 
                    (<AppButton 
                        style={styles.button}
                        //change textStyle and type later
                        textStyle={styles.buttonText}
                        type='primary'
                        title={buttonName}
                        onPress={onButtonClick}/>) : null }
            </View>

        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        display: "flex", 
    },

    icon: {
        height: 72,
        width: 75,
        paddingBottom: 100
    },
    
    body: {
        fontSize: 16,
        textAlign: "left",
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: "center",
        paddingBottom: 10
    },

    buttonContainer: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start"
    },

    button: {
        width: 110,
        backgroundColor: "transparent",
        elevation: 0,
        
    },

    buttonText: {
        color: COLORS.blue,
        fontSize: 16,
        textAlign: "left"
    }
});
