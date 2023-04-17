import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { AppButton } from './AppButton';
import { AppText } from './AppText';
import { COLORS } from '../../constants';

interface NoJobProps {
  title: string;
  body: string;
  buttonName?: string;
  onButtonClick?: () => void;
  buttonIcon?: React.ReactElement;
  errorImageType: React.ReactElement;
}

export const NoJobs = ({
  title,
  body,
  buttonName,
  onButtonClick,
  buttonIcon,
  errorImageType,
}: NoJobProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{errorImageType}</View>

      <AppText style={styles.heading}>{title}</AppText>

      <AppText style={[styles.body]}>{body}</AppText>

      <View style={styles.buttonContainer}>
        {buttonName ? (
          <AppButton
            style={styles.button}
            textStyle={styles.buttonText}
            type="primary"
            title={buttonName}
            icon={buttonIcon}
            onPress={onButtonClick}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    width: 300,
    alignItems: 'center',
    backgroundColor: 'transparent',
    display: 'flex',
    alignSelf: 'center',
  },

  icon: {
    height: 72,
    width: 75,
    paddingBottom: 100,
  },

  body: {
    fontSize: 16,
    textAlign: 'left',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingBottom: 10,
  },

  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },

  button: {
    width: 'auto',
    backgroundColor: 'transparent',
    textAlign: 'left',
    elevation: 0,
  },

  buttonText: {
    color: COLORS.blue,
    fontSize: 16,
  },
});
