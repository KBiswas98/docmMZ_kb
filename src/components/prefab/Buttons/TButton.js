import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const TButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <Text>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

export default TButton
