import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
	
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) });
		});
	}

	createRoom() {

	}

	handleSubmit(e) { e.preventDefault();
	}

	render() {
		return (
			<section>
				<ul>
				{
					this.state.rooms.map((room, index) =>
						<li key={index}>
							<h1>{room.name}</h1>
						</li>
					)
				}
				</ul>
				
		
			</section>
		);


	}
	
}

export default RoomList;
