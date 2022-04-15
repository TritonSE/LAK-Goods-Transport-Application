
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { AppText } from './AppText';
import { COLORS } from '../../constants';

// Common styling
const COMMON_STYLE = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

// Button Styling (By Colors)
const primaryStyle = StyleSheet.create({
    container: {
        backgroundColor: COLORS.maroon,
    },
    text: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: COLORS.white
    }
});

const secondaryStyle = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white
    },
    text: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: COLORS.maroon
    }
})

const tertiaryStyle = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 4
    },
    text: {
        alignSelf: 'center',
        color: COLORS.maroon,
    }
})

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

// Styles by size
const largeStyle = StyleSheet.create({
    container: {
        width: '80%',
        height: 42,
        elevation: 8
    },
    text: {
        fontSize: 18
    }
});
const mediumStyle = StyleSheet.create({
    container: {
        width: '40%',
        height: 34,
        elevation: 8
    },
    text: {
        fontSize: 14
    }
})
const smallStyle = StyleSheet.create({
    container: {
        width: '30%',
        height: 34,
        elevation: 5
    },
    text: {
        fontSize: 14
    }
})

// const defaultStyle = StyleSheet.create({
//     container: {
//         // Shared
//         width: "80%",
//         height: 42,
//         padding: 10,
//         elevation: 8,

//         backgroundColor: COLORS.white,
//     },
//     text: {
//         // Shared
//         fontWeight: "bold",
//         alignSelf: "center",

//         color: COLORS.maroon
//     },
// });

// const primaryStyle = StyleSheet.create({
//     container: {
//         // Shared
//         width: "80%",
//         height: 42,
//         padding: 10,

//         backgroundColor: COLORS.maroon,
//     },
//     text: {
//         //Shared
//         fontWeight: "bold",
//         alignSelf: "center",

//         color: COLORS.white,
//     }
// });

// const linkStyle = StyleSheet.create({
//     container: {
//         elevation: 8,
//     },
//     text: {
//         // Shared
//         fontWeight: "bold",
//         alignSelf: "center", 

//         color: COLORS.turquoise,
//     }
// });


const TYPE_STYLE_MAP = {
    link: linkStyle,
    primary: primaryStyle,
    secondary: secondaryStyle,
    tertiary: tertiaryStyle
}

const SIZE_STYLE_MAP = {
    large: largeStyle,
    medium: mediumStyle,
    small: smallStyle
}

type AppButtonProps = {
    type?: 'link' | 'primary' | 'secondary' | 'tertiary',
    size?: 'large' | 'medium' | 'small',
    onPress?: () => void,
    title: string,
    style?: StyleProp<ViewStyle>,
}

export function AppButton({title, size, style, onPress, type}: AppButtonProps) {
    if (!type || !(type in TYPE_STYLE_MAP)) type = 'secondary';
    if (type != 'link' && (!size || !(size in SIZE_STYLE_MAP))) size = 'large';

    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[COMMON_STYLE.container, TYPE_STYLE_MAP[type].container, size && SIZE_STYLE_MAP[size].container, style]}>
            <AppText style={[TYPE_STYLE_MAP[type].text, size && SIZE_STYLE_MAP[size].text]}>{title}</AppText>
        </TouchableOpacity>
    )
}