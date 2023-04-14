import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../components/AppText';
import { DetailsScreen } from '../screens/DetailsScreen';
import { ApplicantsScreen } from '../screens/ApplicantsScreen';
import { ImageCarousel } from '../components/ImageCarousel';
import { BackArrowIcon } from '../icons/BackArrow';
import { JobApplicantProps } from '../types/navigation';

const Tab = createMaterialTopTabNavigator();

type NumberOfApplicantsProps = {
  color: string;
  numApplicants: number;
};
function NumberOfApplicants({ color, numApplicants }: NumberOfApplicantsProps) {
  return (
    <View style={styles.applicantNumber}>
      <AppText style={{ fontSize: 18, marginRight: 10, color }}>APPLICANTS</AppText>
      <AppText style={{ backgroundColor: color, ...styles.numApplicantsText }}>
        {numApplicants}
      </AppText>
    </View>
  );
}

export function JobApplicant({ navigation, route }: JobApplicantProps) {
  const carousel = <ImageCarousel imageIds={route.params.jobData.imageIds} />;
  const numApplicants = route.params.jobData.applicants.length;
  return (
    <View style={styles.container}>
      <View style={styles.backView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowIcon />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        initialRouteName="Details"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 18 },
          tabBarStyle: { backgroundColor: '#94100C' },
          tabBarIndicatorStyle: { backgroundColor: '#FFD84D', paddingTop: 3 },
        }}
      >
        <Tab.Screen name="Details">
          {(props) => (
            <DetailsScreen {...props} carousel={carousel} jobData={route.params.jobData} />
          )}
        </Tab.Screen>
        {
          // Track has preventDefault as placeholder
          route.params.jobData.status === 'ASSIGNED' ? (
            <Tab.Screen
              name="Track"
              listeners={{
                tabPress: (e) => {
                  e.preventDefault();
                },
              }}
            >
              {() => null}
            </Tab.Screen>
          ) : (
            <Tab.Screen
              name="Applicants"
              options={{
                tabBarLabel: ({ color }) => (
                  <NumberOfApplicants color={color} numApplicants={numApplicants} />
                ),
              }}
              listeners={{
                tabPress: (e) => {
                  if (numApplicants === 0) {
                    e.preventDefault();
                  }
                },
              }}
            >
              {(props) => (
                <ApplicantsScreen
                  {...props}
                  carousel={carousel}
                  jobData={route.params.jobData}
                  setJobData={route.params.setJobData}
                />
              )}
            </Tab.Screen>
          )
        }
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
  detailsContainer: {
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
  backView: {
    width: '100%',
    height: '7%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#94100C',
    paddingLeft: 20,
    paddingTop: 20,
  },
  applicantNumber: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numApplicantsText: {
    paddingLeft: 7.5,
    paddingRight: 7.5,
    borderRadius: 5,
    color: '#94100C',
    textAlign: 'center',
  },
});
