import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import DoctorOption from '../../components/prefab/Doctors/DoctorOption';
import Icon from 'react-native-vector-icons/Feather';
import {text} from '../../config/styles/color';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';

const DATA = [
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists',
    isActive: true,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists1',
    isActive: false,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists2',
    isActive: true,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists3',
    isActive: true,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists4',
    isActive: true,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists4',
    isActive: true,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists4',
    isActive: true,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists4',
    isActive: true,
  },
  {
    name: 'Kamalesh Biswas',
    tag: 'Dentists4',
    isActive: true,
  },
];

const AllDoctor = props => {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [_search, _setSearch] = useState('');

  useEffect(() => {
    axios
      .post(`${Host}/doctors/search`)
      .then(result => {
        if (result.status) {
          console.log(result.data.data);
          setData(result.data.data);
          setFilterData(result.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={doctor.container}>
      <TopNavBar nav={props} heading={props.heading} />
      <FlatList
        data={filterData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <DoctorOption
            name={item.basic.name}
            tag={item.basic.first_name}
            key={index}
            isActive={item.isActive}
            nav={props}
            id={item._id}
          />
        )}
        // keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const doctor = StyleSheet.create({
  container: {
    padding: 15,
  },
});

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
export default AllDoctor;
