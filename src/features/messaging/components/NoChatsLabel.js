import { Button } from 'reactstrap';
import CurrentUserContext from '../../../context/CurrentUserContext';
import { useContext } from 'react';
import '../assets/NoChatsLabel.css';

const NoChatsLabel = () => {
	const { toggleNewConvoModal } = useContext(CurrentUserContext);
	return (
		<div className="NoChatsContainer">
			<div className="NoChatsContent">
				<span style={{ fontSize: '4rem' }} className="material-symbols-outlined">
					send
				</span>
				<h2>Your messages</h2>
				<p>Send private messages to a friend.</p>
				<Button className="NoChatsButton" onClick={() => toggleNewConvoModal()}>
					Send Message
				</Button>
			</div>
		</div>
	);
};

export default NoChatsLabel;
