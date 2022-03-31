import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcon  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';
import AppText from '../components/AppText';

interface Props {
    title: string,
    placeholder: string,
    icon: string,
    footer: string,
    maxLength: number,
    isNumber: boolean,
    onChange: (inputValue: any, id: string) => any,
    value: string,
    id: string,
    width: string,
}

export default function SingleLineTextInput({ title, placeholder, icon, footer, maxLength, isNumber, onChange, value, id, width } : Props) {

  return (
      
    <View style={styles.container}>

        <View style={styles.inputLabel}>
            <AppText> {title} </AppText>
        </View>

          {icon !== null ? 
          <View style={styles.icon}>
            <MaterialIcon name={icon} size={20} color="gray"/>
          </View>
          : null}

        <TextInput
          style={adjustableStyle({width: width, paddingHorizontal: icon ? 30: 10}).inputBox}
          value={value}
          textAlign = {'left'}
          placeholder={placeholder}
          maxLength={maxLength}
          keyboardType={isNumber ? 'numeric' : 'default'}
          onChange={(inputValue) => onChange(inputValue, id)}
        />
      </View>

        {footer ? <View style={styles.footer}>
            <AppText style={{fontFamily: 'Roboto', fontSize: 12 }}> {footer} </AppText>
        </View>
        : null}
    </View>
  );
}

SingleLineTextInput.defaultProps = {
  icon: null,  
  footer: null,
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
    marginRight: -35,
    marginLeft: 15,
  },
  inputBox: {
    borderWidth: 1,
    height: 35,
    width: '80%',
    margin: 10,
    borderRadius: 4,
    paddingHorizontal: 25,
    borderColor: "#8B8B8B",
  },
  textInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    marginLeft: 10,
    fontSize: 12,
  }
});

interface AdjustableStyles {
  width: string,
  paddingHorizontal: number
}

const adjustableStyle = (props: AdjustableStyles) => StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    height: 35,
    width: props.width,
    margin: 10,
    borderRadius: 4,
    paddingHorizontal: props.paddingHorizontal,
    borderColor: "#8B8B8B",
  },
})