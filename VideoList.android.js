/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  RefreshControl,
  TouchableHighlight,
  ToastAndroid,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import LoadingView from './LoadingView';
import NewsPage from './NewsPage';
import LoadingMoreView from './LoadingMoreView';
import VideoPage from './VideoPage';
const WINDOW_WIDTH = Dimensions.get('window').width;


const url = "http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_video_comments&page=";

let pageIndex = 1;
class VideoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      loadMore: false,
      newContent: null,

    };
  }

  componentDidMount() {
    this.fetchNewsData();
  }

  render() {
    if (!this.state.loaded) return (<LoadingView/>);
    return (
      <View style={{backgroundColor:'white',flex:1}}>
      < ListView contentContainerStyle = {
        styles.list
      }
      dataSource = {
        this.state.dataSource
      }

      renderRow = {
        (newsItem) => this.renderNewsItem(newsItem)
      }
      onEndReached = {
        () => this.loadmore()
      }
      onEndReachedThreshold = {
        60
      }
      renderFooter = {
        () => this.renderFooter()
      }
      refreshControl = {
        <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={()=>this.onRefresh()}
              colors={['#272822']}/>
      }
      />
      </View>

    );
  }

  renderFooter() {
    // return(this.state.loadmore?<LoadingMoreView/>:null);
    /* <View style={{flex:1,flexDirection :'row',alignItems:'center',paddingLeft:10,paddingRight:10}}>
                <Text style = {{fontSize:12,color:'#272822',paddingRight:10,fontWeight:'bold'}}>{newsItem.comment_author}</Text>
                <Text style={{fontSize:10}}>{newsItem.comment_date}</Text>
          </View> */

  }

  renderNewsItem(newsItem) {

    if (!newsItem.videos[0]) return null;
    return (
      <TouchableOpacity  style={{backgroundColor:'white',height:110}} underlayColor='white' onPress={()=>this.pressRow(newsItem.comment_content,newsItem.videos[0].title)}>
        <View style={styles.item}>

         <View style={{alignItems:'center'}}>
                <Image  source={{uri:newsItem.videos[0].thumbnail}}
                        style={{height:70,width:98,borderRadius:5}}>
                </Image>

          </View>
          <View style={{paddingLeft:5,paddingRight:5}}>
                 <Text style={{fontSize:12,justifyContent:'center'}} numberOfLines={2}>{newsItem.videos[0].title}</Text>
          </View>


        </View>
      </TouchableOpacity >

    );
  }


  onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    this.fetchNewsData();
  }

  fetchNewsData() {
    pageIndex = 1,
      fetch(url + pageIndex)
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({
          newContent: responseData.comments,
          dataSource: this.state.dataSource.cloneWithRows(responseData.comments),
          loaded: true,
          isRefreshing: false
        });
      }).catch((err) => {
        ToastAndroid.show(err.message, 1000)
      })
      .done();
  }

  loadmore() {
    if (this.state.loadmore) return;
    this.setState({
      loadmore: true
    });
    pageIndex++;
    fetch(url + pageIndex)
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({
          newContent: [...this.state.newContent, ...responseData.comments],
          dataSource: this.state.dataSource.cloneWithRows(this.state.newContent),
          loaded: true,
          isRefreshing: false,
          loadmore: false
        });
      }).catch((err) => {
        ToastAndroid.show(err.message, 1000)
      })
      .done();
  }


  pressRow(url, title) {
    this.props.navigator.push({
      title: 'VideoPage',
      name: 'VideoPage',
      params: {
        url: url,
        title: title
      }
    });
  }


}

const styles = StyleSheet.create({

  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  item: {
    height: 100,
    width: 100,
    flexDirection: 'column',
    margin: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#A8AFB3',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default VideoList;
