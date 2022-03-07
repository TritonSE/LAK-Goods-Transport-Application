import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AppText from '../components/AppText';

interface Props {
    title: string,
    placeholder: string,
    footer: string,
    maxLength: number,
    onChange: (inputValue: any, id: string) => any,
    value: string,
    id: string,
}

export default function MultilineTextInput({ title, placeholder, footer, maxLength, onChange, value, id } : Props) {

  return (
      
    <View style={styles.container}>
        <View style={styles.inputLabel}>
            <AppText> {title} </AppText>
        </View>

        <TextInput
        style={styles.inputBox}
        value={value}
        textAlign = {'left'}
        placeholder={placeholder}
        multiline={true}
        maxLength={maxLength}
        onChange={(inputValue) => onChange(inputValue, id)}
      />

        {footer ? <View style={styles.footer}>
            <AppText> {footer} </AppText>
        </View>
        : null}
    </View>
  );
}

MultilineTextInput.defaultProps = {
    footer: null,
    maxLength: 1000,
  };

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  inputLabel: {
    marginLeft: 10,
    fontWeight: 'bold'
  },
  inputBox: {
    borderWidth: 1,
    height: 75,
    width: '80%',
    margin: 10,
    borderRadius: 4,
    paddingHorizontal: 5,
    borderColor: "#8B8B8B",
  },
  footer: {
    marginLeft: 10,
  }
});
