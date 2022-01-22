import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
    title: string,
    placeholder: string,
    footer: string,
}

export default function MultilineTextInput({ title, placeholder, footer } : Props) {


  return (
      
    <View style={styles.container}>
        <View style={styles.inputLabel}>
            {title}
        </View>

        <TextInput
        style={styles.inputBox}
        value=""
        textAlign = {'center'}
        placeholder={placeholder}
        multiline={true}
      />

        <View style={styles.footer}>
            {footer}
        </View>
    </View>
  );
}

MultilineTextInput.defaultProps = {
    footer: ""
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
