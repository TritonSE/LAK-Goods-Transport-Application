import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

interface InfoBoxProps {
  text: string;
  buttonText?: string;
  onPress?: () => void;
}
export function InfoBox({ text, buttonText, onPress }: InfoBoxProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>{text}</AppText>
      {buttonText && (
        <AppButton
          style={styles.button}
          textStyle={styles.text}
          type="secondary"
          title={buttonText}
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5C7C5',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    width: 'auto',
    height: 'auto',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
