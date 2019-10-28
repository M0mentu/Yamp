import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
class MapViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loc: {latitude: 30.1254436, longitude: 31.2725009},
      err: null,
    };
  }
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      //   maximumAge: 60 * 60 * 24,
    };
    this.setState({ready: false});
    console.log('navigator: ', navigator);
    // if (navigator.geolocation) {
    geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      //   geoOptions,
    );
  }
  geoSuccess = postion => {
    this.setState({
      ready: true,
      loc: {
        latitude: postion.coords.latitude + 0.1,
        longitude: postion.coords.longitude + 0.1,
      },
    });
    console.log('Postion: =>', postion);

    // var circle = new google.maps.Circle({
    //     center: geolocation,
    //     radius: position.coords.accuracy
    // });
    //autocomplete.setBounds(circle.getBounds());
    // return circle;
  };
  geoFailure = err => {
    this.setState({ready: true});
    console.log('Error: =>', err);
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 30.0,
            longitude: 32.0,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}>
          <Marker coordinate={this.state.loc}></Marker>
        </MapView>
      </View>
    );
  }
}

export default MapViewComponent;
