import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  SafeAreaView,
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
import {useSelector, useDispatch} from 'react-redux'
import {addDataToRedux} from '../../redux/action/dataStore'


const Home = props => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState({duration: 3});
  const [tougle, setTougle] = useState(true);

  const handleChange = () => {
    setTougle(!tougle);
  };

  useEffect(() => {
    const _getData = () => {
      axios
        .post(`${Host}/doctors/search`)
        .then(result => {
          if (result.status) {
            console.log(result.data.data);
            setData(result.data.data);
            dispatch(addDataToRedux(result.data.data))
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    _getData();
  }, [loading]);

  const handelSearchInput = _text => {
    console.log(_text);
    setSearch(_text);
  };

  const handelSearchSubmit = () => {
    console.log('search');
    props.navigation.navigate('searchScreen', {mySearch: search});
  };

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: color.background}}>
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
          <Switch
            thumbColor={true ? '#fff' : '#fff'}
            trackColor={{false: color.brand_color, true: color.brand_color}}
            onChange={handleChange}
            checked={true}
          />
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
          <Section name={'Top Doctors'} data={data} nav={props} />
        </View>
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
  useEffect(() => {});

  return (
    <View style={section.container}>
      <View style={section.header}>
        <Text style={section.heading}>{props.name}</Text>
        {/* <TButton
          title={'view all'}
          onClick={() =>
            props.nav.navigation.navigate('allDoctorScreen', {name: props.name})
          }
        /> */}
      </View>
      <View style={section.doc_container}>
        {props.data.map((item, index) => {
          if (index >= 6) return;
          return (
            <DoctorOption
              name={item.basic.name}
              tag={item.taxonomies.desc || item.identifiers.desc || 'unknown'}
              key={index}
              isActive={item.isActive}
              nav={props.nav}
              id={item._id}
            />
          );
        })}
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

export default Home;
