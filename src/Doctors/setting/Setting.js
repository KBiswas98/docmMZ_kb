import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import BottomNavbar from '../../components/prefab/BottomNavbar.js/BottomNavbar';
import DoctorTopNavbar from '../../components/prefab/TopNavbar/DoctorTopNavbar';
import {color} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Feather';
import {resetStore} from '../../redux/action/auth';
import {useDispatch} from 'react-redux';

const Setting = props => {
  const dispatch = useDispatch();

  const _logout = async () => {
    dispatch(resetStore());
    props.navigation.navigate('Home');
  };

  return (
    <SafeAreaView
      style={{
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <ScrollView>
        <DoctorTopNavbar />
        <View style={{display: 'flex', flex: 1}}>
          <TouchableOpacity
            style={{
              padding: 20,
              elevation: 10,
              backgroundColor: '#Fff',
              margin: 20,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
            }}
            onPress={() => {
              _logout(props);
            }}>
            <Icon name="log-out" color={color.brand_color} size={18} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                fontWeight: '600',
                letterSpacing: 0.5,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavbar nav={props} />
    </SafeAreaView>
  );
};

export default Setting;
