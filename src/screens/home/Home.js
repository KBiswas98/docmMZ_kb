import React, {PureComponent, useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {View, Text} from 'react-native-animatable';
import {text, color} from '../../config/styles/color';
import Catagory from '../../components/prefab/Catagory/Catagory';
import Icon from 'react-native-vector-icons/Feather';
import DoctorOption from '../../components/prefab/Doctors/DoctorOption';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';
import {_checkLogin, _saveDataToStorage} from '../../config/common/Storage';
import {SearchBox} from '../../components/primitive/Input/Input';
import Loading from '../../screens/loading/Loading';
import TopNavBar from '../../components/prefab/TopNavbar/TopNavbar';
import {useSelector, useDispatch} from 'react-redux';
import {addDataToRedux} from '../../redux/action/dataStore';
import Switch from '../../components/primitive/Switch/Switch';
import TButton from '../../components/prefab/Buttons/TButton';
import {fetchDoctors} from '../../redux/action/doctoreAction'

const getRecent3 = item => {
  const s = new Date();
  let pp = item.output.filter(
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
let count = 1;
let searchPage = 0;
// let page = 0;

const Home = props => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState({duration: 3});
  const [fetchDoctorsData, setFetchDoctorsData] = useState(false);
  const [mode, setMode] = useState(false);
  const [section, setSection] = useState('Top Doctors');
  const [isFetching, setFetching] = useState(true);
  const [activeOption, setActiveOption] = useState(1); // 1- top doc 2- search  3- spaciality
  const [page, setPage] = useState(0);
  const doctors = useSelector(state => state.DataStoreReducer.data);

  const _fetchData = (search, _page) => {
    const isSerching = search.length > 0;
    setFetching(true);

    const param = {
      match: JSON.stringify({is_superDoc: mode}),
      pageNo: _page.toString(),
      size: '5',
      name: search.toString().split(' ')[0],
    };

    console.log(`searchPage: ${searchPage} and page: ${_page}`);
    axios
      .post(`${Host}/doctors/searchlite`, param)
      .then(result => {
        if (result.status) {
          setData(result.data.data);
          dispatch(addDataToRedux(result.data.data, isSerching));
          _page === 0 && mode && dispatch(addDataToRedux([], isSerching))
          setFetching(false);
          setLoading(false);
          setFetchDoctorsData(false);
          isSerching ? setActiveOption(2) : setActiveOption(1);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const _getDataFromLocalStore = async () => {
    await AsyncStorage.getItem('userData', (err, result) => {
      // console.log('**********');
      // console.log(result);
      if (result !== null) {
        // props.navigation.navigate('Auth');
        // setUser(result);
        result = JSON.parse(result);
        if (result.mode.localeCompare('doctor') === 0)
          props.navigation.navigate('Doctor');
      }
    });
  };

  useEffect(() => {
    dispatch(fetchDoctors())
    // _getData('Top Doctors');
    _getDataFromLocalStore();
    setPage(page + 1);
    _fetchData(search, page);
  }, [mode]);

  const handelSearchInput = _text => {
    console.log(_text);
    setSearch(_text);
  };

  const handelSearchSubmit = () => {
    // console.log('search');
    // _getSearchData(search, 'Search');
    _fetchData(search, 0);
  };

  const handelMode = () => {
    setMode(!mode);
    console.log('----------------------')
    console.log(mode)
    _fetchData(search, 0);
  };

  const _fetch = () => {
    console.log('ennnnnd');
  };

  function enableSomeButton() {
    console.log('load more');
    setFetchDoctorsData(true);
    if (!fetchDoctorsData) {
      switch (activeOption) {
        case 1:
          setPage(page + 1);
          _fetchData(search, page);
          setSection('Top Doctors');
          // setPage(0)
          break;
        case 2:
          _fetchData(search, page);
          setSection('Search');
          setPage(0);
          break;
      }
    }
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView
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
          <Section name={section} data={doctors} nav={props} fetch={_fetch} />
        </View>
        {isFetching && (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 11,
              fontWeight: '300',
              marginBottom: 20,
            }}>
            Fetching doctors..
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
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
                  schedule={getRecent3(item.item)}
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

// const Section = props => {
//   return (
//     <View style={section.container}>
//       <View style={section.header}>
//         <Text style={section.heading}>{props.name}</Text>
//         <TButton
//           title={'view all'}
//           onClick={() =>
//             props.nav.navigation.navigate('doctorSlider', {name: props.name})
//           }
//         />
//       </View>
//       <View style={section.doc_container}>
//         <FlatList
//           data={props.data}
//           renderItem={(item, index) => {
//             console.log(item.item._id);
//             return (
//               <DoctorOption
//                 name={item.item.basic.name}
//                 tag={item.item.specialty || 'Unknown'}
//                 key={item.item._id}
//                 isActive={item.isActive}
//                 nav={props.nav}
//                 id={item.item._id}
//                 schedule={getRecent3(item.item)}
//               />
//             );
//           }}
//           keyExtractor={(item, index) => String(index)}
//         />
//       </View>
//     </View>
//   );
// };
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
