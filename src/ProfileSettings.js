import { Button } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';

const ProfileSettings = ({ user, onClickFollow }) => {
	const { currentUser } = useContext(CurrentUserContext);
	return (
		<div className="ProfileUserSettings">
			<h1 className="ProfileUsername">{user?.username}</h1>
			{user?.username === currentUser?.username ? (
				<Button className="btn ProfileEditButton EditProfile">Edit Profile</Button>
			) : (
				<Button
					onClick={() => onClickFollow(currentUser?.username, user?.username)}
					className="btn ProfileEditButton EditProfile"
				>
					Follow
				</Button>
			)}
			<span className="material-symbols-outlined ProfileSettingsButton">settings</span>
		</div>
	);
};

export default ProfileSettings;
