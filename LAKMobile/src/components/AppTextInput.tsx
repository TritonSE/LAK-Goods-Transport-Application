import { red } from "colors";
import React, {useState} from "react";
import { Text, TextInputProps, View, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';

type AppTextInputProps = TextInputProps & {
    icon?: string
    style?: StyleProp<TextStyle>
    errMsg ?: string
    instructionText ?: string  // default text under "Date to be Delivered"
    value: string
    changeAction?: React.Dispatch<React.SetStateAction<string>>
    checkValid?: (a: string, b: string) => boolean
    type?: string
}

export function AppTextInput({icon, errMsg, instructionText, style, value, checkValid, type, changeAction, ...textInputProps}: AppTextInputProps) {
  const [isError, setIsError] = useState(false)
  const handleChange = (text: string) => {
    changeAction && changeAction(text)
    checkValid && type && setIsError(!checkValid(text, type));
  }


  return (

    // <View style={[styles.container, style]}> 
    <View style={styles.container}>

      <View style={[styles.textInputWrapper, style]}>
        { icon && 
          <MaterialIcon style={styles.icon} name={icon} size={20} color="gray"/>
        }
        <TextInput style={styles.textInput} onChangeText= {(text) => handleChange(text)} value={value} {...textInputProps}/>
      </View>


      {/* {isError &&
        <Text style={styles.errText}>{errMsg}</Text>
      } */}

      {isError 
        ? ( 
          <Text style={styles.errText}>{errMsg}</Text>
        ) 
        : (
          <Text style={styles.instructionText}> {instructionText} </Text>
        )
      } 

    </View>

  );
  


}


const styles = StyleSheet.create({
    container: {
      //margin: 5,
      flexDirection: 'column'  // put descriptive text below component instead of in row
    },
    icon: {
      marginRight: 4
    },
    textInput: {
      borderWidth: 0,
      margin: 0,
      width: '100%',
      height: '100%',
    },
    textInputErr: {
      borderWidth: 0,
      margin: 0,
      width: '100%',
      height: '100%',
    },
    errText: {
      color: '#DA5C5C',
      fontSize: 12,
      marginBottom: 20  // this is adding margin below null errMsg as well
    },
    instructionText: {
      fontSize: 12,
      marginBottom: 20  // this is adding margin below null instructionText as well
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
  