import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyBvd4cyD-rKCzRuvsOBmm1immclyvhMpcw",
      authDomain: "chat-firebase-32ca3.firebaseapp.com",
      databaseURL: "https://chat-firebase-32ca3.firebaseio.com",
      projectId: "chat-firebase-32ca3",
      storageBucket: "chat-firebase-32ca3.appspot.com",
      messagingSenderId: "69429663860",
      appId: "1:69429663860:web:f6f080986f69e006"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}