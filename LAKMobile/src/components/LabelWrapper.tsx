import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';

type LabelWrapperProps = {
  label: string;
  children?: ReactNode;
};

export function LabelWrapper({ label, children }: LabelWrapperProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
});
