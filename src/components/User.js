import React, { Component } from 'react';


class User extends Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged(user => {
			this.props.userId(user);
		});
	}

	signIn() {
  		const provider = new this.props.firebase.auth.GoogleAuthProvider();
  		this.props.firebase.auth().signInWithPopup(provider).then((result) => {
  			const user = result.user;
    		this.props.userId(user);
    	});
	}

	signOut() {
		this.props.firebase.auth().signOut().then(() => {
			this.props.userId(null);
		});	
		
	}

	render() {
		return(
			<div>
				<button onClick = {this.signIn}> Sign In </button>
				<button onClick = {this.signOut}> Sign Out </button>
				<div>{this.props.currentUser}</div>
			</div>
		)
	}
}

export default User;