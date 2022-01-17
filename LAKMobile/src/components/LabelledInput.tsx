import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';

type LabelledInputProps = {
    label: string,
    children?: ReactNode,
    style?: StyleProp<ViewStyle>,
}

export default function LabelledInput({label, children, style}: LabelledInputProps) {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    label: {
        marginBottom: 4,
    },
})
