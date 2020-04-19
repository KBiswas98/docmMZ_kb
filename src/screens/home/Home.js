import React, {PureComponent, useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {View, Text} from 'react-native-animatable';
import {text, color} from '../../config/styles/color';
import Catagory from '../../components/prefab/Catagory/Catagory';
import DoctorOption from '../../components/prefab/Doctors/DoctorOption';
import {_checkLogin, _saveDataToStorage} from '../../config/common/Storage';
import {SearchBox} from '../../components/primitive/Input/Input';
import TopNavBar from '../../components/prefab/TopNavbar/TopNavbar';
import {useSelector, useDispatch} from 'react-redux';
import Switch from '../../components/primitive/Switch/Switch';
import TButton from '../../components/prefab/Buttons/TButton';
import {fetchDoctors, fetchDoctorLite, searchDoctorLite} from '../../redux/action/doctoreAction'

const getRecent3 = output => {
  const s = new Date();
  let pp = output.filter(
    // items => new Date().toISOString() < items.bookedFor,
    // items => items.bookedFor < '2020-04-09T23:59:35.604Z',
    items =>
      items.bookedFor <
      `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}T23:59:35.604Z`,
  );
  pp = pp.slice(0, 3);
  let res = [];
  let mm = [
    {time: '_:_', available: false},
    {time: '_:_', available: false},
    {time: '_:_', available: false},
  ];
  pp.map(it => {
    let c = new Date(it.bookedFor);
    let a = it.available;
    let _time = c.getHours() + ':' + c.getMinutes();

    res.push({time: _time, available: a});
  });

  return res.length < 3 ? mm : res;
};

const Home = props => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState(false);
  const [section, setSection] = useState('Top Doctors');
  const [page, setPage] = useState(0);
  const [searchPageIndex, setSearchPageIndex] = useState(0)
  
  const doctors = useSelector(state => state.DoctorReducer);
  const {isLogedin, isDoctor} = useSelector(state => state.AuthReducer)
  var tougl = false;



  useEffect(() => {
    (isDoctor && isLogedin) && props.navigation.navigate('Doctor')
    console.log(` isDoctor: ${isDoctor} and isLogedin: ${isLogedin}`)

    enableSomeButton()

  }, []);

  const handelSearchInput = _text => {
    console.log(_text);
    setSearch(_text);
  };

  const handelSearchSubmit = () => {
    enableSomeButton();
  };

  const handelMode = () => {
      enableSomeButton()
    setMode(!mode);
    tougl = !tougl
  };

  const _fetch = () => {
    console.log('ennnnnd');
  };

  function enableSomeButton() {

    let page_index = search.length === 0 ? page : searchPageIndex
    dispatch(fetchDoctorLite(search,page_index,mode))
    search.length === 0 ? setPage(page + 1) : setSearchPageIndex(searchPageIndex)

    
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return <SafeAreaView
      style={{backgroundColor: color.background, display: 'flex', flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            enableSomeButton();
          }
        }}
        scrollEventThrottle={400}>
        <TopNavBar nav={props} />
        <View
          style={{
            marginTop: -10,
            marginLeft: 15,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, fontWeight: 'bold', color: '#000'}}>
            Doctor
          </Text>
          <Switch option1="Schedule" option2=" Now " onClick={handelMode} />
        </View>
        <View>
          <ScrollView
            style={{display: 'flex', flexDirection: 'row'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Catagory title={'Dentists'} isActive={false}>
              <Image
                style={home_styles.image}
                source={require('../../assets/icons/teeth.png')}
              />
            </Catagory>
            <Catagory title={'Dentists'} isActive={true}>
              <Image
                style={home_styles.image}
                source={require('../../assets/icons/eye.png')}
              />
            </Catagory>
            <Catagory title={'Dentists'} isActive={false}>
              <Image
                style={home_styles.image}
                source={require('../../assets/icons/hand.png')}
              />
            </Catagory>
          </ScrollView>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginHorizontal: 20,
            marginVertical: 30,
          }}>
          <SearchBox
            onChange={handelSearchInput}
            onSubmit={handelSearchSubmit}
            icon={'search'}
            page={0}
          />
          <Image
            source={require('../../assets/icons/setting.png')}
            style={{width: 20, height: 20, marginLeft: 15}}
          />
        </View>

        <View>
          <Section name={section} data={doctors.doctors} nav={props} fetch={_fetch} />
        </View>
        {(doctors.loading) && (
        //   <Text
        //     style={{
        //       textAlign: 'center',
        //       fontSize: 11,
        //       fontWeight: '300',
        //       marginBottom: 20,
        //     }}>
        //     Fetching doctors..
        //   </Text>
        <ActivityIndicator size="large" color={color.brand_color} />
        )}
        {(!doctors.loading && doctors.doctors.length <= 0) && (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 11,
              fontWeight: '300',
              marginBottom: 20,
            }}>
            no doctor available.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  
};

const home_styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
    resizeMode: 'stretch',
  },
});

class Section extends PureComponent {
  render() {
    let lastIndex = 0;
    return (
      <View style={section.container}>
        <View style={section.header}>
          <Text style={section.heading}>{this.props.name}</Text>
          <TButton
            title={'view all'}
            onClick={() =>
              this.props.nav.navigation.navigate('doctorSlider', {
                name: this.props.name,
              })
            }
          />
        </View>
        <View style={section.doc_container}>
          <FlatList
            initialNumToRender = "3"
            data={this.props.data}
            renderItem={(item, index) => {
              console.log(item.index);
              return (
                <DoctorOption
                  name={item.item.basic.name}
                  tag={item.item.specialty || 'Unknown'}
                  key={item.index}
                  isActive={item.isActive}
                  nav={this.props.nav}
                  id={item.item._id}
                  schedule={getRecent3(item.item.output)}
                />
              );
            }}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </View>
    );
  }
}

const section = StyleSheet.create({
  container: {
    margin: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  heading: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: text.color_0,
  },
  doc_container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default React.memo(Home);
