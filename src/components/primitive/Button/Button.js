import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {button, color} from '../../../config/styles/color';

export default class Button extends Component {
  render() {
    const {
      normal,
      onlyBorder,

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
      normal && styles.normalButton,
      onlyBorder && styles.onlyBorder,
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
        {this.props.deafult ? (
          <Text style={[this.props.t_text ? styles.t_text:  styles.text, ]}>{this.props.title}</Text>
        ) : (
          this.props.children
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // alignSelf: 'center'
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 0,
  },
  normalButton: {
    borderRadius: 30,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: color.brand_color,
    paddingVertical: 11,
    paddingHorizontal: 30
  },
  t_text: {
    color: color.text_on_bg,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.3
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.3
  },
  onlyBorder: {
    borderRadius: 30,
    color: color.text_on_bg,
    fontWeight: 'bold',
    borderColor: color.text_on_bg,
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 20
  },
});
