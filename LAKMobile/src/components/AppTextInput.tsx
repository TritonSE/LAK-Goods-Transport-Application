import React from "react";
import { TextInputProps, View, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';

type AppTextInputProps = TextInputProps & {
    icon?: string,
    style?: StyleProp<TextStyle>
    err?: boolean
    errLabel ?: string
}

export function AppTextInput({icon, err, errLabel, style, ...textInputProps}: AppTextInputProps) {
    return (
      <>
      {err ?
      <View style={[styles.textInputWrapper, style]}>
            { icon && 
              <MaterialIcon style={styles.icon} name={icon} size={20} color="gray"/>
            }
            <TextInput style={styles.textInput} {...textInputProps}/>
      </View>
      : 
      <View style={[styles.textInputWrapper, style]}>
        { icon && 
        <MaterialIcon style={styles.icon} name={icon} size={20} color="gray"/>
        }
        <TextInput style={styles.textInput} {...textInputProps}/>
      </View>
      }
      </>
    )
}


const styles = StyleSheet.create({
    container: {
      margin: 5,
    },
    icon: {
      marginRight: 4
    },
    textInput: {
      borderWidth: 0,
      margin: 0,
      width: '100%',
      height: '100%'
    },
    
    textInputWrapper: {
      paddingHorizontal: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    footer: {
      marginLeft: 10,
      fontSize: 12,
    }
  });
  