import { createStackNavigator, createSwitchNavigator} from 'react-navigation';

import Home from '../../Doctors/Home/Home'
import Setting from '../../Doctors/setting/Setting'
import Schedule from '../../Doctors/schedule/Schedule'
import Chat from '../../Doctors/Chat/Chat';
import Profile from '../../Doctors/Profile/Profile'


const DoctorNavigation = createSwitchNavigator(
  {
    homeScreen: Home,
    settingScreen: Setting,
    scheduleScreen: Schedule,
    chatScreen: Chat,
    profileScreen: Profile
  },
  {
    initialRouteName: 'homeScreen',
    headerMode: 'none'
  },
);

export default DoctorNavigation;
