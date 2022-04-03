import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, TouchableOpacity, TouchableHighlight } from 'react-native';

import { AppText } from '../components';
import { COLORS } from '../../constants';

interface HeaderProps {
    title: string,
    image: ImageSourcePropType,
    pickup: string,
    dropoff: string,
    deliver: string,
    quantity: string,
    pending?: boolean,
    inProgress?: boolean,
    dead?: boolean,
    applicants?: number,
    days?: number
}

export default function JobThumbnail({title, image, pickup, dropoff, deliver, quantity, pending = false, inProgress = false, dead = false, applicants = 0, days = 0}:HeaderProps) {

    // Just returning null if you try to have multiple jobs statuses or have no status
    if((dead && pending) || (pending && inProgress) || (inProgress && dead)) return null
    if(!dead && !inProgress && !pending) return null

    return(
        <View style={styles.card}>
            <View style={styles.top}>

                <View style={styles.left}>
                    <AppText style={styles.title}>{title}</AppText>
                    <AppText style={styles.info}><AppText style={styles.bold}>Pick-up: </AppText>{pickup}</AppText>
                    <AppText style={styles.info}><AppText style={styles.bold}>Drop-off: </AppText>{dropoff}</AppText>
                    <AppText style={styles.info}><AppText style={styles.bold}>Deliver by: </AppText>{deliver}</AppText>
                    <AppText style={styles.info}><AppText style={styles.bold}>Package Quantity: </AppText>{quantity}</AppText>
                </View>

                <Image style={styles.image} source={image}/>
            </View>

            <View style={styles.bottom}>
                {pending ? 
                <>
                    <TouchableOpacity onPress={() => console.log("Edit Button Pressed")}>
                        <Image style={styles.edit} source={require("../../assets/edit.png")}/>
                    </TouchableOpacity>
                    <AppText style={styles.applicants}>{applicants} {(applicants == 1) ? "applicant" : "applicants"}</AppText>
                </> : null}

                {inProgress ?
                <>
                    <AppText style={styles.days}>Started {days} {(days == 1) ? "day" : "days"} ago</AppText>
                    <View style={styles.inProgress}>
                        <AppText style={styles.inProgressText}>In Progress</AppText>
                    </View>
                </> : null}

                {dead ?
                <TouchableHighlight onPress={() => console.log("Repost Button Pressed")} underlayColor={"#fff"}>
                    <View style={styles.repost}>
                        <AppText style={styles.repostText}>Repost</AppText>
                    </View>
                </TouchableHighlight> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    card: {
        width: 350,
        
        padding: 15,
        flexDirection: "column",

        backgroundColor: "#fff",
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 7
    },

    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative"
    },

    left: {
        justifyContent: "flex-start"
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },

    bold: {
        fontWeight: "bold"
    },

    info: {
        fontSize: 14
    },

    image: {
        height: 110,
        width: 110
    },

    bottom: {
        width: "100%",
        marginTop: 15,
        flexDirection: "row-reverse",
        justifyContent: "space-between"
    },

    edit: {
        height: 22,
        width: 22
    },

    applicants: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.turquoise
    },

    days: {
        fontSize: 14,
        color: "#DA5C5C",
        fontWeight: "bold"
    },
    
    inProgress: {
        width: 90,
        height: 22,
        backgroundColor: "#FFE587",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },
    
    inProgressText: {
        color: "black",
        fontSize: 12,
        fontWeight: "bold"
    },

    repost: {
        width: 110,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,

        backgroundColor: "#fff",
        shadowColor: "black",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },

    repostText: {
        fontSize: 16,
        color: COLORS.maroon
    }

});