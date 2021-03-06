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
  Image,
  TouchableHighlight,
  DialogManagerAndroid,
  ToastAndroid,
  Dimensions,
  View
} from 'react-native';

const  WINDOW_WIDTH = Dimensions.get('window').width;
const  WINDOW_HEIGHT = Dimensions.get('window').height;

class SettingPage extends Component {
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#f5f5f5',alignItems:'center',justifyContent:'center'}}>
      
        <Image style={{width:100,height:100,borderRadius:10}} source={require('./image/ic_launcher.png')}/>
           <TouchableHighlight  onPress={() =>this.showDialog()} underlayColor='#fff'>
              <Text style={{fontSize:20 ,fontWeight:'bold',color:'#272822'}}>煎蛋RN</Text>
            </TouchableHighlight>
        
        <View style={{margin:10,backgroundColor:'white',borderRadius: 4,padding:10}}>
          <Text style={{color:'#272822',fontSize:16}}>煎蛋ReactNative版android客户端</Text>
          <Text style={{color:'#272822',fontSize:16}}>相关内容来源:</Text>
          <Text style={{color:'#272822',fontSize:16}}>煎蛋www.jandan.net</Text>
          <Text style={{color:'#272822',fontSize:16}}>赵凯强 http://blog.csdn.net/zhaokaiqiang1992/article/details/45038125</Text>
          <Text style={{color:'#272822',fontSize:16}}>煎蛋的开发者DanielWangDev http://m.weibo.cn/u/1749949233</Text>
          <Text style={{color:'#272822',fontSize:16}}>developer：</Text>
          <Text style={{color:'#272822',fontSize:16}}>习诗伟</Text>
          <Text style={{color:'#272822',fontSize:16}}>organization:</Text>
          <Text style={{color:'#272822',fontSize:16}}>自达康（北京）科技有限公司</Text>
          <Text style={{color:'#272822',fontSize:16}}>www.renjk.com</Text>
        </View>
 
      </View>

    );
  }

  showDialog(){
     // ReadableMap options,
     //  Callback errorCallback,
     //  Callback actionCallback
     
     /* DialogManagerAndroid.showAlert({
        title:'jandan',message:'conetnt message',buttonPositive:'ok',buttonNegative:'cancel'},
        ()=>onError(),()=>onAction());*/
  }

  onError(){
      ToastAndroid.show('error ',1000);
  }

  onAction(){
      ToastAndroid.show('action',1000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default SettingPage;
