// Note that this page is only for use during development so that every screen can be accessed easily
// TODO Remove before deploying

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppButton, ScreenHeader } from '../components';
import {RootStackParamList, ScreenListProps} from '../types/navigation';

// Add Page Name to this list to display in list
const Pages: (keyof RootStackParamList)[] = [
    'Login',
    'Signup',
    'ResetPassword',
    'ForgotPassword',
    'ResetSuccess',
    'OTP',
];

export function ScreenList({navigation}: ScreenListProps) {
    return(
        <View>
            <ScreenHeader showArrow children={"List of Screens"} />
            <View style={styles.container}>
                {
                    Pages.map((page) => 
                        <AppButton
                        key={page}
                        type='primary'
                        title={page}
                        onPress={() => navigation.navigate(page)}
                    />
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',

      paddingVertical: 20
    },
  });