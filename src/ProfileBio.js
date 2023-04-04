import './static/Profile.css';

const ProfileBio = ({ user }) => {
	return (
		<div className="ProfileBio">
			<p>
				<span className="ProfileRealName">{user?.fullName}</span> {user?.bio}
			</p>
		</div>
	);
};

export default ProfileBio;
