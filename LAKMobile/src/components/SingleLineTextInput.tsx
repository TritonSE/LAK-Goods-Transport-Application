import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcon  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';

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
            <Text> {title} </Text>
        </View>

          {icon !== null ? 
          <View style={styles.icon}>
            <MaterialIcon name={icon} size={20} color="gray"/>
          </View>
          : null}

        <TextInput
          style={adjustableStyle({width: width, paddingHorizontal: icon ? 25: 5}).inputBox}
          value={value}
          textAlign = {'center'}
          placeholder={placeholder}
          maxLength={maxLength}
          keyboardType={isNumber ? 'numeric' : 'default'}
          onChange={(inputValue) => onChange(inputValue, id)}
        />
      </View>

        <View style={styles.footer}>
            <Text> {footer} </Text>
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
    // borderColor: 'gray',
    // borderWidth: 1,
    // height: 40,
    // width: '80%'
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