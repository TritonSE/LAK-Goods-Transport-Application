import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, ScreenHeader } from '../components';
import { COLORS } from '../../constants';

export function ForgotPassword() {
    return(
        <View style={styles.container}>
            <ScreenHeader showArrow={true}>
                Forgot Pin?
            </ScreenHeader>

            <AppText style={headerText}>Please enter the mobile number associated with your account.</AppText>

            <LabelWrapper label='Mobile Number'>
                <TextInput
                    style={bigInputStyle}
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
        padding: 10,
        height: 40,
        marginBottom: 14,
    },

    forgotPIN: {
        marginTop: -10,
        elevation: 0
    },

    submitButton: {
        width: '100%',
        marginTop: 40,
        marginBottom: 10,
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

const bigInputStyle = StyleSheet.flatten([
    styles.input,
    {
        width: '100%',
    }
]);

const headerText = StyleSheet.flatten([
    {
        width: '100%',
        marginTop: "30%",
        marginBottom: '15%',
    }
]);