import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface HeaderProps {
    children?: string,
    showArrow?: boolean
}

export default function ScreenHeader({children, showArrow = false}:HeaderProps) {
    return(
        <View style={styles.header}>
            <View style={styles.headerContent}>
                {(showArrow) ? <Image style={styles.headerArrow} source={require('../../assets/header-arrow.png')} /> : null}
                <Text style={styles.headerText}>{children}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#94100C",
        height: 95,
        paddingLeft: 30,
        paddingBottom: 15
    },

    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },

    headerText: {
        color: "white",
        fontSize: 30,
        fontWeight: "700"
    },

    headerArrow: {
        height: 20,
        width: 10,
        marginRight: 25
    }
});