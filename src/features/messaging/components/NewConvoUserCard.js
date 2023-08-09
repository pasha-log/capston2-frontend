import '../assets/NewConvoUserCard.css';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';

const NewConvoUserCard = ({ user }) => {
	const { setPotentialNewChatUser } = useContext(CurrentUserContext);

	const handleNewChatUserClick = () => {
		setPotentialNewChatUser(user);
	};

	return (
		<div onClick={() => handleNewChatUserClick()} className="NewConvoUserContainer">
			<div className="NewConvoUserImage">
				<img className="ConvoUserImage" src={user.profileImageURL} alt="" />
			</div>
			<h3>
				{user.username}
				<br />
				<span className="UserCardFullName">{user.fullName}</span>
			</h3>
		</div>
	);
};

export default NewConvoUserCard;
