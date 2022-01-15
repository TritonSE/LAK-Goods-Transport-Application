import { StyleSheet, Text, View, TextInput } from 'react-native';
import { PrimaryButton, LabelledInput } from '../components';
import { COLORS } from '../../constants';

export default function SignupScreen({}) {
  return (
    <View style={styles.container}>
      <LabelledInput label='Name (First, Last)' style={styles.inputContainer}>
        <TextInput
          style={styles.bigInput}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>
      
      <LabelledInput label='Mobile Number' style={styles.inputContainer}>
        <TextInput
          style={styles.bigInput}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>

      <LabelledInput label='Location' style={styles.inputContainer}>
        <TextInput
          style={styles.bigInput}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>

      <LabelledInput label='4 digit pin password' style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          placeholder='Value'
          keyboardType="default"
        />
      </LabelledInput>

      <LabelledInput label='Confirm password' style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          placeholder='Value'
          keyboardType="numeric"
        />
      </LabelledInput>

      <PrimaryButton
        title='Create Account'
        onPress={() => console.log('PrimaryButton callback')}
        color={COLORS.maroon}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bigInput: {
    height: '2h',
    width: '300px',
  },
  smallInput: {
    height: '2h',
    width: '150px',
  },
  inputContainer: {
    borderRadius: 4,
    borderWidth: 1,
    padding: '0.5rem',
    marginBottom: '7px'
  },
});
