import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { UserData } from '../api/data';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { COLORS } from '../../constants';
import { ConfirmationBox } from './ConfirmationBox';

// states 'Accepted' will not be used because page changes to tracking once an applicant is accepted
interface ApplicantThumbnailProps {
  applicantData: UserData;
  status: 'Accepted' | 'Denied' | 'Unassigned';
  style?: StyleProp<ViewStyle>;
  onAccept: () => void;
  onDeny: () => void;
}

export function ApplicantThumbnail({
  applicantData,
  status,
  style,
  onAccept,
  onDeny,
}: ApplicantThumbnailProps) {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  return (
    <View style={[ThumbailStyles.container, style]}>
      <AppText style={[ThumbailStyles.nameFont, ThumbailStyles.containerItem]}>
        {applicantData.firstName} {applicantData.lastName}
      </AppText>
      <AppText style={[ThumbailStyles.phoneFont, ThumbailStyles.containerItem]}>
        {applicantData.phone}
      </AppText>
      <AppText style={ThumbailStyles.containerItem}>
        {applicantData?.vehicleData?.vehicleType}
      </AppText>

      <View
        style={[
          ThumbailStyles.flex,
          status == 'Accepted' ? { justifyContent: 'space-between' } : null,
        ]}
      >
        {status == 'Unassigned' && (
          <AppButton
            type="tertiary"
            size="small"
            title="Deny"
            onPress={onDeny}
            style={ThumbailStyles.flexItem}
          />
        )}
        {status == 'Unassigned' && (
          <AppButton
            type="tertiary"
            size="small"
            title="Accept"
            onPress={() => setConfirmationVisible(true)}
            style={ThumbailStyles.flexItem}
            textStyle={{ color: COLORS.turquoise }}
          />
        )}
        {status == 'Accepted' && (
          <AppText style={[{ color: COLORS.deepGreen }, ThumbailStyles.flexItem]}>Accepted</AppText>
        )}
        {status == 'Accepted' && (
          <AppButton type="tertiary" size="medium" title="Cancel Applicant" />
        )}
        {status == 'Denied' && <AppText style={{ color: COLORS.red }}>Denied</AppText>}
      </View>

      {confirmationVisible ? (
        <ConfirmationBox
          rejectVisible={true}
          checkMarkAppear={true}
          title={'Assign driver?'}
          body={`Do you want to assign driver ${applicantData.firstName} ${applicantData.lastName} to the job? If you want to change the driver later, you will have to cancel and repost this job.`}
          acceptName={'Yes, Assign'}
          rejectName={'Cancel'}
          onAccept={onAccept}
          onReject={() => setConfirmationVisible(false)}
        />
      ) : null}
    </View>
  );
}

const ThumbailStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 27,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.5,
  },
  containerItem: {
    marginBottom: 16,
  },
  nameFont: {
    fontWeight: 'bold',
  },
  phoneFont: {
    color: '#335BC2',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexItem: {
    marginRight: 30,
  },
});
