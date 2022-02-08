import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialCommunityIcon  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';

interface Props {
    title: string,
    placeholder: string,
    icon: string,
    footer: string,
    maxLength: number,
    isNumber: boolean,
    onChange: () => any,
}

export default function SingleLineTextInput({ title, placeholder, icon, footer, maxLength, isNumber, onChange } : Props) {

  return (
      
    <View style={styles.container}>

        <View style={styles.inputLabel}>
            {title}
        </View>

          {icon !== null ? 
          <View style={styles.icon}>
            <MaterialCommunityIcon name="phone-in-talk" size={20} color="gray"/>
            <MaterialIcon name="location-pin" size={20} color="gray"/>
          </View>
          : null}

      <TextInput
        style={styles.inputBox}
        value=""
        textAlign = {'center'}
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType={isNumber ? 'numeric' : 'default'}
        onChange={onChange}
      />

        <View style={styles.footer}>
            {footer}
        </View>
    </View>
  );
}

SingleLineTextInput.defaultProps = {
  icon: null,  
  footer: "",
  maxLength: 1000,
  isNumber: false,
  };

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  inputLabel: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    
  },
  inputBox: {
    borderWidth: 1,
    height: 35,
    width: '80%',
    margin: 10,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderColor: "#8B8B8B",
  },
  footer: {
    marginLeft: 10,
    fontSize: 12,
  }
});
