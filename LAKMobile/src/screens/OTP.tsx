import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, ScreenHeader } from '../components';
import { COLORS } from '../../constants';

export function OTP() {
    return(
        <View style={styles.container}>
            <ScreenHeader showArrow={true}>
                OTP Verification
            </ScreenHeader>

            <AppText style={headerText}>Please enter the OTP sent to your phone.</AppText>

            <LabelWrapper label='OTP'>
                <TextInput
                    style={smallInputStyle}
                    keyboardType="default"
                />
            </LabelWrapper>

            <AppButton
                type='primary'
                title='Submit'
                onPress={() => console.log('Submit')}
                style={styles.submitButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 32,
        flex: 1,
        alignItems: 'flex-start',
    },

    input: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: COLORS.mediumGrey,
        padding: 5,
        height: 40,
        marginBottom: 8,
    },

    submitButton: {
        width: '100%',
        marginTop: 40,
        padding: 5
    },

    signupPrompt: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },

    signupLink: {
        marginLeft: 5
    }
});

const smallInputStyle = StyleSheet.flatten([
    styles.input, {
        width: '45%'
    }
])

const headerText = StyleSheet.flatten([{
        width: '100%',
        marginTop: "30%",
        marginBottom: '8%',
    }
]);