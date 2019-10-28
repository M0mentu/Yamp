import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class test extends Component {
    render() {
        return (
            <View style={{backgroundColor:"red",justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:40,color:"#fff"}}> textInComponent </Text>
            </View>
        )
    }
}

export default test
