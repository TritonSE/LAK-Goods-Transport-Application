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
import { IconButtonWrapper, ScreenHeader} from '../components';
import { COLORS } from '../../constants';
import { EditIcon } from '../icons';
import { getCurrentUser } from '../api';
import Svg, { Path } from "react-native-svg";
import { ProfileButtonIcon } from '../icons/ProfileButtonIcon';


const Tab = createMaterialTopTabNavigator();

export function JobLandingScreen({ navigation }: JobLandingScreenProps) {
    return (
        <View style={styles.container}>
            <View style={{ height: 50, backgroundColor: COLORS.maroon }}>
                <IconButtonWrapper style={styles.profileButton} onPress={() => navigation.navigate('ProfileScreen')}>
                    <ProfileButtonIcon />
                </IconButtonWrapper>
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
