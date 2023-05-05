import React, { useState, useEffect, useContext } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { AppButton, AppText, ImageCarousel, ScreenHeader } from '../components';
import { DriverApplyScreenProps } from '../types/navigation';
import { ConfirmationBox } from '../components/ConfirmationBox';
import {
  applyJob,
  completeJob,
  getDriverVerificationStatus,
  getJobApplicantStatus,
  getUser,
} from '../api';
import { AuthContext } from '../context/AuthContext';
import { InfoBox } from '../components/InfoBox';

export function DriverApplyScreen({ navigation, route }: DriverApplyScreenProps) {
  const jobData = route.params.jobData;
  const carousel = <ImageCarousel imageIds={route.params.jobData.imageIds} />;
  const [applyConfirmationVisible, setApplyConfirmationVisible] = useState(false);
  const [completeConfirmationVisible, setCompleteConfirmationVisible] = useState(false);
  const [applyEnabled, setApplyEnabled] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user === null) {
      navigation.navigate('Login');
    }
  }, [auth, navigation]);

  const userId = auth.user ? auth.user.uid : '';

  useEffect(() => {
    getUser(userId, userId).then((user) => {
      if (user) {
        const driverVerificationStatus = getDriverVerificationStatus(user);
        if (driverVerificationStatus === 'Verified' && applicantStatus === 'Not Started') {
          setApplyEnabled(true);
        }
      }
    });
  }, [navigation, userId]);

  const applicantStatus = getJobApplicantStatus(jobData, userId);

  return (
    <>
      <ScreenHeader showArrow={true} />
      {carousel}
      <ScrollView nestedScrollEnabled={true} style={styles.detailsComponent}>
        {applicantStatus === 'Accepted' && (
          <InfoBox
            text={'Alert customer that package is delivered.'}
            buttonText={'Mark as delivered'}
            onPress={() => setCompleteConfirmationVisible(true)}
          />
        )}
        <AppText style={styles.jobText}>{jobData.title}</AppText>

        <View style={styles.fieldContainer}>
          <AppText style={{ fontWeight: 'bold' }}>Pick-up:</AppText>
          <AppText>{jobData.pickupLocation}</AppText>
        </View>
        <View style={styles.fieldContainer}>
          <AppText style={{ fontWeight: 'bold' }}>Drop-off:</AppText>
          <AppText>{jobData.dropoffLocation}</AppText>
        </View>
        <View style={styles.fieldContainer}>
          <AppText style={{ fontWeight: 'bold' }}>Deliver by date:</AppText>
          <AppText>{jobData.deliveryDate}</AppText>
        </View>
        {jobData.packageQuantity ? (
          <View style={styles.fieldContainer}>
            <AppText>
              <AppText style={{ fontWeight: 'bold' }}>Package Quantity:</AppText>{' '}
              {jobData?.packageQuantity}
            </AppText>
          </View>
        ) : null}
        {jobData.price ? (
          <View style={styles.fieldContainer}>
            <AppText>
              <AppText style={{ fontWeight: 'bold' }}>Delivery Price:</AppText> {jobData?.price}
            </AppText>
          </View>
        ) : null}
        {jobData.description ? (
          <View style={styles.fieldContainer}>
            <AppText style={{ fontWeight: 'bold' }}>Description:</AppText>
            <AppText>{jobData.description}</AppText>
          </View>
        ) : null}

        <View style={styles.fieldContainer}>
          <AppText style={{ fontWeight: 'bold' }}>Contacts:</AppText>
          <AppText>Sender: {jobData.clientName}</AppText>
          <AppText
            onPress={() => {
              Linking.openURL('tel:' + jobData.phoneNumber);
            }}
            style={styles.phoneNumber}
          >
            {jobData.phoneNumber}
          </AppText>
          {jobData.receiverName ? <AppText>Receiver: {jobData.receiverName} </AppText> : null}
          {jobData.receiverPhoneNumber ? (
            <AppText
              onPress={() => {
                Linking.openURL('tel:' + jobData.receiverPhoneNumber);
              }}
              style={styles.phoneNumber}
            >
              {jobData.receiverPhoneNumber}
            </AppText>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          type={applyEnabled ? 'primary' : 'disabled'}
          title="Apply to Job"
          onPress={() => setApplyConfirmationVisible(true)}
          style={styles.footerButton}
        />
      </View>
      {applyConfirmationVisible ? (
        <ConfirmationBox
          rejectVisible={true}
          checkMarkAppear={true}
          title={'Apply to job?'}
          body={`Be sure to contact ${jobData.clientName} at ${jobData.phoneNumber}`}
          acceptName={'Apply'}
          rejectName={'Cancel'}
          onAccept={async () => {
            await applyJob(userId, jobData._id);
          }}
          onReject={() => setApplyConfirmationVisible(false)}
        />
      ) : null}
      {completeConfirmationVisible ? (
        <ConfirmationBox
          rejectVisible={true}
          checkMarkAppear={true}
          title={'Mark as delivered?'}
          body={`This job will be considered as finished. You can find it in your "Finished Jobs."`}
          acceptName={'Confirm'}
          rejectName={'Back'}
          onAccept={async () => await completeJob(userId, jobData._id)}
          onReject={() => setCompleteConfirmationVisible(false)}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  detailsComponent: {
    paddingLeft: 30,
    paddingRight: 30,
  },

  jobText: {
    marginTop: 20,
    fontFamily: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    color: '#94100C',
  },

  fieldContainer: {
    marginTop: 20,
  },

  phoneNumber: {
    color: 'blue',
  },

  footerButton: {
    marginBottom: 15,
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    bottom: 0,
  },
});
