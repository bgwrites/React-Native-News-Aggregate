'use strict';

import React, { Component } from 'react';
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
  	StatusBar,
  	Dimensions,
  	TabBarIOS
} from 'react-native';

//Var's & Const's
const Feed = require('./feed')
const Top = require('./top')
const NavigationBar = require('react-native-navbar');

import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

//Render
export default class Main extends React.Component {
  	static title = '<TabBarIOS>';
  	static description = 'Tab-based navigation.';
  	static displayName = 'TabBarExample';

  	state = {
    	selectedTab: 'feedTab',
	}


  	_renderContent = (pageText: string) => {
  		var navStyle = {
  			fontFamily: 'Futura-CondensedExtraBold'
  		}  		
  		var titleConfig = {
  			title: pageText,
  			tintColor: 'black',
  			style: navStyle
  		}
      if (pageText === 'HOME'){
	    	return (
		    	<View style={[styles.tabContent, {backgroundColor: 'white'}]}>	    	
		    		<Feed />
		     	</View>	    		
	    )}
	};

  render() {
    return (
    <View style={styles.container}>   
	        {this._renderContent('HOME')}
    </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  	tabContent: {
  	},
  	tabText: {
    	color: 'slategray',
    	margin: 50,
  	},
  	container: {
  		height: screenHeight,
  	}
});

module.exports = Main