import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AppText } from './AppText';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    children?: string,
    showArrow?: boolean
}

export function ScreenHeader({children, showArrow = false}: HeaderProps) {
    const navigation = useNavigation();
    return<View style={styles.header}>
        <View style={styles.headerContent}>

            {showArrow ?
                <TouchableOpacity onPress={(e) => navigation.goBack()}>
                    <Image style={styles.headerArrow} source={require('../../assets/header-arrow.png')} />
                </TouchableOpacity>
            : null}

            <AppText style={styles.headerText}>{children}</AppText>
        </View>
    </View>
}

const styles = StyleSheet.create({
    header: {
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: COLORS.maroon,
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