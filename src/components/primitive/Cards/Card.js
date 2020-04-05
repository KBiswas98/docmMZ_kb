import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {text, color} from '../../../config/styles/color';

class ParalaxCard extends Component {
  componentDidMount() {
    // console.log('--------------------------------------------------')
    // console.log(this.props.data)
    // console.log('--------------------------------------------------')
  }
  render() {
    return (
      <View style={[paralaxcard.container, paralaxcard.shadow]}>
        <ProfileBox nav={this.props} data={this.props.data}/>
      </View>
    );
  }
}

const paralaxcard = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
});

const ProfileBox = props => {
  const data = props.data.item
  return (
    <View style={profilebox.container}>
      <View style={ [profilebox.holder]}>
        <Image
          style={[profilebox.profile_pic]}
          source={require('../../../assets/images/doctorx.png')}
        />
      </View>
      <View style={profilebox.text}>
        <View style={profilebox.detail_container}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              letterSpacing: 0.3,
              color: color.brand_color,
            }}>
            { data.basic.name.toString().substring(0,15)}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
              letterSpacing: 0.2,
              color: color.text_on_bg,
              opacity: 0.65,
            }}>
            Allergists
          </Text>
        </View>
        <View style={profilebox.text_container}>
          <View style={profilebox.about}>
            <Image
              source={require('../../../assets/icons/patient.png')}
              style={profilebox.icon}
            />
            <View style={{marginRight: 20}}>
              <Text style={{fontSize: 15}}>1.5k</Text>
              <Text style={{fontSize: 9, fontWeight: '300', opacity: 0.5}}>
                Patients
              </Text>
            </View>
          </View>
          <View style={profilebox.about}>
            <Image
              source={require('../../../assets/icons/wait.png')}
              style={profilebox.icon}
            />
            <View>
              <Text style={{fontSize: 15}}>5 Years</Text>
              <Text style={{fontSize: 9, fontWeight: '300', opacity: 0.5}}>
                Experience
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const profilebox = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'relative',
    maxHeight: 204
  },
  holder: {
      position: 'relative'
  },
  profile_pic: {
    height: 245,
    width: 245,
    borderRadius: 14,
    position: 'absolute',
    top: -59,
    right: -24,
    zIndex: 1000,
    borderBottomRightRadius: 14,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  text: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 20,
    flex: 1,
  },
  detail_container: {
    display: 'flex',
    width: '100%',
    //   alignItems: 'flex-start',
  },
  text_container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 45,
    alignItems: 'flex-start',
  },
  about: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 18,
    marginRight: 15,
  },
});

export {ParalaxCard};
