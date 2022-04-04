import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/Entypo';

const backButtonIcon = <Icon name="arrow-long-left" size={30} color="white" />;

const MaterialsTab = createMaterialTopTabNavigator();

function DetailsScreen(){
    return (
        <View>

        </View>
    )
}

function ApplicantsScreen(){
    return (
        <View>

        </View>
    )
}


type NumberOfApplicantsProps = {
    numApplicants: number
}
function NumberOfApplicants({numApplicants} : NumberOfApplicantsProps){
    return(
        <View style={styles.applicantNumber}>
            <AppText style={styles.numApplicantsText}>{numApplicants}</AppText>
        </View>
    );
}

export default function TabHeader() {
  return (

      <View style = {styles.container}>

        <View style={styles.backView}>
            <TouchableOpacity onPress={()=>{console.log("back")}} >
                {backButtonIcon}
            </TouchableOpacity>

            <NumberOfApplicants numApplicants={2}></NumberOfApplicants>

        </View>

        <MaterialsTab.Navigator
        initialRouteName="Details"
        screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarLabelStyle: { fontSize: 18 },
            tabBarStyle: { backgroundColor: '#94100C'},
            tabBarIndicatorStyle: {backgroundColor: '#FFD84D', paddingTop: 3,}
        }}>
        <MaterialsTab.Screen name="Details" component={DetailsScreen}/>
        <MaterialsTab.Screen name="Applicants" component={ApplicantsScreen} />
        </MaterialsTab.Navigator> 

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
        backgroundColor: '#F5C7C5',
        borderRadius: 5,
        width: '7%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginRight: 5,
    },
    numApplicantsText: {
        color: '#94100C',
    }
});