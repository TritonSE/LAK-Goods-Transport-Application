import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, TextInputComponent, StyleProp, ViewStyle } from 'react-native';

type LabelledInputProps = {
    label: string,
    children?: ReactNode,
    style?: StyleProp<ViewStyle>,
}

export default function LabelledInput({label, children, style}: LabelledInputProps) {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <View style={style}>{children}</View>
    </View>
  )
}

const colors = {
    white: "#ffffff",
    maroon: "#94100C"
}

const styles = StyleSheet.create({
    container: {
    },
    label: {
        paddingBottom: '7px'
    },
})
