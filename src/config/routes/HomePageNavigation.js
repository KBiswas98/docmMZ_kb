import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Home from '../../screens/home/Home';
import AllDoctor from '../../screens/allDoctors/AllDoctor';
import Profile from '../../screens/doctorProfile/DoctorProfile';
import Search from '../../screens/search/Search';
import Schedule from '../../screens/Schedule/Schedule';
import DoctorSlider from '../../screens/doctorSlide/DoctorSlide';

const HomePageNavigation = createStackNavigator(
  {
    homeScreen: Home,
    searchScreen: Search,
    allDoctorScreen: AllDoctor,
    doctorSlider: DoctorSlider,
    doctorProfileScreen: Profile,
    scheduleScreen: Schedule,
  },
  {
    initialRouteName: 'homeScreen',
    headerMode: 'none'
  },
);

export default HomePageNavigation;
