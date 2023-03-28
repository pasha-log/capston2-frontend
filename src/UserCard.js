import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
	return (
		<div className="UserCardTop" key={user.username}>
			<div className="UserCardDetails">
				<div className="UserCardProfilePic">
					<div className=".UserCardProfileImage">
						<Link to={`/${user.username}`}>
							<div className="image">
								<img className="UserCardImage" src={user.profileImageURL} alt="" />
							</div>
						</Link>
					</div>
				</div>
				<h3>
					{user.username}
					<br />
					<span>{user.fullName}</span>
				</h3>
			</div>
		</div>
	);
};

export default UserCard;
