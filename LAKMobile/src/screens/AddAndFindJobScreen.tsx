import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';
import JobListing from '../components/JobListing';

export default function AddAndFindJobScreen({}) {
  return (
    <View style={styles.container}>
      <JobListing name='Box of Apples' pickUp='Location' dropOff='Location' deliverBy='MM/DD/YYYY' packageQuantity={10}/>
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
});
