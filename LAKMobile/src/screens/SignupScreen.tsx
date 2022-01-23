import { StyleSheet, Text, View, TextInput } from 'react-native';
import { PrimaryButton, LabelWrapper } from '../components';
import { COLORS } from '../../constants';

export default function SignupScreen({}) {
  return (
    <View style={styles.container}>
      <LabelWrapper label='Name (First, Last)'>
        <TextInput
          style={styles.input}
          keyboardType="default"
        />
      </LabelWrapper>
      
      <LabelWrapper label='Mobile Number'>
        <TextInput
          style={bigInputStyle}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label='Location'>
        <TextInput
          style={bigInputStyle}
          keyboardType="default"
        />
      </LabelWrapper>

      <LabelWrapper label='4 digit pin password'>
        <TextInput
          style={smallInputStyle}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <LabelWrapper label='Confirm password'>
        <TextInput
          style={smallInputStyle}
          keyboardType="numeric"
        />
      </LabelWrapper>

      <PrimaryButton
        type='primary'
        title='Create Account'
        onPress={() => console.log('Create Account pressed')}
        style={styles.submitButton}
        />

      <View style={styles.loginLinkContainer}>
        <Text>Already have an account?</Text>
        <PrimaryButton 
          type='link' 
          title='Log in here' 
          onPress={() => console.log('Log in here pressed')}
          style={styles.loginLink}
          />
      </View>
    </View>
  );
}

// Page Styling
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  
  // Shared across all inputs
  input: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.mediumGrey,
    padding: 10,
    height: 40,
    marginBottom: 14,
  },

  submitButton: {
    width: '100%',
    marginTop: 40,
    marginBottom: 1,
  },

  // Styling for "Log in here" components
  loginLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    justifyContent: 'space-evenly'
  },
  loginLink: {
    marginLeft: 5,
  }
});

const bigInputStyle = StyleSheet.flatten([
  styles.input, 
  {
    width: '100%',
  }
]);

const smallInputStyle = StyleSheet.flatten([
  styles.input, 
  {
    width: '45%'
  }
])