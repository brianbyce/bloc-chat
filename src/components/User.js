import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);
		this.state={currentUser:null};
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged(user => {
			this.setState({ currentUser: user});
		});
	}

	signIn() {
  		const provider = new this.props.firebase.auth.GoogleAuthProvider();
  		this.props.firebase.auth().signInWithPopup(provider).then((result) => {
    		const user = result.user;
    		this.props.currentUser(user);
  		});
	}

	signOut() {
		this.props.firebase.auth().signOut().then(() => {
			this.props.currentUser(null);
		});
	}

	render() {
		return(
			<div>
				<button onClick = {this.signIn}> Sign In </button>
				<button onClick = {this.signOut}> Sign Out </button>
				<div>{this.state.currentUser || 'Guest'}</div>
			</div>
		);
	}
}

export default User;