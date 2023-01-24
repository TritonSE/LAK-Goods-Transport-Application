import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { UserData } from '../api/data';
import { AppText } from "./AppText";
import { AppButton } from './AppButton';
import { COLORS } from '../../constants';

// states 'Accepted' will not be used because page changes to tracking once an applicant is accepted
interface ApplicantThumbnailProps {
    applicantData: UserData;
    status: 'Accepted' | 'Denied' | 'Unassigned';
    style?: StyleProp<ViewStyle>
    onAccept: (() => void)
    onDeny: (() => void)
}

export function ApplicantThumbnail({ applicantData, status, style, onAccept, onDeny }: ApplicantThumbnailProps) {
    const flexJustifyContent = 'space-between'
    return (
        <View style={[ThumbailStyles.container, style]}>
            <AppText style={[ThumbailStyles.nameFont, ThumbailStyles.containerItem]}>{applicantData.firstName} {applicantData.lastName}</AppText>
            <AppText style={[ThumbailStyles.phoneFont, ThumbailStyles.containerItem]}>{applicantData.phone}</AppText>
            <AppText style={ThumbailStyles.containerItem}>{applicantData.driverLicenseId}</AppText> {/** TODO Add vehicle info */}

            <View style={[ThumbailStyles.flex, status == 'Accepted' ? { justifyContent: 'space-between' } : null]}>
                {status == 'Unassigned' && <AppButton type="tertiary" size="small" title="Deny" onPress={() => onDeny()} style={ThumbailStyles.flexItem} />}
                {status == 'Unassigned' && <AppButton type="tertiary" size="small" title="Accept" onPress={() => onAccept()} style={ThumbailStyles.flexItem} textStyle={{ color: COLORS.turquoise }} />}
                {status == 'Accepted' && <AppText style={[{ color: COLORS.deepGreen }, ThumbailStyles.flexItem]}>Accepted</AppText>}
                {status == 'Accepted' && <AppButton type="tertiary" size="medium" title="Cancel Applicant" />}
                {status == 'Denied' && <AppText style={{ color: COLORS.red }}>Denied</AppText>}
            </View>

        </View>
    )
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
        justifyContent: 'flex-start'
    },
    flexItem: {
        marginRight: 30
    },
});