import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Slider, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {color} from '../../config/styles/color'

import TopNavbar from '../../components/prefab/TopNavbar/TopNavbar';
import DoctorProfile from '../../components/prefab/DoctorProfile/DoctorProfile'

const DoctorSlide = props => {
  const data = useSelector(state => state.DataStoreReducer.data);

  return (
    <SafeAreaView style={{backgroundColor: color.background}}>
      <ScrollView >
        <View style={slider.header}>
          <TopNavbar nav={props} mode={true}/>
        </View>
        <ScrollView horizontal={true} style={slider.doctor_container} showsHorizontalScrollIndicator={false}>
            <DoctorProfile nav={props}/>
            <DoctorProfile nav={props}/>
            <DoctorProfile nav={props}/>
            <DoctorProfile nav={props}/>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const slider = StyleSheet.create({
    header: {
        backgroundColor: color.brand_color,
        paddingBottom: 200,
    },
    doctor_container: {
        marginTop: -210,
    }
})

export default DoctorSlide;
