import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import { JobLandingScreenProps } from '../types/navigation';
import { ListJobs } from './ListJobs';
import { IconButtonWrapper } from '../components';
import { COLORS } from '../../constants';
import { ProfileButtonIcon } from '../icons/ProfileButtonIcon';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export function JobLandingScreen({ navigation }: JobLandingScreenProps) {
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user === null) {
      navigation.navigate('Login');
    }
  }, [auth, navigation]);

  const userId = auth.user ? auth.user.uid : '';

  return (
    <View style={styles.container}>
      <View style={{ height: 50, backgroundColor: COLORS.maroon }}>
        <IconButtonWrapper
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfileScreen', { userId })}
        >
          <ProfileButtonIcon />
        </IconButtonWrapper>
      </View>
      <Tab.Navigator
        initialRouteName="Add Jobs"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 18 },
          tabBarStyle: { backgroundColor: '#94100C' },
          tabBarIndicatorStyle: { backgroundColor: '#FFD84D', paddingTop: 3 },
        }}
      >
        <Tab.Screen name="Add Jobs">{(props) => <ListJobs {...props} mode="Add" />}</Tab.Screen>
        <Tab.Screen name="Find Jobs">{(props) => <ListJobs {...props} mode="Find" />}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  findJobsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  applicantsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  tabBarText: {
    fontSize: 24,
  },
  profileButton: {
    position: 'absolute',
    right: 25,
    top: 25,
    width: 22,
    height: 22,
  },
  profileIcon: {
    width: 22,
    height: 22,
  },
});
