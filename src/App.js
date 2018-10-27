import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import './App.css';
      // Initialize Firebase
var config = {
 apiKey: "AIzaSyAqYa8XE2K3E9JQehwCJuDxbdTrt-QWubc",
  authDomain: "bloc-chat-react-byce-cc325.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-byce-cc325.firebaseio.com",
  projectId: "bloc-chat-react-byce-cc325",
  storageBucket: "bloc-chat-react-byce-cc325.appspot.com",
  messagingSenderId: "1082863421108"
};
firebase.initializeApp(config);

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> bloc chat react </h1>
        </header>
        <RoomList firebase={ firebase }/>
      </div>
    );
  }
}

export default App;
