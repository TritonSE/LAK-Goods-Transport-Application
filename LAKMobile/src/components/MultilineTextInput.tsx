import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

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
            <Text> {title} </Text>
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

        <View style={styles.footer}>
            <Text> {footer} </Text>
        </View>
    </View>
  );
}

MultilineTextInput.defaultProps = {
    footer: "",
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
