import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {text} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';
import DoctorOption from '../../components/prefab/Doctors/DoctorOption';

const Search = props => {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [_search, _setSearch] = useState('');

  const _handelInputAndHandelFilter = text => {
    _setSearch(text);
    setFilterData(
      data.filter(item =>
        item.basic.name
          .toString()
          .toLowerCase()
          .includes(_search.toString().toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    _setSearch(props.navigation.state.params.mySearch);
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
    <View>
      <TopNavBar nav={props} heading={props.heading} />
      <View style={search.container}>
        <TextInput
          style={search.input}
          onChangeText={text => _handelInputAndHandelFilter(text)}
          placeholder="Search by on conditions, symptoms..."
          value={_search}
        />
        <Icon
          name="search"
          color="#fff"
          size={25}
          style={search.placeholder_icon}
        />
      </View>
      <SafeAreaView style={search._container}>
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
          keyExtractor={item => item._id}
        />
      </SafeAreaView>
    </View>
  );
};

const search = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#855FBF',
    marginTop: 20,
    marginBottom: 20,
    // padding: 30,
    display: 'flex',
    alignItems: 'center',
  },
  _container: {
    padding: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    color: '#fff',
    borderRadius: 5,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: '#A16FC4',
  },
  button: {
    color: '#fff',
    marginTop: 20,
  },
  placeholder_icon: {
    position: 'absolute',
    right: 10,
    top: 6,
    opacity: 1,
    zIndex: 10,
    opacity: 0.5,
  },
});

const TopNavBar = props => {
  useEffect(() => {});

  return (
    <View style={topNavBar_styles.top_bar}>
      <Icon
        name="arrow-left-circle"
        color={'#000'}
        size={25}
        onPress={() => props.nav.navigation.navigate('homeScreen')}
      />
      <Text style={topNavBar_styles.heading}>{'Search'}</Text>
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

export default Search;
