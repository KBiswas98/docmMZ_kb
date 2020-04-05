import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
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
  const [tougle, setTougle] = useState(true);
  const [mode, setMode] = useState(false);
  const [section, setSection] = useState('Top Doctors');
  const [isFetching, setFetching] = useState(true);
  const [activeOption, setActiveOption] = useState(1)  // 1- top doc 2- search  3- spaciality
  const [page, setPage] = useState(0)
  const doctors = useSelector(state => state.DataStoreReducer.data);




  const _fetchData = (search, _page) => {

    const isSerching = search.length > 0
    console.log('--------------------------------')
    console.log(isSerching)
    setFetching(true)

    const param = {
      filter: {
        name: search,
      },
      dataquery: {
        page: _page,
        size: 5,
      },
    }

    console.log(`searchPage: ${searchPage} and page: ${_page}`)
     axios
    .post(`${Host}/doctors/searchlite`, param)
    .then(result => {
      console.log(result)
      if (result.status) {
        setData(result.data.data);
        dispatch(addDataToRedux(result.data.data, isSerching));
        setFetching(false);
        setLoading(false);
        isSerching ? setActiveOption(2) : setActiveOption(1)
      }
    })
    .catch(err => {
      console.log(err);
    });

  }


  const _getSearchData = async (name) => {
    searchPage = 0
    setFetching(true);
    const param = {
      filter: {
        name: name,
      },
      dataquery: {
        page: searchPage++,
        size: 5,
      },
    };

    await axios
      .post(`${Host}/doctors/searchlite`, param)
      .then(result => {
        console.log(result)
        if (result.status) {
          setData(result.data.data);
          dispatch(addDataToRedux(result.data.data, true));
          setFetching(false);
          setLoading(false);
          setActiveOption(2)
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const _getData = async () => {
    setFetching(true);
    const param = {
      filter: {
        name: '',
      },
      dataquery: {
        page: page++,
        size: 5,
      },
    };

    await axios
      .post(`${Host}/doctors/searchlite`, param)
      .then(result => {
        if (result.status) {
          console.log('-****************************');
          console.log(result.data.data);
          console.log('-****************************');
          setData(result.data.data);
          dispatch(addDataToRedux(result.data.data));
          setFetching(false);
          setLoading(false);
          setActiveOption(1)
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // _getData('Top Doctors');
    setPage(page + 1)
    _fetchData(search,page)
  }, [loading, setFetching]);

  const handelSearchInput = _text => {
    console.log(_text);
    setSearch(_text);
  };

  const handelSearchSubmit = () => {
    console.log('search');
    // _getSearchData(search, 'Search');
    _fetchData(search, 0)
  };

  const handelMode = () => {
    setMode(!mode);
  };

  const _fetch = () => {
    console.log('ennnnnd');
  };

  function enableSomeButton() {
    console.log('load more');
    switch(activeOption) {
      case 1: 
      _fetchData(search, page)
        setSection('Top Doctors')
        setPage(0)
        break;
      case 2: 
      _fetchData(search, page)
        setSection('Search')
        setPage(0)
        break;
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
    <SafeAreaView style={{backgroundColor: color.background}}>
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
          {/* <Switch
            style={{marginTop: 15}}
            thumbColor={true ? '#fff' : '#fff'}
            trackColor={{false: color.brand_color, true: color.brand_color}}
            onChange={handleChange}
            checked={true}
          /> */}
          <Switch option1="Patient" option2="Doctor" onClick={handelMode} />
          {/* <Switch
          thumbColor={true ? '#fff' : '#fff'}
          trackColor={{false: color.brand_color, true: color.brand_color}}
          style={topNavBar_styles.switch}
        /> */}
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
          <Section
            name={ section }
            data={doctors}
            nav={props}
            fetch={_fetch}
          />
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

// const SearchBar = props => {
//   return (
//     <View style={search.container}>
//       <Icon
//         name="search"
//         color="#fff"
//         size={25}
//         style={search.placeholder_icon}
//       />
//       <TextInput
//         style={search.input}
//         onChangeText={text => props.onChange(text)}
//         placeholder="Search by on conditions, symptoms..."
//       />
//       <TouchableOpacity style={search.button} onPress={props.onSubmit}>
//         <Text style={{color: '#fff', fontWeight: 'bold'}}>Show result</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const search = StyleSheet.create({
//   container: {
//     margin: 20,
//     borderRadius: 10,
//     backgroundColor: '#855FBF',
//     marginTop: 20,
//     marginBottom: 20,
//     padding: 30,
//     display: 'flex',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     // borderWidth: 1,
//     color: '#fff',
//     borderRadius: 5,
//     width: '100%',
//     paddingLeft: 40,
//     backgroundColor: '#A16FC4',
//   },
//   button: {
//     color: '#fff',
//     marginTop: 20,
//   },
//   placeholder_icon: {
//     position: 'absolute',
//     left: 38,
//     top: 38,
//     opacity: 1,
//     zIndex: 10,
//     opacity: 0.5,
//   },
// });

const Section = props => {
  useEffect(() => {
    // console.log(props.data)
  });

  return (
    <View style={section.container}>
      <View style={section.header}>
        <Text style={section.heading}>{props.name}</Text>
        <TButton
          title={'view all'}
          onClick={() =>
            props.nav.navigation.navigate('doctorSlider', {name: props.name})
          }
        />
      </View>
      <View style={section.doc_container}>
        <FlatList
          data={props.data}
          renderItem={(item, index) => {
            console.log(item.item._id);
            return (
              <DoctorOption
                name={item.item.basic.name}
                tag={item.item.specialty || 'Unknown'}
                key={item.item._id}
                isActive={item.isActive}
                nav={props.nav}
                id={item.item._id}
                schedule={getRecent3(item.item)}
              />
            );
          }}
          onEndReachedThreshold={0.6}
          onEndReached={e => {
            console.log('o my god');
          }}
          keyExtractor={(item, index) => String(index)}
        />

        {/* {props.data.map((item, index) => {
          // if (index >= 6) return;
          return (
            <DoctorOption
              name={item.basic.name}
              tag={item.specialty || 'Unknown'}
              key={index}
              isActive={item.isActive}
              nav={props.nav}
              id={item._id}
              schedule={getRecent3(item)}
            />
          );
        })} */}
      </View>
    </View>
  );
};
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
