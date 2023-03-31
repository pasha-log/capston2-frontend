import { Button } from 'reactstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';

const ProfileSettings = ({ user }) => {
	const { currentUser, follow, unfollow } = useContext(CurrentUserContext);
	return (
		<div className="ProfileUserSettings">
			<h1 className="ProfileUsername">{user?.username}</h1>
			{user?.username === currentUser?.username ? (
				<Link to='/edit'>
					<Button className="btn ProfileEditButton EditProfile">Edit Profile</Button>
				</Link>
			) : (
				currentUser?.following.find(u => u.username === user?.username) ?
				<Button
					onClick={() => unfollow(currentUser?.username, user?.username)}
					className="btn ProfileEditButton EditProfile"
				>
					Following
				</Button>
				:
				<Button
					onClick={() => follow(currentUser?.username, user?.username)}
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
