import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Slider,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';

import {color} from '../../config/styles/color';

import TopNavbar from '../../components/prefab/TopNavbar/TopNavbar';
import DoctorProfile from '../../components/prefab/DoctorProfile/DoctorProfile';

const DoctorSlide = props => {
  const data = useSelector(state => state.DataStoreReducer.data);

  useEffect(() => {
    // console.log('--------------------------------------------------');
    // console.log(data[2]);
    // console.log('--------------------------------------------------');
  });

  return (
    <SafeAreaView style={{backgroundColor: color.background}}>
      <ScrollView>
        <View style={slider.header}>
          <TopNavbar nav={props} mode={true} />
        </View>
        {/* <ScrollView
          horizontal={true}
          style={slider.doctor_container}
          showsHorizontalScrollIndicator={false}> */}
        <FlatList
          initialNumToRender={3}
          style={slider.doctor_container}
          horizontal={true}
          data={data}
          // initialScrollIndex={3}
          renderItem={(item, index) => (
            <DoctorProfile nav={props} key={index} data={item} />
          )}
          keyExtractor={item => item._id}
          //   pagingEnabled={true}
        />
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
  },
});

export default DoctorSlide;
