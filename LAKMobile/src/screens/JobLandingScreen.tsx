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
                    <Svg style={styles.profileIcon} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.99988C15 9.06074 14.5786 10.0782 13.8284 10.8283C13.0783 11.5785 12.0609 11.9999 11 11.9999C9.93913 11.9999 8.92172 11.5785 8.17157 10.8283C7.42143 10.0782 7 9.06074 7 7.99988C7 6.93901 7.42143 5.9216 8.17157 5.17145C8.92172 4.42131 9.93913 3.99988 11 3.99988C12.0609 3.99988 13.0783 4.42131 13.8284 5.17145C14.5786 5.9216 15 6.93901 15 7.99988V7.99988ZM13 7.99988C13 8.53031 12.7893 9.03902 12.4142 9.41409C12.0391 9.78916 11.5304 9.99988 11 9.99988C10.4696 9.99988 9.96086 9.78916 9.58579 9.41409C9.21071 9.03902 9 8.53031 9 7.99988C9 7.46945 9.21071 6.96074 9.58579 6.58566C9.96086 6.21059 10.4696 5.99988 11 5.99988C11.5304 5.99988 12.0391 6.21059 12.4142 6.58566C12.7893 6.96074 13 7.46945 13 7.99988V7.99988Z" fill="white"/>
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM2 11C2 13.09 2.713 15.014 3.908 16.542C4.74723 15.4399 5.8299 14.5467 7.07143 13.9323C8.31297 13.3179 9.67974 12.9988 11.065 13C12.4323 12.9987 13.7819 13.3095 15.0109 13.9088C16.2399 14.508 17.316 15.3799 18.157 16.458C19.0234 15.3216 19.6068 13.9952 19.8589 12.5886C20.111 11.182 20.0244 9.73553 19.6065 8.36898C19.1886 7.00243 18.4512 5.75505 17.4555 4.73004C16.4598 3.70503 15.2343 2.93186 13.8804 2.47451C12.5265 2.01716 11.0832 1.88877 9.66986 2.09997C8.25652 2.31117 6.91379 2.85589 5.75277 3.68905C4.59175 4.52222 3.64581 5.61987 2.99323 6.8912C2.34065 8.16252 2.00018 9.57097 2 11V11ZM11 20C8.93395 20.0031 6.93027 19.2923 5.328 17.988C5.97293 17.0647 6.83134 16.3109 7.83019 15.7907C8.82905 15.2705 9.93879 14.9992 11.065 15C12.1772 14.9991 13.2735 15.2636 14.2629 15.7714C15.2524 16.2793 16.1064 17.0159 16.754 17.92C15.1393 19.2667 13.1026 20.0029 11 20V20Z" fill="white"/>
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
