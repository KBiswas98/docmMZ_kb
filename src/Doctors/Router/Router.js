import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import BottomNavbar from '../../components/prefab/BottomNavbar.js/BottomNavbar';

import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import Profile from '../Profile/Profile';
import Schedule from '../schedule/Schedule';
import Setting from '../setting/Setting';

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState(1);
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <ScrollView>
        <View style={{display: 'flex', flex: 1}}></View>
      </ScrollView>
      <BottomNavbar />
    </SafeAreaView>
  );
};

export default Router;
