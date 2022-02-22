import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, View, Image } from 'react-native';
import AppText from './AppText';
import { COLORS } from '../../constants';
import React from 'react';
import { PrimaryButton } from '.';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <View style={styles.text}>
                <AppText style={styles.title}><b>{name}</b></AppText>

                <AppText><b>Pick Up:</b> {pickUp}</AppText>

                <AppText><b>Drop-Off:</b> {dropOff}</AppText>

                <AppText><b>Deliver By:</b> {deliverBy}</AppText>

                <AppText><b>Package Quantity:</b> {packageQuantity}</AppText>

                <PrimaryButton title ="In Progress"></PrimaryButton>
            </View>

            <View style={styles.imageContainer}>
                
            </View>

            <Image source={{
                uri: image,
                
            }}
            style={{ width: 100, height: 100 }}
             />

             

        </View>
    )
}

JobListing.defaultProps = {
    image: 'https://ychef.files.bbci.co.uk/976x549/p07v2wjn.jpg'
}

const styles = StyleSheet.create({
    container: {
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
        margin: 10,
    },
    image: {
        height: 20,
        width: 10,
    }
});
