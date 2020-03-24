import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import NavigationActions from 'react-navigation/src/NavigationActions'

const Setting = (props) => {
    return (
        <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Auth')} style={{backgroundColor: 'pink', padding: 5, margin: 5}}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Auth', {}, NavigationActions.navigate({routeName:'SignUp'}))} style={{backgroundColor: 'pink', padding: 5, margin: 5}}>
                <Text>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Setting
