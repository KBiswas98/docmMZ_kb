import { createStackNavigator, createSwitchNavigator} from 'react-navigation';

import Home from '../../Doctors/Home/Home'
import Setting from '../../Doctors/setting/Setting'
import Schedule from '../../Doctors/schedule/Schedule'
import Chat from '../../Doctors/Chat/Chat';
import Profile from '../../Doctors/Profile/Profile'
import DoctorQuestionnaire from '../../Doctors/Questionnaire/DoctorQuestionnaire'
import AllQuestion from '../../Doctors/Questionnaire/AllQuestions'

const DoctorNavigation = createSwitchNavigator(
  {
    homeScreen: Home,
    settingScreen: Setting,
    scheduleScreen: Schedule,
    chatScreen: Chat,
    profileScreen: Profile,
    doctorQuestion: DoctorQuestionnaire,
    allQuestion: AllQuestion,
  },
  {
    initialRouteName: 'doctorQuestion',
    headerMode: 'none',
  },
);

export default DoctorNavigation;
