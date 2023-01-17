import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../components/AppText';
import { DetailsScreen } from '../screens/DetailsScreen';
import { ApplicantsScreen } from '../screens/ApplicantsScreen';
import { JobData, JobOwnerView } from '../api/data';
import { ImageCarousel } from '../components/ImageCarousel'
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon } from '../icons/BackArrow';
import { JobLandingScreenProps } from '../types/navigation';
import { ListJobs } from './ListJobs';
import { IconButtonWrapper, ScreenHeader } from '../components';
import { COLORS } from '../../constants';
import { EditIcon } from '../icons';
import { getCurrentUser } from '../api';
import Svg, { Path } from "react-native-svg";


const Tab = createMaterialTopTabNavigator();

export function JobLandingScreen({ navigation }: JobLandingScreenProps) {
    return (
        <View style={styles.container}>
            <View style={{ height: 50, backgroundColor: COLORS.maroon }}>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('ProfileScreen', {userId: getCurrentUser()})}>
                    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fillRule="evenodd" clipRule="evenodd" d="M15 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" fill="white" />
                        <Path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0ZM2 11c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 11.065 13a8.983 8.983 0 0 1 7.092 3.458A9.001 9.001 0 1 0 2 11Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.991 6.991 0 0 1 11.065 15a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 11 20Z" fill="white" />
                     </Svg>
                </TouchableOpacity>
            </View>
            <Tab.Navigator
                initialRouteName="Add Jobs"
                screenOptions={{
                    tabBarActiveTintColor: 'white',
                    tabBarLabelStyle: { fontSize: 18 },
                    tabBarStyle: { backgroundColor: '#94100C' },
                    tabBarIndicatorStyle: { backgroundColor: '#FFD84D', paddingTop: 3, },
                }}>
                <Tab.Screen name="Add Jobs" >
                    {props => <ListJobs {...props} mode='Add' />}
                </Tab.Screen>
                <Tab.Screen name="Find Jobs">
                    {props => <ListJobs {...props} mode='Find' />}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    )
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
    }
});
