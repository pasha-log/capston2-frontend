import './Profile.css';

const ProfileStats = ({ user }) => {
	return (
		<div className="ProfileStats">
			<ul>
				<li key="PostNumber">
					<span className="ProfileStatCount">{user?.posts?.length}</span> posts
				</li>
				<li key="Followers">
					<span className="ProfileStatCount">{user?.followers?.length}</span> {user?.followers?.length === 1 ? 'follower' : 'followers'}
				</li>
				<li key="Following">
					<span className="ProfileStatCount">{user?.following?.length}</span> following
				</li>
			</ul>
		</div>
	);
};

export default ProfileStats;
