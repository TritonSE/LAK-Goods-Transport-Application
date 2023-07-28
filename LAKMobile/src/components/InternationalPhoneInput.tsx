import React from 'react';
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
        backgroundColor: 'transparent',
        marginBottom: 14,
      }}
      textContainerStyle={{
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'transparent',
        borderColor: COLORS.gray,
      }}
      flagButtonStyle={{
        backgroundColor: 'transparent',
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 4,
      }}
      autoFocus
    />
  );
}
