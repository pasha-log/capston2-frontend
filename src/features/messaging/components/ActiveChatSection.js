import ChatForm from './ChatForm';
import '../assets/ActiveChatSection.css';
import OpenConversation from './OpenConversation';
import { useConversations } from '../../../context/ConversationsProvider';

const ActiveChatSection = () => {
	const { sendMessage, selectedConversation } = useConversations();
	// console.log(selectedConversation.recipients[0].profileImageURL);

	const recipientProfileImage = selectedConversation.recipients[0].profileImageURL;
	const recipientFirstName = selectedConversation.recipients[0].fullName.split(' ')[0];
	return (
		<div className="ActiveChatContainer">
			<div className="ChatHeader">
				<img className="HeaderUserImage" src={recipientProfileImage} alt="" />
				<h1 className="ChatH1">{recipientFirstName}</h1>
			</div>
			<div className="ChatLayer">
				<OpenConversation selectedConversation={selectedConversation} />
			</div>
			<div className="ChatForm">
				<ChatForm sendMessage={sendMessage} selectedConversation={selectedConversation} />
			</div>
		</div>
	);
};

export default ActiveChatSection;
