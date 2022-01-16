import { StyleSheet, Text, View, TextInput } from 'react-native';
import { PrimaryButton, LabelledInput } from '../components';
import { COLORS } from '../../constants';

export default function SignupScreen({}) {
  return (
    <View style={styles.container}>
      <LabelledInput label='Name (First, Last)'>
        <TextInput
          style={bigInputStyles}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>
      
      <LabelledInput label='Mobile Number'>
        <TextInput
          style={bigInputStyles}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>

      <LabelledInput label='Location'>
        <TextInput
          style={bigInputStyles}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>

      <LabelledInput label='4 digit pin password'>
        <TextInput
          style={smallInputStyles}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>

      <LabelledInput label='Confirm password'>
        <TextInput
          style={smallInputStyles}
          placeholder='Value'
          keyboardType="numeric"
        />
      </LabelledInput>

      <PrimaryButton
        title='Create Account'
        onPress={() => console.log('PrimaryButton callback')}
        style={styles.submitButton}
        />

      <Text>Already have an account? <PrimaryButton title='Log on here' type="link" /></Text>
    </View>
  );
}

// Page Styling

const localColors = {
  gray: '#8B8B8B',
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '32px',
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  
  input: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: localColors.gray,
    padding: 10,
    height: '5vh',
    marginBottom: '2vh',
  },

  bigInput: {
    width: '100%',
  },

  smallInput: {
    width: '45%'
  },

  submitButton: {
    width: '100%',
    marginTop: '5vh',
    marginBottom: '1vh',
  }
});

const bigInputStyles = StyleSheet.flatten([
  styles.input, styles.bigInput
]);

const smallInputStyles = StyleSheet.flatten([
  styles.input, styles.smallInput,
])