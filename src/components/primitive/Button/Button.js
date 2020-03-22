import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {button} from '../../../config/styles/color'

export default class Button extends Component {
  render() {
    const {
      shadow,

      // color
      active,
      denger,
      dark,

      // size
      lurge,
      medium,
      small,

      link,
      style,

      ...props
    } = this.props;

    const selectProps = [
      styles.button,
      shadow && styles.shadow,
      active && {backgroundColor: button.color_0},
    //   denger && {backgroundColor: color.denger},
    //   dark && {backgroundColor: color.block},
      lurge && styles.lurge,
      medium && styles.medium,
      small && styles.small,
      link && styles.link,
      style,
    ];
    return (
      <TouchableOpacity style={selectProps} onPress={this.props.onClick}>
        {children}
      </TouchableOpacity>
    );
  }
}



const styles = StyleSheet.create({
    button: {
      // alignSelf: 'center'
      borderRadius: 5,
    //   color: '#000'
    }, 
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 20,
    },
    lurge: {
      backgroundColor: button.color_0,
      width: 256,
      height: 60,
      borderRadius: 7,
  
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    medium: {
      width: 206,
      height: 47,
      borderRadius: 7,
  
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    small: {
      width: 150,
      height: 34,
      borderRadius: 7,
  
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    link: {
        backgroundColor: 'transparent',
        margin: 10,
        padding: 0
    }
  });
  