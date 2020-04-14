import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {text, color} from '../../../config/styles/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';

const TopNavbar2 = (props) => {
  useEffect(() => {
    // console.log(props);
  });

  return (
    <View style={[topNavBar_styles.top_bar, props.style]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          alignItems: 'center',
        }}>
            {
                props.noback ?
                    <Icons
                        name={"home"}
                        color={color.brand_color}
                        size={30}
                        onPress={() => props.nav.navigation.navigate('homeScreen')}
                    />
                    :
                    <Icon
                        name={"ios-arrow-round-back"}
                        color={color.brand_color}
                        size={35}
                        onPress={() => props.nav.navigation.goBack(null)}
                    />
            }

        <TouchableOpacity
          onPress={() => props.nav.navigation.navigate('Setting')}>
          <Image
            source={
              props.mode
                ? require('../../../assets/icons/Menu_white.png')
                : require('../../../assets/icons/Menu.png')
            }
            style={topNavBar_styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
export default React.memo(TopNavbar2);
