import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Home from '../../screens/home/Home';
import AllDoctor from '../../screens/allDoctors/AllDoctor';
import Profile from '../../screens/doctorProfile/DoctorProfile';
import Search from '../../screens/search/Search';
import Schedule from '../../screens/Schedule/Schedule';
import Schedule2 from '../../screens/Schedule/Schedule2';
import DoctorSlider from '../../screens/doctorSlide/DoctorSlide';
import DoctorProfile2 from '../../components/prefab/DoctorProfile/DoctorProfile2'
import AppointmentSuccess from '../../screens/appointment_state/AppointmentSuccess'
import Questionnaire from '../../screens/questionnaire/Questionnaire'
import Setting from '../../screens/setting/Setting';
import PatientProfile from '../../screens/patientProfile/PatientProfile'
import Appointment from '../../screens/appointment/Appointment'


const SettingNavigation = createStackNavigator(
  {
    Setting: Setting,
    PatientProfile: PatientProfile,
    Appointment: Appointment
  },
  {
    headerMode: 'none',
    initialRouteName: 'Setting',
  },
);

const HomePageNavigation = createStackNavigator(
  {
    settings: SettingNavigation,
    homeScreen: Home,
    searchScreen: Search,
    allDoctorScreen: AllDoctor,
    doctorSlider: DoctorSlider,
    doctorProfileScreen: Profile,
    doctorProfileScreen2: DoctorProfile2,
    scheduleScreen: Schedule,
    scheduleScreen2: Schedule2,
    appointmentSuccess: AppointmentSuccess,
    questionnaire: Questionnaire,
  },
  {
    initialRouteName: 'homeScreen',
    headerMode: 'none',
  },
);

export default HomePageNavigation;
