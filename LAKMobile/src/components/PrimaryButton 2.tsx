
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import AppText from './AppText';
import { COLORS } from '../../constants';

type PrimaryButtonProps = {
    type?: "link"| "primary" | "default",
    onPress?: () => void,
    title: string,
    style?: StyleProp<ViewStyle>,
}

export default function PrimaryButton({title, style, onPress, type}: PrimaryButtonProps) {
    let buttonStyle;

    if (type && type in buttonStyleMap) buttonStyle = buttonStyleMap[type];
    else buttonStyle = buttonStyleMap['default'];
    
    return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[buttonStyle.container, style]}>
        <AppText style={buttonStyle.text}>{title}</AppText>
    </TouchableOpacity>
  )
}


// Button Styling
const defaultStyle = StyleSheet.create({
    container: {
        // Shared
        width: "80%",
        height: 42,
        padding: 10,
        elevation: 8,

        backgroundColor: COLORS.white,
    },
    text: {
        // Shared
        fontWeight: "bold",
        alignSelf: "center",

        color: COLORS.maroon
    },
});

const primaryStyle = StyleSheet.create({
    container: {
        // Shared
        width: "80%",
        height: 42,
        padding: 10,

        backgroundColor: COLORS.maroon,
    },
    text: {
        //Shared
        fontWeight: "bold",
        alignSelf: "center",

        color: COLORS.white,
    }
});

const linkStyle = StyleSheet.create({
    container: {
        elevation: 8,
    },
    text: {
        // Shared
        fontWeight: "bold",
        alignSelf: "center", 

        color: COLORS.turquoise,
    }
});

const buttonStyleMap = {
    link: linkStyle,
    primary: primaryStyle,
    default: defaultStyle,
}