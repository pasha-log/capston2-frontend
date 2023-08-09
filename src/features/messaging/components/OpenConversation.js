import React, { useCallback } from 'react';
import '../assets/OpenConversation.css';

export default function OpenConversation({ selectedConversation }) {
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	return (
		<div className="OpenConvoContainer">
			<div className="OpenConvo">
				<div className="OpenConvoMessages">
					{selectedConversation.messages.map((message, index) => {
						const lastMessage = selectedConversation.messages.length - 1 === index;
						return (
							<div
								ref={lastMessage ? setRef : null}
								key={index}
								id="MessageDiv"
								className={`${message.fromMe ? 'FromMeMessageDiv' : 'NotFromMeMessageDiv'}`}
							>
								<div
									id="MessageTextContainer"
									className={`${message.fromMe ? 'FromMeMessage' : 'NotFromMeMessage'}`}
								>
									{message.text}
								</div>
								<div className={`${message.fromMe ? 'MessageSenderTag' : ''}`}>
									{message.fromMe ? 'You' : message.senderName}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
