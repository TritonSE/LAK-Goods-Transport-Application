import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppText, LabelWrapper, AppButton } from '../components';
import { COLORS } from '../../constants';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoginProps} from '../types/navigation';

export function LoginScreen({navigation}: LoginProps) {
    return(
        <View style={styles.container}>
            <LabelWrapper label='Mobile Number'>
                <TextInput
                style={bigInputStyle}
                keyboardType="default"
                />
            </LabelWrapper>

            <LabelWrapper label='4 Digit PIN'>
                <TextInput
                style={smallInputStyle}
                keyboardType="numeric"
                />
            </LabelWrapper>
            <AppButton 
                type='link' 
                title='Forgot PIN?' 
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotPIN}
            />

            <AppButton
                type='primary'
                title='Log in'
                onPress={() => console.log("Login")}
                style={styles.submitButton}
            />

            <View style={styles.signupPrompt}>
                <AppText>Don't have an account?</AppText>
                <AppButton 
                    type='link' 
                    title='Sign up here.' 
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.signupLink}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 32,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
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
  
const smallInputStyle = StyleSheet.flatten([
    styles.input, {
        width: '45%'
    }
])