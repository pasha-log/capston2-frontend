import { Button } from 'reactstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../../context/CurrentUserContext';
import '../assets/Profile.css';

const ProfileSettings = ({ user }) => {
	const { currentUser, follow, unfollow, toggle, nprogress } = useContext(CurrentUserContext);
	const onEditClick = () => {
		nprogress.start();
	}
	return (
		<div className="ProfileUserSettings">
			<h1 className="ProfileUsername">{user?.username}</h1>
			{user?.username === currentUser?.username ? (
				<Link to='/edit' onClick={onEditClick}>
					<Button className="btn ProfileEditButton EditProfile">Edit Profile</Button>
				</Link>
			) : (
				currentUser?.following?.find(u => u.username === user?.username) ?
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
			{user?.username === currentUser?.username ? (
				<span onClick={toggle} style={{fontSize: "3rem"}} className="material-symbols-outlined ProfileSettingsButton">settings</span>
				) : (
				<span style={{fontSize: "3rem"}} className="material-symbols-outlined DifferentAccountSettings">more_horiz</span>
			)}
		</div>
	);
};

export default ProfileSettings;
