import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { getUserKey } from '../../Helper'
import { connect } from 'react-redux';
import { GetUserInfo } from '../../Actions/UserAction'
import { Actions } from 'react-native-router-flux'
import Loading from '../../Common/Loading'
import LoadingWait from '../../Common/LoadingWait'

export class blank extends Component {
    constructor(props) {
        super(props)

        getUserKey().then((value) => {
            if (value == undefined || value == "") {
                console.log("yeet", value);
                Actions.authmain();
            }
            else {
                this.props.GetUserInfo().then(()=>{
                   Actions.main({type:'reset'});

                })
            }
        }).catch((e) => {
            console.log("no data found", e)
        })


    }
    render() {
        const { ContainerStyle, InnerStyle } = style
        return (
            <View style={ContainerStyle}>
                <View style={InnerStyle}>
                
                    <Loading animationType="fade" visible={true} />
                    <Text style={{ fontSize: 50, color: "#fff" }}> YAMP </Text>
                    

                </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    ContainerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#2A2E43"
    },
    InnerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
        
    }
})
export default connect(null, { GetUserInfo })(blank)
