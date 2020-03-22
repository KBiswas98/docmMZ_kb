import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Tag = (props) => {
    return (
        <View style={tag.container}>
            <Text style={tag.text}>{props.tag}</Text>
        </View>
    )
}

const tag = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#F6F6F4',
        borderRadius: 5,
        margin: 5
    },
    text: {
        color: '#B1B4B9'
    }
})

export default Tag
