import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import BottomNavbar from '../../components/prefab/BottomNavbar.js/BottomNavbar';
import DoctorTopNavbar from '../../components/prefab/TopNavbar/DoctorTopNavbar';
import {color} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Feather';
import {resetStore} from '../../redux/action/auth';
import {useDispatch} from 'react-redux';

const Profile = props => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <ScrollView style={{flex: 1}}>
        <DoctorTopNavbar />
        <ScrollView
          horizontal={true}
          style={{flex: 1, height: 800}}>
          <QuestionCard nav={props} />
          {/* <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
          <QuestionCard nav={props} /> */}
          <QuestionCard nav={props} />
          <QuestionCard nav={props} />
        </ScrollView>
      </ScrollView>
      <BottomNavbar nav={props} />
    </SafeAreaView>
  );
};

const QuestionCard = props => {
  const [loc, setloc] = useState(0);
  useEffect(() => {
    setloc(Math.floor(Math.random() * 700));
  },[]);
  return (
    <TouchableOpacity
      onPress={() => props.nav.navigation.navigate('doctorQuestion')}
      style={[styles.wrapper, { top: loc}]}>
      <Text style={styles.text}>{'option x'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 20,
    height: 100,
    width: 100,
    // paddingVertical: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: color.brand_color,
    position: 'relative',
  },
  text: {
    fontSize: 15,
    color: color.white_color,
  },
});

export default React.memo(Profile);
