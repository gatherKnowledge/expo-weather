import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import {Alert} from 'react-native';
import axios from 'axios';

const API_KEYS = 'a88da88078eed43480acb3a5388d599b';
export default class extends React.Component{
  state = {
    isLoading: true
  };
  getWeather = async (lat, long) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEYS}`;
    const { data } = await axios.get(url);
    console.log(data);
  }
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      // this.setState({ isLoading: false })
      await this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert('you can\'t see me', 'so sad');
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }

}