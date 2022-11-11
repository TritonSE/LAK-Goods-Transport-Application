import React, { PropsWithChildren } from 'react';
import { GestureResponderEvent, StyleSheet, View, Image, ImageSourcePropType, TouchableOpacity, TouchableHighlight, StyleProp, ViewStyle, Button, ButtonProps, TouchableOpacityProps } from 'react-native';

import { COLORS } from '../../constants';
import { JobData, JobOwnerView, JobStatus } from '../api/data';
import { EditIcon, PhoneIcon } from '../icons';
import { imageIdToSource } from '../api';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { useNavigation } from '@react-navigation/native';

/**
 * Button Wrapper
 */
type ButtonWrapperProps = PropsWithChildren<TouchableOpacityProps> & {
    style?: StyleProp<ViewStyle>;
}
function ButtonWrapper({ onPress, style, children }: ButtonWrapperProps) {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            {children}
        </TouchableOpacity>
    )
}

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
        fontWeight: 'bold'
    }
})
function StatusIndicator({text, color}: StatusIndicatorProps) {
    return (
        <View style={[StatusIndicatorStyles.container, {backgroundColor: color}]}>
            <AppText style={StatusIndicatorStyles.text}>{text}</AppText>
        </View>
    )
}

/**
 * Helpers
 */
const getDisplayImage = (job: JobData): ImageSourcePropType => {
    const imageId = job.imageIds[0];
    return imageIdToSource(imageId);
}

const diffDatesInDays = (start: Date, end: Date) => {
    let diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    return diff < 0 ? 0 : Math.round(diff);
}

/**
 * Job thumbnail component
 * Note: Display of the component varies based on whether the owner or an applicant views it which is why different type of props for the two cases
 */

interface JobThumbnailOwnerViewProps {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    onEdit: ((event: GestureResponderEvent) => void) | undefined;
    isJobOwner: true;
    job: JobOwnerView;
    repostAllowed?: boolean;
}

interface JobThumbnailApplicantViewProps {
    isJobOwner: false;
    job: JobData;
    appliedDate: Date;
    applicantStatus: 'Applied' | 'Accepted' | 'Denied';
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
    'Finished': '#E8E8E8',
    'Accepted': '#BCF19C',
    'Denied': '#DA5C5C',
    'Not Started': null,
    'Applied': null,
}

const JOB_DISPLAY_STATUS_MAP: Record<JobStatus, DisplayStatus> = {
    'CREATED': 'Not Started',
    'ASSIGNED': 'In Progress',
    'COMPLETED': 'Finished'
} // Mapping between job status from backend to frontend

