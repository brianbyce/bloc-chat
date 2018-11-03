import React, { Component } from 'react';
import * as firebase from 'firebase/';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
  constructor(props){
    super(props);
    this.state = {
      chatRoom: [],
      currentUser: null
    };
    this.userId = this.userId.bind(this);
    this.chatRoom = this.chatRoom.bind(this);
  }

  chatRoom(room) {
      this.setState({ chatRoom: room });
  }

  userId(user) {
    var currentUser = user === null ? "Guest" : user.displayName;
    this.setState({ currentUser: currentUser });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> {this.state.chatRoom.name || 'Please select a chat room to enter!'}</h1>
          <User
            firebase = {firebase}
            userId = {this.userId}
            currentUser = {this.state.currentUser}
          />
        </header>
        <RoomList 
          firebase = { firebase }
          chatRoom = {(e) => this.chatRoom(e)}
        />
        <MessageList
          firebase = { firebase }
          roomId = { this.state.chatRoom.key }
          currentUser = { this.state.currentUser }
        />
      </div>
    );
  }
}

export default App;
