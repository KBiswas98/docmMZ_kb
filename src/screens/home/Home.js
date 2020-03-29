import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Switch,
} from 'react-native';
import {text, color} from '../../config/styles/color';
import Catagory from '../../components/prefab/Catagory/Catagory';
import Icon from 'react-native-vector-icons/Feather';
import TButton from '../../components/prefab/Buttons/TButton';
import DoctorOption from '../../components/prefab/Doctors/DoctorOption';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';
import {_checkLogin, _saveDataToStorage} from '../../config/common/Storage';
import SearchBox from '../../components/primitive/Input/Input';

// const __sortTopDoctors = (doctor1, doctor2) => {
//   let compair = 0;
//   if(doctor1.appointments.length < doctor2.appointments.left){
//     compair = 1;
//   } else if(doctor1.appointments.length > doctor2.appointments.left){
//     compair = -1;
//   }

//   return compair;
// }

const Home = props => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(props);

    // if (_checkLogin) {
    //   console.log('User Logedin');
    // } else {
    //   console.log('Not Login');
    // }

    const _getData = () => {
      axios
        .post(`${Host}/doctors/search`)
        .then(result => {
          if (result.status) {
            console.log(result.data.data);
            setData(result.data.data);
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
    setSearch(_text);
  };

  const handelSearchSubmit = () => {
    // console.log(search);
    props.navigation.navigate('searchScreen', {mySearch: search});
  };

  return loading ? (
    <Text>Loading..</Text>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: color.background}}>
      <TopNavBar />
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
      <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', flex: 1, marginHorizontal: 20, marginVertical: 30}}>
        <SearchBox
          onChange={handelSearchInput}
          onSubmit={handelSearchSubmit}
          icon={'search'}
          
        />
        <Image source={require('../../assets/icons/setting.png')} style={{ width: 20, height: 20, marginLeft: 15, }}/>
      </View>

      <View>
        <Section name={'Top Doctors'} data={data} nav={props} />
        {/* <Section
          name={'Recently Viewed'}
          data={data}
          noViewAll={true}
          nav={props}
        /> */}
      </View>
    </ScrollView>
  );
};

const home_styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
    resizeMode: 'stretch',
  },
});

const TopNavBar = () => (
  <View style={topNavBar_styles.top_bar}>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
      }}>
      <Text style={topNavBar_styles.heading}>Find a</Text>
      <TouchableOpacity>
        <Image
          source={require('../../assets/icons/Menu.png')}
          style={topNavBar_styles.icon}
        />
      </TouchableOpacity>
    </View>
    <View style={topNavBar_styles.holder}>
      <Text style={topNavBar_styles.heading_bold}>doctor</Text>
      <Switch
        thumbColor={true ? '#fff' : '#fff'}
        trackColor={{false: color.brand_color, true: color.brand_color}}
        style={topNavBar_styles.switch}
      />
    </View>
  </View>
);
const topNavBar_styles = StyleSheet.create({
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  top_bar: {
    padding: 15,
    paddingTop: 45,
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 25,
    fontWeight: '300',
    color: '#000',
  },
  heading_bold: {
    fontSize: 45,
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
    height: 16,
    width: 28,
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
