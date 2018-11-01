import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);
		this.state={currentUser:null};
		this.signIn = this.signIn.bind(this);
		this.signOn = this.signOut.bind(this);
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged(user => {
			this.setState({ currentUser: user});
		});
	}

	signIn(e) {
		e.preventDefault();
  		const provider = new this.props.firebase.auth.GoogleAuthProvider();
  		this.props.firebase.auth().signInWithPopup(provider).then((result) => {
    		const user = result.user;
    		this.props.currentUser(user);
  		});
	}

	signOut(e) {
		e.preventDefault();
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