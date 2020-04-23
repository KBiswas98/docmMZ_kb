import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
 import DoctorTopNavbar from '../../components/prefab/TopNavbar/DoctorTopNavbar';
import {color} from '../../config/styles/color';

const exampleData = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: ` question ${index}`,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));


const data = [
          
          {
                    title: 'question 1 ?'
          },
          {
                    title: 'question 2 ?'
          },
          {
                    title: 'question 3 ?'
          },          
          {
                    title: 'question 4 ?'
          },
          {
                    title: 'question 5 ?'
          },
          {
                    title: 'question 6 ?'
          },
          {
                    title: 'question 7 ?'
          },
          {
                    title: 'question 8 ?'
          },
          {
                    title: 'question 9 ?'
          },
          {
                    title: 'question 10'
          }
]
 
class AllQuestion extends Component {
  state = {
    data: exampleData
  };
 
  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          margin: 10,
          height: 40,
          padding: 10,
          backgroundColor: isActive ? color.brand_color : "white",
          // alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          elevation: 2
        }}
        onLongPress={drag}
      >
        <Text
          style={{
            color: isActive ? color.white_color : color.brand_color,
            fontSize: 14,
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
 
  render() {
    return (
      <View style={{ flex: 1 }}>
      <DoctorTopNavbar />
      <Text style={{
                    fontSize: 16,
                    margin: 20,
                    textAlign: 'center',
                    letterSpacing: 1
      }}> Question set name </Text>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => this.setState({ data })}
        />
      </View>
    );
  }
}

export default AllQuestion;