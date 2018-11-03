import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			newRoom: ''
		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
	
	}

	

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) });
		});
	}

	handleChange(e) {
		this.setState({newRoom: e.target.value});
	}

	handleSubmitRoom(e) { 
		e.preventDefault();
		if(this.state.newRoom !== '') {
			this.roomsRef.push({ name: this.state.newRoom });
			this.setState({newRoom: ''});
		};
	}

	render() {
		return (
			<section>
				<ul>
				{
					this.state.rooms.map((room, index) =>
						<li key={index}>
							<button onClick={(e) => this.props.chatRoom(room)}>{room.name}</button>
						</li>
					)
				}
				</ul>
				<form onSubmit={ (e) => this.handleSubmitRoom()}>
					<label>
						Would you like to add a new chatroom?
						<input type="text" value={this.state.newRoom} onChange={ (e) => this.handleChange(e)}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
			</section>
		);


	}
	
}

export default RoomList;
