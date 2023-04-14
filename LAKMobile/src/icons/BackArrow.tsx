import React from 'react';
import { StyleSheet, Image } from 'react-native';

export const BackArrowIcon = () => (
  <Image style={styles.headerArrow} source={require('../../assets/header-arrow.png')} />
);

const styles = StyleSheet.create({
  headerArrow: {
    height: 20,
    width: 10,
    marginRight: 25,
  },
});
