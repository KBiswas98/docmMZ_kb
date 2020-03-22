import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {text} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Feather';

const DoctorProfile = (props) => {
    return (
        <View>
            <TopNavBar nav={props} heading={props.heading} />
            <View>

            </View>
        </View>
    )
}


const TopNavBar = props => {
    
    return (
      <View style={topNavBar_styles.top_bar}>
        <Icon
          name="arrow-left-circle"
          color={'#000'}
          size={25}
          onPress={() => props.nav.navigation.navigate('homeScreen')}
        />
        <Text style={topNavBar_styles.heading}>
          {props.nav.navigation.state.params.name}
        </Text>
        <View style={topNavBar_styles.holder}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/setting.png')}
              style={topNavBar_styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const topNavBar_styles = StyleSheet.create({
    top_bar: {
      padding: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    heading: {
      fontSize: 30,
      fontWeight: '300',
      color: text.color_1,
    },
    heading_bold: {
      fontWeight: 'bold',
      color: text.color_0,
    },
    holder: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    drop_down: {
      padding: 10,
      paddingRight: 15,
      paddingLeft: 15,
      backgroundColor: text.color_2,
      marginRight: 20,
    },
    icon: {
      height: 18,
      width: 18,
    },
  });

export default DoctorProfile
