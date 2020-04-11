import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import BottomNavbar from '../../components/prefab/BottomNavbar.js/BottomNavbar';
import DoctorTopNavbar from '../../components/prefab/TopNavbar/DoctorTopNavbar';

const Chat = (props) => {
  return (
    <SafeAreaView
      style={{
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <ScrollView>
        <DoctorTopNavbar/>
        <View style={{display: 'flex', flex: 1}}>
          <Text>Chat</Text>
        </View>
      </ScrollView>
      <BottomNavbar nav={props}/>
    </SafeAreaView>
  );
};

export default React.memo(Chat);
