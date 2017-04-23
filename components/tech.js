'use strict';

import React, { Component } from 'react';
import {
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
  Dimensions,
  Modal,
  PixelRatio
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Router, Scene} from 'react-native-router-flux'

var ScrollableTabView = require('react-native-scrollable-tab-view');
import * as Animatable from 'react-native-animatable';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

var cheerio = require('cheerio-without-node-native')

var HTMLView = require('react-native-htmlview')
var SummaryTool = require('node-summary');


//News API
const newsKey = 'apiKey=#########'
const headlines = 'https://newsapi.org/v1/articles?source=the-verge&'+newsKey

//Categories
var newsCategories = [
  'TOP',
  'SPORTS',
  'BIZ',
  'TECH',
  'WORLD',
  'FINANCE'
]

class Tech extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: ds,
      dataSourceNews: ds, 
      newsCategories: ds.cloneWithRows(newsCategories),
      selectedCategory: 'TOP',
      selectedArticle: '',
      currentPage: 'Main',
      selectedIndex: 1,
      imageLead: '',
      articleHtml: '',
      modalVisible: false,
      articleData: '',
      dataType: '',
      title: ''
    }
    this._renderSelected = this._renderSelected.bind(this)
    this._renderContent = this._renderContent.bind(this)
    this._renderNews = this._renderNews.bind(this)
    this._viewSelector = this._viewSelector.bind(this)
  }

  componentDidMount(){
    this.fetchData();
    this._viewSelector();
    this.setState({
      currentPage: 'Main',
      selectedIndex: 1
    })
  }

  fetchData() {
    fetch(headlines)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSourceNews: this.state.dataSource.cloneWithRows(responseData.articles),
          loaded: true,
        })
      })
      .done();
  }

  render() {
      return (
        <View style={styles.container}>     
          <View style={styles.bigLine} />
          {this._renderContent()}                       
        </View>
    )
  }

  _renderArticle(url, title){
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        var art = cheerio.load(text);
        var body = art('.c-entry-content').find('p').toArray().map((p) => {
          var mi = art.html(p)
          return mi
        }).join('')

        var text = body
        this.setState({
          articleText: text
        })
      })
      .done();
    console.log(this.state.articleHtml)
  }  

    _renderSelected(){
      return(
      <ListView style={styles.scrollViewHoriz}
          directionalLockEnabled={true}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          dataSource={this.state.newsCategories}
          renderRow={this._renderCategories}
      />          
      )
    }

    _renderContent(){
      if(this.state.currentPage == 'Main'){
        return(
        <ListView style={styles.scrollView}
          dataSource={this.state.dataSourceNews}
          renderRow={this._renderNews}
          showsVerticalScrollIndicator={false}
        />
      )
    }else if(this.state.currentPage == 'Article'){
      return(
      <View style={{paddingTop: 22, backgroundColor: 'transparent'}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          >
          <TouchableOpacity onPress={() => this.setState({
            currentPage: 'Main',
            articleHtml: '',
            articleText: '',
            modalVisible: false})}>
            <Text style={styles.backButton}>Close&nbsp;<Icon name="md-close-circle" size={15} color="white" /></Text>
          </TouchableOpacity>
          <View style={styles.segCtrl}>
            <SegmentedControlIOS
              values={['Web', 'Bolt']}
              selectedIndex={this.state.selectedIndex}
              tintColor={"cornflowerblue"}
              onChange={(event) => {
                console.log(this.state.selectedIndex)
                this._viewSelector();
                this.setState({
                  selectedIndex: event.nativeEvent.selectedSegmentIndex
                })
              }}
            />
          </View>
          {this._viewSelector()}
        </Modal>
      </View>
      )
    }
    }

    _viewSelector(){
      var myJs = 'document.querySelector("*").style.fontFamily = "arial"; document.querySelector("img").hide();'
      if(this.state.selectedIndex === 1){
        return(
          <WebView
            source={{html: this.state.articleText}} 
          />
          )
      }else{
        return(
          <WebView
            source={{uri: this.state.selectedArticle}} 
          />
        )
      }
    }

    _renderNews(news, sectionID, rowID){
      if(rowID%10 === 0){
      return(
        <Animatable.View animation="fadeIn">
        <TouchableOpacity onPress={() => {this.setState({currentPage: 'Article', 
          selectedArticle: news.url, 
          imageLead: news.urlToImage,
          modalVisible: true,
          });
          this._renderArticle(news.url);
          }} 
          style={styles.excerciseBig}>
            <Image style={styles.excerciseImageBig} source={{uri: news.urlToImage}}>
            <View style={styles.overlay} />
              <Text style={styles.subText2Big}>
                {news.title}
              </Text>
            </Image>          
      </TouchableOpacity> 
      </Animatable.View>
      )
    }else{
      return(
        <Animatable.View animation="fadeIn">
        <TouchableOpacity onPress={() => {this.setState({currentPage: 'Article', 
          selectedArticle: news.url, 
          title: news.title,
          imageLead: news.urlToImage,
          modalVisible: true,
          });
          this._renderArticle(news.url, news.title);
          }
          } 
          style={styles.excercise}>
            <Image style={styles.excerciseImage} source={{uri: news.urlToImage}} />
              <Text style={styles.subText2}>
                {news.title}
              </Text>         
      </TouchableOpacity> 
      <View style={styles.bigLine} />
      </Animatable.View>        
      )
    }
    }

    _onChange(value){
      this.setState({selectedCategory: value})
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
    color: 'black',
    fontSize: 12,
    paddingTop: ((screenWidth / 2) / 1.1),
    backgroundColor: 'rgba(0,0,0,0)'
  },
  subText2: {
    fontFamily: 'Futura-Medium',
    color: 'black',
    fontSize: 12,
    marginRight: (screenWidth / 2),
    marginLeft: 20,
    marginTop: 15
  },
  subText2Big: {
    fontFamily: 'Futura-Medium',
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 10,
    marginTop: 180,
    marginRight: 10,
  },  
  articleLead: {
    color: 'white',
    fontFamily: 'Futura-CondensedExtraBold',
    fontSize: 300,
    paddingTop: 300,
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
    height: (screenWidth/ 4),
    width: (screenWidth),
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row'
  },
  excerciseBig: {
    height: (screenWidth/ 1.5),
    width: (screenWidth),
  },  
  excerciseImage: {
    resizeMode: 'cover',
    height: (screenWidth/ 4),
    width: (screenWidth / 3),
    marginLeft: 5,
    borderRadius: 5 / PixelRatio.get(),
  },
  excerciseImageBig: {
    resizeMode: 'cover',
    height: (screenWidth/ 1.5),
    width: (screenWidth),
  },  
  bigLine: {
    height: 0.25,
    width: screenWidth / 1.1,
    marginLeft: 10,
    backgroundColor: 'grey'
  },
  scrollView: {
    height: screenHeight,
    marginTop: -2,
    marginBottom: 113,
  },
  scrollViewHoriz: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  webView: {
    width: screenWidth,
    height: screenHeight
  },
  backButton: {
    fontFamily: 'Futura-CondensedExtraBold',
    fontSize: 20,
    color: 'white',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: 'grey',
    marginTop: 20
  },
  segmentedControl: {
    width: screenWidth
  },
  modalStyle: {
    paddingTop: 10,
    backgroundColor: 'transparent'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.4)',
    height: (screenWidth/ 1.5),
    width: (screenWidth),
    position: 'absolute',   
  },
  segCtrl: {
    width: screenWidth/2,
    marginLeft: screenWidth/4,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'transparent'
  }
});

module.exports = Tech