import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {color} from '../../../config/styles/color'
import Switch from '../../../components/primitive/Switch/Switch'

const DoctorTopNavbar = (props) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", backgroundColor: color.brand_color, height: 70, padding: 20,alignItems: "center"}}>
      <Icon
        name="home"
        color={color.white_color}
        size={20}
        onPress={() => props.nav.navigation.navigate('homeScreen')}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 2, color: color.white_color}}>DocMz</Text>
      {/* <Icon
          name="bell"
          color={color.white_color}
          size={20}
        //   onPress={() => props.nav.navigation.navigate('settingScreen')}
        /> */}
        <Switch option1="Go Live" option2=" Live " onClick={() => console.log('oo')} mode={true} />
    </View>
  );
};

export default DoctorTopNavbar;
