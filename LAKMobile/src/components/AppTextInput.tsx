import React, {useState} from "react";
import { Text, TextInputProps, View, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';

type AppTextInputProps = TextInputProps & {
    icon?: string
    style?: StyleProp<TextStyle>
    errMsg ?: string
    value: string
    changeAction?: React.Dispatch<React.SetStateAction<string>>
    checkValid?: (a: string, b: string) => boolean
    type?: string
}

export function AppTextInput({icon, errMsg, style, value, checkValid, type, changeAction, ...textInputProps}: AppTextInputProps) {
  const [isError, setIsError] = useState(false)
  const handleChange = (text: string) => {
    changeAction && changeAction(text)
    checkValid && type && setIsError(!checkValid(text, type));
  }
  
  return (
    <View style={[styles.textInputWrapper, style]}>
      { icon && 
        <MaterialIcon style={styles.icon} name={icon} size={20} color="gray"/>
      }
      <TextInput style={styles.textInput} onChangeText= {(text) => handleChange(text)} value={value} {...textInputProps}/>
      {isError &&
        <Text>{errMsg}</Text>
      }
    </View>
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
  