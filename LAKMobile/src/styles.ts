// All common styles should go here

import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const PickerStyles = StyleSheet.create({
    wrapper: {
        borderColor: COLORS.mediumGrey,
        borderWidth: 1,
        width: 200,
        borderRadius: 4
    },
})

export const FlatListStyles = StyleSheet.create({
    wrapper: {
        width: '100%', 
        paddingHorizontal: 30, 
        marginBottom: 10,
        height: '100%'
    },
    container: {
        width: '100%', 
        marginBottom: 10 // Added to allow scrolling until end of list
    },
    contentContainer: {
        width: '100%',
    }
})