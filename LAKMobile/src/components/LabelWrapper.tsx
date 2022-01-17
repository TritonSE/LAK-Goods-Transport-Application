import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';

type LabelWrapperProps = {
    label: string,
    children?: ReactNode,
}

export default function LabelWrapper({label, children}: LabelWrapperProps) {
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
