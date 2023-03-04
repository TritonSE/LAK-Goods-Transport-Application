import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { LabelWrapper, AppButton, ScreenHeader } from '../components';
import { COLORS } from '../../constants';
import {ResetPasswordProps} from '../types/navigation';

export function ResetPassword({navigation}: ResetPasswordProps) {
    return(
        <View style={styles.container}>
            <ScreenHeader showArrow={true}>
                Forgot Pin?
            </ScreenHeader>
            <View style={marginTop}/>
            <LabelWrapper label='New 4 digit pin'>
                <TextInput
                    style={smallInputStyle}
                    keyboardType="numeric"
                />
            </LabelWrapper>

            <LabelWrapper label='Confirm 4 digit pin'>
                <TextInput
                    style={smallInputStyle}
                    keyboardType="numeric"
                />
            </LabelWrapper>

            <AppButton
                type='primary'
                title='Reset Pin'
                onPress={() => navigation.navigate('ResetSuccess')}
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

const marginTop = StyleSheet.flatten([{
        marginTop: "30%",
    }
]);