import CreateChatSection from './CreateChatSection';
import ActiveChatSection from './ActiveChatSection';
import '../assets/Messaging.css';
import NoChatsLabel from './NoChatsLabel';
import { useConversations } from '../../../context/ConversationsProvider';

const Messaging = () => {
	const { selectedConversation } = useConversations();
	return (
		<div className="MessagingPageContainer">
			<div className="CreateChatChannel">
				<CreateChatSection />
			</div>
			{!selectedConversation ? (
				<NoChatsLabel />
			) : (
				<div className="NewChatSection">
					<ActiveChatSection />
				</div>
			)}
		</div>
	);
};

export default Messaging;
