import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppText, LabelWrapper, AppButton, ScreenHeader } from '../components';
import { COLORS } from '../../constants';

export function ResetSuccess() {
    return(
        <View style={styles.container}>
            <ScreenHeader showArrow={true}>
                Reset Pin
            </ScreenHeader>

            <AppText style={headerText}>Reset pin successful! You have X reset(s) left this month.</AppText>

            <AppButton
                type='primary'
                title='Okay'
                onPress={() => console.log('Okay')}
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

const bigInputStyle = StyleSheet.flatten([
    styles.input, {
        width: '100%',
    }
]);

const headerText = StyleSheet.flatten([{
        width: '100%',
        marginTop: "30%",
        marginBottom: '8%',
    }
]);