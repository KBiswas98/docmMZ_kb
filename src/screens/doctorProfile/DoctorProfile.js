/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { text } from '../../config/styles/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';

const DoctorProfile = (props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View>
      <TopNavBar nav={props} heading={props.heading} />
      <ProfileBox nav={props} />
      <MapPart nav={props}/>
      <DoctorsActivity nav={props}/>
    </View>
    </ScrollView>
  );
}


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

const ProfileBox = props => {
  return (
    <View style={ProfileBoxStyle.container}>
      <View style={ProfileBoxStyle.row_Box}>
        <Image style={ProfileBoxStyle.profile_pic}
          source={require('../../assets/images/doc.jpg')} />
        <View style={ProfileBoxStyle.actionHolder}>
          <TouchableOpacity style={{ backgroundColor: '#fdddb1', borderRadius: 13, marginLeft: 7 }} >
            <Icon
              name="chat"
              size={22}
              color={"#f9a025"}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#b2eaf1', borderRadius: 13, marginLeft: 7 }} >
            <IconM
              name="call"
              size={22}
              color={"#0ab9d0"}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#d5d4d3', borderRadius: 13, marginLeft: 7 }} >
            <Icon
              name="video"
              size={22}
              color={"#555453"}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[ProfileBoxStyle.row_Box, { justifyContent: 'space-between' }]}>
        <Text style={ProfileBoxStyle.name}>{props.nav.navigation.state.params.name}</Text>
        <Text style={ProfileBoxStyle.rating}>
          {props.nav.navigation.state.params.rating ? props.nav.navigation.state.params.rating : 4.4}
        </Text>
      </View>
      <Text style={ProfileBoxStyle.description}>
        {props.nav.navigation.state.params.description ? props.nav.navigation.state.params.description : "Description Text"}
      </Text>
    </View>
  );
}

const ProfileBoxStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  profile_pic: {
    height: 170,
    width: 140,
    borderRadius: 10,
    margin: 5
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionHolder: {
    display: 'flex',
    flexDirection: 'row',
    marginStart: 20,
    marginTop: 30
  },
  rating: {
    backgroundColor: '#ee6002',
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 8,
    // fontSize: 15,
    color: '#0f0f0f',
    fontWeight: "800"
  },
  name: {
    fontSize: 30,
    marginLeft: 30,
  },
  description: {
    margin: 10,
    fontSize: 18,
  }
});

const MapPart = props => {
  return (
    <View style={MapPartStyle.container}>
      <View style={MapPartStyle.row_Box}>
        <Image 
        source={require('../../assets/images/map.jpg')}
        style={MapPartStyle.icon}/>
        <View style={MapPartStyle.columnBox}>
          <View style={[MapPart.row_Box, {flexDirection: 'row', alignItems: "center"}]}>
          <Icon
              name="map"
              size={15}
              color={"#b4b4ad"}
            />
          <Text style={MapPartStyle.headText}>Address</Text>
          </View>
  <Text style={MapPartStyle.description}>
    {props.nav.navigation.state.params.address ? props.nav.navigation.state.params.address : "Address"}
    </Text>

    <View style={[MapPart.row_Box, {flexDirection: 'row', alignItems: "center"}]}>
          <Icon
              name="calendar-text"
              size={15}
              color={"#b4b4ad"}
            />
          <Text style={MapPartStyle.headText}>Daily Practect</Text>
          </View>
  <Text style={MapPartStyle.description}>
    {props.nav.navigation.state.params.practect ? props.nav.navigation.state.params.practect : "Monday - Friday"}
    </Text>
    <Text style={MapPartStyle.description}>
    {props.nav.navigation.state.params.time ? props.nav.navigation.state.params.time : "Open till 7pm"}
    </Text>

          </View>
        </View>
        </View>
        )
}

const MapPartStyle = StyleSheet.create({
  container: {
    position: 'relative',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon:{
    height: 150,
    width: "50%",
  },
  columnBox:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5
  },
  headText:{
    fontWeight: "bold",
    fontSize: 18,
    color: "#6c6c66",
    padding: 5
  },
  description:{
    fontSize: 14,
    color: "#6c6c66",
    marginStart: 10 
  }
})

const DoctorsActivity = props => {
  return (
    <View style={DoctorsActivityStyle.container}>
      <View style={DoctorsActivityStyle.row_Box}>
        <TouchableOpacity style={[DoctorsActivityStyle.box, {backgroundColor: "#02b6ee"}]}>
        <Icon
              name="file-document"
              size={22}
              color={"#fff"}
            />
          <Text style={[DoctorsActivityStyle.text]}>List Of Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[DoctorsActivityStyle.box, {backgroundColor: "#151d64"}]}>
          <Icon
              name="doctor"
              size={22}
              color={"#fff"}
            />
          <Text style={[DoctorsActivityStyle.text]}>Doctor's Daily Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
}
const DoctorsActivityStyle = StyleSheet.create({
  container: {
    position: 'relative',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center'
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box:{
    display: 'flex',
    flexDirection: 'row',
    fontSize: 15,
    width: "48%",
    padding: 30,
    margin: "2%",
    borderRadius: 15,
    alignItems: 'center'
  },
  text:{
    color: "#fff",
    fontWeight: "bold",
    alignItems: 'center',
    textAlign: "center",
    padding: 15,
    paddingLeft: 0,
  }
});
export default DoctorProfile
