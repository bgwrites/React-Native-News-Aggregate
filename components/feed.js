'use strict';

import React, { Component } from 'react';
import {
  Animated,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  TouchableOpacity,
  Image,
  ScrollView,
  SegmentedControlIOS,
  Picker,
  WebView,
  ListView,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Router, Scene} from 'react-native-router-flux'

var ScrollableTabView = require('react-native-scrollable-tab-view');
var Top = require('./top')
var Sports = require('./sports')
var Biz = require('./biz')
var Tech = require('./tech')

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

var HTMLView = require('react-native-htmlview')

class Feed extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
		this.state = {
		}
	}
	render() {
	    return (
		    <View style={styles.container}>	    
			    <View style={styles.bigLine} />
			    <ScrollableTabView style={styles.scrollableTable} 
          tabBarTextStyle={{fontFamily: 'Futura-Medium', fontSize: 12}}
          tabBarActiveTextColor='black'
          tabBarUnderlineStyle={{backgroundColor: 'black'}}
          >
			    	<Top tabLabel='TOP' />
            <Sports tabLabel='SPORTS' />
            <Biz tabLabel='BIZ' />
            <Tech tabLabel='TECH' />
			    </ScrollableTabView>		        	     	
		    </View>
		)
  	}
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },
  header: {
  	flexDirection: 'row',
  	marginLeft: 10,
  	alignItems: 'flex-start'
  },
  mainText: {
  	fontFamily: 'Futura-CondensedExtraBold',
  	color: 'black',
  	fontSize: 35,
  	paddingRight: 30,
  },
  subText: {
  	fontFamily: 'Futura-Medium',
  	textAlign: 'center',
  	color: 'white',
  	fontSize: 12,
  	paddingTop: ((screenWidth / 2) / 1.1),
  	marginLeft: 40,
  	marginRight: 40,
  	backgroundColor: 'rgba(0,0,0,0)'
  },
  subText2: {
  	fontFamily: 'Futura-Medium',
  	textAlign: 'center',
  	color: 'white',
  	fontSize: 8,
  	backgroundColor: 'rgba(0,0,0,0)',
  	marginLeft: 10,
  	marginRight: 10,
  },
  articleLead: {
  	color: 'white',
  	fontFamily: 'Futura-CondensedExtraBold',
  	fontSize: 300,
  	paddingTop: 300,
  	flex: 1
  },
  category: {
  	fontFamily: 'Futura-Medium',
  	color: 'deepskyblue',
  	fontSize: 16, 
  	paddingRight: 30, 	
  },
  categoryUnselected: {
  	fontFamily: 'Futura-Medium',
  	color: 'grey',
  	fontSize: 16, 
  	paddingRight: 30, 	
  },     
  excercise: {
  	height: (screenWidth/ 1.5),
  	width: (screenWidth)  
  },
  excerciseImage: {
  	resizeMode: 'cover',
  	height: (screenWidth/ 1.5),
  	width: (screenWidth),
  },
  bigLine: {
  	height: 0.25,
  	width: screenWidth,
  	backgroundColor: 'black'
  },
  scrollView: {
  	height: screenHeight,
  	marginBottom: 113,
  },
  scrollViewHoriz: {
  	backgroundColor: 'rgba(0,0,0,0)',
  },
  overlay: {
  	backgroundColor: 'rgba(0,0,0,.4)',
  	height: (screenWidth/ 1.5),
  	width: (screenWidth),
  	position: 'absolute',  	
  },
  backButton: {
  	fontFamily: 'Futura-CondensedExtraBold',
  	fontSize: 20,
  	color: 'white',
  	flexDirection: 'column',
  	textAlign: 'center',
  	backgroundColor: 'deepskyblue'
  },
  scrollableTable: {
  	marginTop: 15,
  }
});

module.exports = Feed