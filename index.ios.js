/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Actions, Scene, Router} from 'react-native-router-flux';

// Initialize Firebase


const Main = require('./components/main')


class thiotha extends Component {
  render() {
    return (
      <Main />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('thiotha', () => thiotha);
