import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
<<<<<<< HEAD
import AppText from './AppText';
=======
import { AppText } from './AppText';
>>>>>>> main

type LabelWrapperProps = {
    label: string,
    children?: ReactNode,
}

export function LabelWrapper({label, children}: LabelWrapperProps) {
  return (
    <View style={styles.container}>
        <AppText style={styles.label}>{label}</AppText>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    label: {
        marginBottom: 8,
<<<<<<< HEAD
=======
        fontSize: 16
>>>>>>> main
    },
})
