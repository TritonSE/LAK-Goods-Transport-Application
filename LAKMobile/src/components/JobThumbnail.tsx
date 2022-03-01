import React from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType, TouchableOpacity, TouchableHighlight } from 'react-native';
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
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.info}><Text style={styles.bold}>Pick-up: </Text>{pickup}</Text>
                    <Text style={styles.info}><Text style={styles.bold}>Drop-off: </Text>{dropoff}</Text>
                    <Text style={styles.info}><Text style={styles.bold}>Deliver by: </Text>{deliver}</Text>
                    <Text style={styles.info}><Text style={styles.bold}>Package Quantity: </Text>{quantity}</Text>
                </View>

                <Image style={styles.image} source={image}/>
            </View>

            <View style={styles.bottom}>
                {pending ? 
                <>
                    <TouchableOpacity onPress={() => console.log("Edit Button Pressed")}>
                        <Image style={styles.edit} source={require("../../assets/edit.png")}/>
                    </TouchableOpacity>
                    <Text style={styles.applicants}>{applicants} {(applicants == 1) ? "applicant" : "applicants"}</Text>
                </> : null}

                {inProgress ?
                <>
                    <Text style={styles.days}>Started {days} {(days == 1) ? "day" : "days"} ago</Text>
                    <View style={styles.inProgress}>
                        <Text style={styles.inProgressText}>In Progress</Text>
                    </View>
                </> : null}

                {dead ?
                <TouchableHighlight onPress={() => console.log("Repost Button Pressed")} underlayColor={"#fff"}>
                    <View style={styles.repost}>
                        <Text style={styles.repostText}>Repost</Text>
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