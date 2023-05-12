import React from 'react';
import { StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { COLORS } from '../../constants';

interface InternationalPhoneInputProps {
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}
export function InternationalPhoneInput({ setPhoneNumber }: InternationalPhoneInputProps) {
  return (
    <PhoneInput
      defaultCode="US"
      layout="first"
      onChangeFormattedText={(text) => {
        setPhoneNumber(text);
      }}
      containerStyle={{
        borderWidth: 1,
        borderRadius: 4,
        borderColor: COLORS.mediumGrey,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
      }}
      textContainerStyle={{
        borderWidth: 1,
        borderRadius: 4,
        borderColor: COLORS.mediumGrey,
        backgroundColor: 'transparent',
      }}
      flagButtonStyle={{
        borderWidth: 1,
        borderRadius: 4,
        borderColor: COLORS.mediumGrey,
      }}
      autoFocus
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5C7C5',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '700',
  },
  button: {
    marginTop: 10,
    width: 'auto',
    height: 'auto',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
