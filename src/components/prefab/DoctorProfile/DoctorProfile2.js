import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { color} from '../../../config/styles/color';
import {ParalaxCard} from '../../primitive/Cards/Card';
import Button from '../../primitive/Button/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import TopNavbar from '../TopNavbar/TopNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { GettingDoctorProfiles } from '../../../redux/action/doctoreAction';

const DATA = {
  about: [
    {
      name: 'Bio',
      data:
        "Dr. Co Ekaterine is the topmost Allergists in Medicare Hospital. She has achieved several awards for her wonderful contribution to her field. She's available for private consultation for given schedules.",
    },
    {
      name: 'Board certifications',
      data: 'Mon - Fri',
    },
    {
      name: 'Education and Training',
      data: 'Mon - Fri',
    },
    {
      name: 'Professional memberships',
      data: 'Mon - Fri',
    },
  ],
};

const DoctorProfile2 = props => {
    const {tmpLoading, tmp} = useSelector(state => state.DoctorReducer)
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GettingDoctorProfiles(props.navigation.state.params.id))
  }, []);

  return tmpLoading ? (
     <ActivityIndicator size="large" color="#000" style={{ display: 'flex', flex: 1, justifyContent: "center", alignItems: "center"}}/> 
  ) : (
    <SafeAreaView style={{marginHorizontal: -10, backgroundColor: color.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 10, backgroundColor: color.brand_color, paddingBottom: 200}}>
          <TopNavbar nav={props} mode={true} />
        </View>
        <View style={{marginTop: -150}}>
          <ParalaxCard data={tmp} />
        </View>
        <View style={doctorprofile.detail_container}>
          <Details nav={props} data={tmp} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const doctorprofile = StyleSheet.create({
  detail_container: {
    // padding: 35,
  },
});

const Details = props => {

  useEffect(() => {
    console.log(props.data);
  });

  return (
    <View style={details.container}>
      <View style={details.header}>
        <TabOption text="About" active={true} />
        <TabOption text="Calender" />
        <TabOption text="Feedback" />
        <TabOption text="More" />
      </View>
      <View style={details.body}>
        {DATA.about.map(row => (
          <View style={details.section}>
            <Text style={details.heading}>{row.name}</Text>
            <Text style={details.paragraph}>{row.data}</Text>
          </View>
        ))}
      </View>
      <View style={details.action}>
        <View style={details.icon}>
          <Icon name="ios-heart" color={color.brand_color} size={28} />
        </View>
        <Button
          deafult={true}
          title={'BOOK APPOINTMENT'}
          normal
          shadow
          onClick={() =>
            props.nav.navigation.navigate('doctorProfileScreen', {
              name: props.name,
              id: props.data._id,
              tag: props.tag,
            })
          }
        />
      </View>
    </View>
  );
};

const details = StyleSheet.create({
  container: {
    padding: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  body: {},
  section: {
    marginTop: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 4,
  },
  paragraph: {
    fontSize: 12,
    fontWeight: '300',
    color: color.text_on_bg,
  },
  action: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

const TabOption = props => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: 15,
    }}>
    <Text
      style={
        props.active
          ? {color: color.brand_color}
          : {color: color.not_heighlited}
      }>
      {props.text}
    </Text>
    {props.active && (
      <View
        style={{
          borderWidth: 2,
          width: 6,
          height: 6,
          backgroundColor: color.brand_color,
          borderRadius: 100,
          borderColor: color.brand_color,
        }}></View>
    )}
  </View>
);

export default DoctorProfile2;
