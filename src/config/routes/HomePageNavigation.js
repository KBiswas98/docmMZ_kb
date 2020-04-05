import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Home from '../../screens/home/Home';
import AllDoctor from '../../screens/allDoctors/AllDoctor';
import Profile from '../../screens/doctorProfile/DoctorProfile';
import Search from '../../screens/search/Search';
import Schedule from '../../screens/Schedule/Schedule';
import Schedule2 from '../../screens/Schedule/Schedule2';
import DoctorSlider from '../../screens/doctorSlide/DoctorSlide';
import DoctorProfile2 from '../../components/prefab/DoctorProfile/DoctorProfile2'

const HomePageNavigation = createStackNavigator(
  {
    homeScreen: Home,
    searchScreen: Search,
    allDoctorScreen: AllDoctor,
    doctorSlider: DoctorSlider,
    doctorProfileScreen: Profile,
    doctorProfileScreen2: DoctorProfile2,
    scheduleScreen: Schedule,
    scheduleScreen2: Schedule2,
  },
  {
    initialRouteName: 'homeScreen',
    headerMode: 'none'
  },
);

export default HomePageNavigation;
