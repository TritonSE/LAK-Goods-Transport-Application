import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { AppButton } from './AppButton';
import { AppText } from './AppText';
import { COLORS } from '../../constants';
import { IconButtonWrapper } from '../components';
import { NoAvailableJobsIcon, NoJobsIcon, NoMatchingJobsIcon, PlusSignIcon } from '../icons';
import { ProfileButtonIcon } from '../icons/ProfileButtonIcon';

interface NoJobProps {
  // type?: 'noAvailableJobs' | 'noJobs' | 'noMatchingJobs';
  title: string;
  body: string;
  buttonName?: string;
  buttonVisible: boolean;
  onButtonClick: () => void;
  iconType?: React.ReactElement;
  errorImageType: React.ReactElement;
}

export const NoJobs = ({
  title,
  body,
  buttonName,
  buttonVisible,
  onButtonClick,
  iconType,
  errorImageType,
}: NoJobProps) => {
  // let displayIcon;
  // switch (type) {
  //     case 'noAvailableJobs':
  //         displayIcon = <NoAvailableJobsIcon />;

  //     case 'noJobs':
  //         displayIcon = <NoJobsIcon />;
  //         console.log("in the case sqitch");
  //     default:
  //         displayIcon = <NoMatchingJobsIcon />;
  // }
  return (
    <View style={styles.container}>
      {/* icon stuff here */}
      <View style={styles.icon}>{errorImageType}</View>

      <AppText style={styles.heading}>{title}</AppText>

      <AppText style={[styles.body]}>{body}</AppText>

      <View style={styles.buttonContainer}>
        {buttonVisible && buttonName ? (
          <AppButton
            style={styles.button}
            textStyle={styles.buttonText}
            type="primary"
            title={buttonName}
            icon={iconType}
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

    // alignSelf: "start"
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
