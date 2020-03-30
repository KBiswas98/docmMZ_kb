import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Home from '../../screens/home/Home';
import AllDoctor from '../../screens/allDoctors/AllDoctor';
import Profile from '../../screens/doctorProfile/DoctorProfile';
import Search from '../../screens/search/Search';
import Schedule from '../../screens/Schedule/Schedule'
import DoctorSlider from '../../screens/doctorSlide/DoctorSlide'

const HomePageNavigation = createSwitchNavigator(
  {
    homeScreen: Home,
    allDoctorScreen: AllDoctor,
    doctorProfileScreen: Profile,
    scheduleScreen: Schedule,
    searchScreen: Search,
    doctorSlider: DoctorSlider
  },
  {
    initialRouteName: 'homeScreen',
  },
);

export default HomePageNavigation;
