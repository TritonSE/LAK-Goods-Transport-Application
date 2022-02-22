import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, View, Image } from 'react-native';
import AppText from './AppText';
import { COLORS } from '../../constants';
import React from 'react';
import { PrimaryButton } from '.';
import Icon  from 'react-native-vector-icons/Feather';

type JobListingProps = {
    name: string,
    pickUp: string,
    dropOff: string,
    deliverBy: string,
    packageQuantity: number, 
    image: string, 
}

export default function JobListing({name, pickUp, dropOff, deliverBy, packageQuantity, image}: JobListingProps) {
 
    return (
        <View style={styles.container}>

            <View style={styles.topRow}>
                <PrimaryButton style={styles.addJobButton} title ="Add a Job" type="primary"></PrimaryButton>
                <PrimaryButton style={styles.addJobButton} title ="Add a Job" type="primary"></PrimaryButton>
            </View>

            <View style={styles.jobsContainer}>

            <View style={styles.text}>
                <AppText style={styles.title}><b>{name}</b></AppText>

                <AppText><b>Pick Up:</b> {pickUp}</AppText>

                <AppText><b>Drop-Off:</b> {dropOff}</AppText>

                <AppText><b>Deliver By:</b> {deliverBy}</AppText>

                <AppText><b>Package Quantity:</b> {packageQuantity}</AppText>

                <PrimaryButton style={styles.statusButton} title ="In Progress" type="link"></PrimaryButton>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{
                    uri: image,    
                }}
                style={{ width: 100, height: 100 }}
                />

                <Icon style={styles.icon} name="edit" size={30} color="black" />
            </View> 
            </View>
        </View>
    )
}

JobListing.defaultProps = {
    image: 'https://ychef.files.bbci.co.uk/976x549/p07v2wjn.jpg'
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
    addJobButton: {
        width: '40%',
    },
    jobsContainer: {
        flex: 1,
        // backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'center',
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
