import { useConversations } from '../../../context/ConversationsProvider';
import '../assets/NewConvoUserCard.css';

const Conversations = () => {
	const { conversations, selectConversationIndex } = useConversations();
	console.log(conversations);
	return (
		<div className="ConversationRecipientCard">
			{conversations.map((conversation, index) => (
				<div
					onClick={() => selectConversationIndex(index)}
					className={`NewConvoUserContainer CreateChatUser ${conversation.selected}`}
					key={index}
				>
					{conversation.recipients.map((r, index) => (
						<div className="ConvoUser" key={index}>
							<div className="NewConvoUserImage">
								{/* {console.log(r.profileImageURL)} */}
								<img className="ConvoUserImage" src={r.profileImageURL} alt="" />
							</div>
							<h3>
								{r.username}
								<br />
								<span className="UserCardFullName">{r.fullName}</span>
							</h3>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Conversations;
