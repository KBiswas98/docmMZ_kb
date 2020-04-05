import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const TButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <Text style={{ fontSize: 10, opacity: 0.5}}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

export default TButton
