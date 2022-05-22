import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, TouchableOpacity, TouchableHighlight, StyleProp, ViewStyle, Button, ButtonProps, TouchableOpacityProps } from 'react-native';

import { AppText, AppButton } from '../components';
import { COLORS } from '../../constants';
import { JobData } from '../api/data';
import { EditIcon, PhoneIcon } from '../icons';
import { imageIdToSource } from '../api';

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

const getDisplayImage = (job: JobData): ImageSourcePropType => {
    const imageId = job.imageIds[0] || '6230818f1ccd9cfc10ffcbde';
    return imageIdToSource(imageId);
}

/**
 * Job thumbnail component
 */
interface JobThumbnailProps {
    job: JobData;
    displayStatus: 'In Progress' | 'Finished' | 'Accepted' | 'Denied' | 'Not Started' | 'Applied',
    isJobOwner?: boolean;
    daysAgo?: number;
    repostAllowed?: boolean;
}
const STATUS_DISPLAY_COLOR = {
    'In Progress': '#FFE587',
    'Finished': '#E8E8E8',
    'Accepted': '#BCF19C',
    'Denied': '#DA5C5C',
    'Not Started': null,
    'Applied': null,
}

export function JobThumbnail({job, displayStatus, isJobOwner, daysAgo, repostAllowed}: JobThumbnailProps) {
    // Just returning null if you try to have no status
    if (!job.status) return null;

    const statusDisplayColor = STATUS_DISPLAY_COLOR[displayStatus];

    return (
        <View style={CardStyles.card}>
            <View style={[CardStyles.row, CardStyles.header]}>
                <AppText style={CardStyles.title}>Box of apples</AppText>
            </View>
            
            <ButtonWrapper style={JobThumbnailStyles.editButton} onPress={() => console.log("Edit Button Pressed")}>
                <EditIcon />
            </ButtonWrapper>

            <Image style={JobThumbnailStyles.jobImage} source={getDisplayImage(job)}/>
            <View style={[CardStyles.row]}>
                {statusDisplayColor && <StatusIndicator text={displayStatus} color={statusDisplayColor} /> }
                { displayStatus === 'In Progress' && <AppText style={[JobThumbnailStyles.daysText, {marginLeft: 10}]}>Started {daysAgo} {(daysAgo == 1) ? "day" : "days"} ago</AppText>}
                { displayStatus === 'Applied' && <AppText style={JobThumbnailStyles.daysText}>Applied {daysAgo} {(daysAgo == 1) ? "day" : "days"} ago</AppText>}
                { displayStatus === 'Not Started' && isJobOwner && <AppText style={JobThumbnailStyles.ownerApplicantsText}>{job.applicants} {(job.applicants == 1) ? "applicant" : "applicants"}</AppText>}
                { displayStatus === 'Not Started' && !isJobOwner && <AppText style={JobThumbnailStyles.clientApplicantsText}>{job.applicants} {(job.applicants == 1) ? "person has" : "people have"} applied</AppText>}
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
                    repostAllowed && 
                    <AppButton title='Repost' style={JobThumbnailStyles.repostButton} type='tertiary' size='small' onPress={() => console.log('Job attempted to repost')}/>
                }   
            </View>
            

        </View>
    )
}

const CardStyles = StyleSheet.create({
    card: {
        width: 303,
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