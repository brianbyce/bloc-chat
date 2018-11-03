import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			content:'',
			username:'',
			sentAt:''
		};
		this.messageRef = this.props.firebase.database().ref('messages');
	
	}

	componentDidMount() {
		this.messageRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ messages: this.state.messages.concat(message)});
		});
	}

	handleChange(e) {
		e.preventDefault();
			this.setState({
				content: e.target.value,
				sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
				roomId: this.props.chatRoom,
				username: this.props.currentUser
			});
	}

	handleSubmitMessage(e) { 
		e.preventDefault();
		if(this.state.content !== '') {
			this.messageRef.push({ 
				content: this.state.content,
				sentAt: this.state.sentAt,
				username: this.state.username,
				roomId: this.props.roomId
			});
			this.setState({content: '', username:'', sentAt:'', roomId:''});
		}


	}

	render() {
		return (
			<div>
			{ this.props.roomId ?
          	(
			<section>
				<ul>
				{
					this.state.messages.map((message, index) => {
							 if( this.props.roomId === message.roomId) {
								return <li key={index}><h1>{message.content}</h1></li>
							}
								return null;
							}
					)
				}
				</ul>
				<form onSubmit={ (e) => this.handleSubmitMessage(e)}>
					<label>
						Add Message:
						<input type="text" value={this.state.content} onChange={(e) => this.handleChange(e)}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
			</section>
			)
			: (null)
			}
			</div>
		);


	}
	
}

export default MessageList;