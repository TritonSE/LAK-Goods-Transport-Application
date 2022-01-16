import { StyleSheet, Text, View, Button, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../constants';

type PrimaryButtonProps = {
    onPress?: () => void,
    title: string,
    style?: StyleProp<ViewStyle>,
    type?: "link"| "default"
}

export default function PrimaryButton({title, style, onPress, type}: PrimaryButtonProps) {
    let buttonStyle;
    if (type && type === "link") buttonStyle = {...linkStyle};
    else buttonStyle = defaultStyle;

    return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[buttonStyle.container, style]}>
        <Text style={buttonStyle.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const defaultStyle = StyleSheet.create({
    container: {
        width: "80%",
        height: '42px',
        elevation: 8,
        backgroundColor: COLORS.maroon,
        padding: '10px'
    },
    text: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.white,
        alignSelf: "center",
    },
})

const linkStyle = StyleSheet.create({
    container: {},
    text: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 16,
        color: COLORS.turquoise,
        alignSelf: "center", 
    }
})