export function JobThumbnail({isJobOwner, job, ...props}: JobThumbnailProps) {
    let displayStatus: DisplayStatus, daysAgo, numApplicants;
    const navigation = useNavigation();

    if (isJobOwner) {
        props = props as JobThumbnailOwnerViewProps;
        displayStatus = JOB_DISPLAY_STATUS_MAP[job.status];
        daysAgo = diffDatesInDays(new Date(job.startDate), new Date());
        numApplicants = job.applicants.length;

    } else {
        props = props as JobThumbnailApplicantViewProps;
        displayStatus = props.applicantStatus;
        daysAgo = diffDatesInDays(props.appliedDate as Date, new Date());
    }
    
    const statusDisplayColor = displayStatus && STATUS_DISPLAY_COLOR[displayStatus];

    return (
        <TouchableOpacity onPress={(props as JobThumbnailOwnerViewProps).onPress}>

        <View style={CardStyles.card}>
            <View style={[CardStyles.row, CardStyles.header]}>
                <AppText style={CardStyles.title}>Box of apples</AppText>
            </View>
            
            {isJobOwner && numApplicants == 0 && (
                <ButtonWrapper style={JobThumbnailStyles.editButton} onPress={(props as JobThumbnailOwnerViewProps).onEdit}>
                    <EditIcon />
                </ButtonWrapper>
            )}

            <Image style={JobThumbnailStyles.jobImage} source={getDisplayImage(job)}/>
            <View style={[CardStyles.row]}>
                {statusDisplayColor && <StatusIndicator text={displayStatus} color={statusDisplayColor} /> }
                { displayStatus === 'In Progress' && daysAgo != null && <AppText style={[JobThumbnailStyles.daysText, {marginLeft: 10}]}>Started {daysAgo} {(daysAgo == 1) ? "day" : "days"} ago</AppText>}
                { displayStatus === 'Applied' && daysAgo != null && <AppText style={JobThumbnailStyles.daysText}>Applied {daysAgo} {(daysAgo == 1) ? "day" : "days"} ago</AppText>}
                { displayStatus === 'Not Started' && isJobOwner && <AppText style={JobThumbnailStyles.ownerApplicantsText}>{numApplicants} {(numApplicants == 1) ? "applicant" : "applicants"}</AppText>}
                { displayStatus === 'Not Started' && !isJobOwner && <AppText style={JobThumbnailStyles.clientApplicantsText}>{numApplicants} {(numApplicants == 1) ? "person has" : "people have"} applied</AppText>}
            </View>
            <View>
                <AppText style={JobThumbnailStyles.bodyText}><AppText style={JobThumbnailStyles.bodyHeading}>Deliver by: </AppText>{job.deliveryDate}</AppText>
                <AppText style={JobThumbnailStyles.bodyText}><AppText style={JobThumbnailStyles.bodyHeading}>Pick-up: </AppText>{job.pickupLocation}</AppText>
                <AppText style={JobThumbnailStyles.bodyText}><AppText style={JobThumbnailStyles.bodyHeading}>Drop-off: </AppText>{job.dropoffLocation}</AppText>
                { job.packageQuantity && <AppText style={JobThumbnailStyles.bodyText}><AppText style={JobThumbnailStyles.bodyHeading}>Package Quantity: </AppText>{job.packageQuantity}</AppText>}
            </View>
            
            <View style={[CardStyles.row, CardStyles.footer]}>
                {
                    !isJobOwner &&
                    <ButtonWrapper style={JobThumbnailStyles.rowFlexBox} onPress={() => console.log('Call client button pressed')}>
                        <PhoneIcon />
                        <AppText style={[JobThumbnailStyles.callClientText, { marginLeft: 5}]}>Call {job.clientName}</AppText>
                    </ButtonWrapper>
                }
                <View style={JobThumbnailStyles.flexSpacer} />
                {
                    isJobOwner &&
                    (props as JobThumbnailOwnerViewProps).repostAllowed &&  
                    <AppButton title='Repost' type='tertiary' size='small' onPress={() => console.log('Job attempted to repost')}/>
                }   
            </View>
            

        </View>
        </TouchableOpacity>
    )
}

const CardStyles = StyleSheet.create({
    card: {
        padding: 13,
        backgroundColor: COLORS.white,

        margin: 10,

        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 7
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 7,
        padding: 0,
        alignItems: 'center'
    },

    header: {
        justifyContent: 'space-between',
        marginBottom: 7,
    },

    footer: {
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 0
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
    }
})

const JobThumbnailStyles = StyleSheet.create({
    bodyText: {
        fontSize: 12,
    },
    bodyHeading: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    daysText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#DA5C5C',
    },
    editButton: {
        position: 'absolute',
        top: 13,
        right: 88
    },
    jobImage: {
        position: 'absolute',
        top: 13,
        right: 13,
        height: 65,
        width: 65
    },
    ownerApplicantsText: {
        fontSize: 12,
        color: '#3A9A89',
        fontWeight: 'bold'
    },
    clientApplicantsText: {
        fontSize: 12,
        color: '#8B8B8B'
    },
    callClientText: {
        fontSize: 12,
        color: '#335BC2',
        fontWeight: 'bold',
    },
    rowFlexBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexSpacer: {
        flexGrow: 1
    }
})