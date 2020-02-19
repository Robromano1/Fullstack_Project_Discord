import React from 'react';
import MessageForm from './message_form';

class ChatRoom extends React.Component {
	constructor(props) {
		super(props);

		this.state = { messages: [] };
		this.bottom = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		//Can have own component for App.cable.subscription
		App.currentChannel = App.cable.subscriptions.create(
			{ channel: "ChatChannel" },
			{ 
				received: data => {
					// Instead of setting local this.state, dispatch action to update store
					this.setState({
						messages: this.state.messages.concat(data.message)
					});
					//this.props.requestMessage(data.message)

				},
				speak: function(data) {
					return this.perform("speak", data);
				}
			}
		);
	}

	componentDidUpdate() {
		this.bottom.current.scrollIntoView();
	}

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
		const messageList = this.state.messages.map(message => {
			return (
				<li key={`${message.id}`} className="messageLi">
					{message}
					<div ref={this.bottom}/>
				</li>
			)
		});
		return (
			<div className="chatroom-container">
				<div>ChatRoom</div>
				<div className="message-list">{messageList}</div>
				<MessageForm />
			</div>
		);
	}
}

export default ChatRoom;