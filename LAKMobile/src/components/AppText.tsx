import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export function AppText({style, children, ...props}: TextProps) {
    return (
      <Text 
        {...props}
        style={[defaultStyles.textStyle, style]}
        >{children}</Text>
    )
}

const defaultStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});