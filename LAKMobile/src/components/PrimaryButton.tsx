import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

type PrimaryButtonProps = {
    onPress: () => void,
    title: string,
    color: string,
}

export default function PrimaryButton({title, color, onPress}: PrimaryButtonProps) {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        elevation: 8,
        backgroundColor: COLORS.maroon, //TODO: Should be from prop
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    text: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.white,
        alignSelf: "center",
    },
})
