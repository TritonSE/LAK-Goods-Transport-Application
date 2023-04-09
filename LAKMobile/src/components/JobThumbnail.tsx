import React, { useContext, useEffect } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

import { COLORS } from '../../constants';
import { JobData, JobOwnerView, JobStatus } from '../api/data';
import { EditIcon, PhoneIcon } from '../icons';
import { imageIdToSource } from '../api';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { IconButtonWrapper } from './IconButtonWrapper';
import { AuthContext } from '../context/AuthContext';
/**
 * Status Indicator
 */
interface StatusIndicatorProps {
  text: string;
  color: string;
}
const StatusIndicatorStyles = StyleSheet.create({
  container: {
    width: 76,
    height: 20,
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
function StatusIndicator({ text, color }: StatusIndicatorProps) {
  return (
    <View style={[StatusIndicatorStyles.container, { backgroundColor: color }]}>
      <AppText style={StatusIndicatorStyles.text}>{text}</AppText>
    </View>
  );
}

/**
 * Helpers
 */
const getDisplayImage = (job: JobData): ImageSourcePropType => {
  const imageId = job.imageIds[0];
  return imageIdToSource(imageId);
};

const diffDatesInDays = (start: Date, end: Date) => {
  const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
  return diff < 0 ? 0 : Math.round(diff);
};

/**
 * Job thumbnail component
 * Note: Display of the component varies based on whether the owner or an applicant views it which is why different type of props for the two cases
 */

interface JobThumbnailOwnerViewProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  onEdit: ((event: GestureResponderEvent) => void) | undefined;
  onRepost?: () => void;
  isJobOwner: true;
  job: JobOwnerView;
  repostAllowed?: boolean;
}

interface JobThumbnailApplicantViewProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  isJobOwner: false;
  job: JobOwnerView;
  applicantStatus: 'Not Started' | 'Applied' | 'Accepted' | 'Denied' | 'Finished';
}

type JobThumbnailProps = JobThumbnailOwnerViewProps | JobThumbnailApplicantViewProps;

/**
 * Not all the display status will be used in one view (owner or applicant).
 * Here is the flow of status in respective views
 *
 * Owner View
 * Not Started -> In Progress -> Finished
 *
 * Applicant View
 * Not Started | Applied | Accepted/Denied | Finished
 */
type DisplayStatus = 'In Progress' | 'Finished' | 'Accepted' | 'Denied' | 'Not Started' | 'Applied';

const STATUS_DISPLAY_COLOR: Record<DisplayStatus, string | null> = {
  'In Progress': '#FFE587',
  Finished: '#E8E8E8',
  Accepted: '#BCF19C',
  Denied: '#DA5C5C',
  'Not Started': null,
  Applied: null,
};

const JOB_DISPLAY_STATUS_MAP: Record<JobStatus, DisplayStatus> = {
  CREATED: 'Not Started',
  ASSIGNED: 'In Progress',
  COMPLETED: 'Finished',
}; // Mapping between job status from backend to frontend

export function JobThumbnail({ isJobOwner, job, ...props }: JobThumbnailProps) {
  let displayStatus: DisplayStatus, daysAgo;
  const numApplicants = job.applicants ? job.applicants.length : 0;

  const auth = useContext(AuthContext);

  const userId = auth.user ? auth.user.uid : '';

  if (isJobOwner) {
    props = props as JobThumbnailOwnerViewProps;
    displayStatus = JOB_DISPLAY_STATUS_MAP[job.status];
    daysAgo = diffDatesInDays(new Date(job.startDate), new Date());
  } else {
    props = props as JobThumbnailApplicantViewProps;
    displayStatus = props.applicantStatus;
    if (displayStatus === 'Applied') {
      const application = job.applicants.find((applicant) => userId === applicant.userId);
      if (application) {
        daysAgo = diffDatesInDays(new Date(application.applyDate), new Date());
      }
    }
  }

  const statusDisplayColor = displayStatus && STATUS_DISPLAY_COLOR[displayStatus];

  return (
    <TouchableOpacity onPress={(props as JobThumbnailOwnerViewProps).onPress}>
      <View style={CardStyles.card}>
        <View style={[CardStyles.row, CardStyles.header]}>
          <AppText style={CardStyles.title}>{job.title}</AppText>
        </View>

        {isJobOwner && numApplicants == 0 && (
          <IconButtonWrapper
            style={JobThumbnailStyles.editButton}
            onPress={(props as JobThumbnailOwnerViewProps).onEdit}
          >
            <EditIcon />
          </IconButtonWrapper>
        )}

        <Image style={JobThumbnailStyles.jobImage} source={getDisplayImage(job)} />
        <View style={[CardStyles.row]}>
          {statusDisplayColor && (
            <StatusIndicator text={displayStatus} color={statusDisplayColor} />
          )}
          {displayStatus === 'In Progress' && daysAgo != null && (
            <AppText style={[JobThumbnailStyles.daysText, { marginLeft: 10 }]}>
              Started {daysAgo} {daysAgo == 1 ? 'day' : 'days'} ago
            </AppText>
          )}
          {displayStatus === 'Applied' && daysAgo != null && (
            <AppText style={JobThumbnailStyles.appliedDaysText}>
              {daysAgo === 0
                ? 'Applied today'
                : `Applied ${daysAgo} ${daysAgo == 1 ? 'day' : 'days'} ago`}
            </AppText>
          )}
          {displayStatus === 'Not Started' && isJobOwner && (
            <AppText style={JobThumbnailStyles.ownerApplicantsText}>
              {numApplicants} {numApplicants == 1 ? 'applicant' : 'applicants'}
            </AppText>
          )}
          {displayStatus === 'Not Started' && !isJobOwner && (
            <AppText style={JobThumbnailStyles.clientApplicantsText}>
              {numApplicants} {numApplicants == 1 ? 'person has' : 'people have'} applied
            </AppText>
          )}
        </View>
        <View>
          <AppText style={JobThumbnailStyles.bodyText}>
            <AppText style={JobThumbnailStyles.bodyHeading}>Deliver by: </AppText>
            {job.deliveryDate}
          </AppText>
          <AppText style={JobThumbnailStyles.bodyText}>
            <AppText style={JobThumbnailStyles.bodyHeading}>Pick-up: </AppText>
            {job.pickupLocation}
          </AppText>
          <AppText style={JobThumbnailStyles.bodyText}>
            <AppText style={JobThumbnailStyles.bodyHeading}>Drop-off: </AppText>
            {job.dropoffLocation}
          </AppText>
          {job.packageQuantity ? (
            <AppText style={JobThumbnailStyles.bodyText}>
              <AppText style={JobThumbnailStyles.bodyHeading}>Package Quantity: </AppText>
              {job.packageQuantity}
            </AppText>
          ) : null}
        </View>

        <View style={[CardStyles.row, CardStyles.footer]}>
          {!isJobOwner && (
            <IconButtonWrapper
              style={JobThumbnailStyles.rowFlexBox}
              onPress={() => console.log('Call client button pressed')}
            >
              <PhoneIcon />
              <AppText style={[JobThumbnailStyles.callClientText, { marginLeft: 5 }]}>
                Call {job.clientName}
              </AppText>
            </IconButtonWrapper>
          )}
          <View style={JobThumbnailStyles.flexSpacer} />
          {isJobOwner && (props as JobThumbnailOwnerViewProps).repostAllowed && (
            <AppButton
              title="Repost"
              type="tertiary"
              size="small"
              onPress={(props as JobThumbnailOwnerViewProps).onRepost}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const CardStyles = StyleSheet.create({
  card: {
    padding: 13,
    backgroundColor: COLORS.white,

    margin: 10,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 7,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 7,
    padding: 0,
    alignItems: 'center',
  },

  header: {
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  footer: {
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 0,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const JobThumbnailStyles = StyleSheet.create({
  bodyText: {
    fontSize: 12,
  },
  bodyHeading: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  daysText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DA5C5C',
  },
  appliedDaysText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3A9A89',
  },
  editButton: {
    position: 'absolute',
    top: 13,
    right: 88,
  },
  jobImage: {
    position: 'absolute',
    top: 13,
    right: 13,
    height: 65,
    width: 65,
  },
  ownerApplicantsText: {
    fontSize: 12,
    color: '#3A9A89',
    fontWeight: 'bold',
  },
  clientApplicantsText: {
    fontSize: 12,
    color: '#8B8B8B',
  },
  callClientText: {
    fontSize: 12,
    color: '#335BC2',
    fontWeight: 'bold',
  },
  rowFlexBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexSpacer: {
    flexGrow: 1,
  },
});
