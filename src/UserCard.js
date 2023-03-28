import { Link } from 'react-router-dom';
import './HomePage.css';
import { Button } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const UserCard = ({ user }) => {
    const { currentUser, follow } = useContext(CurrentUserContext);
    return (
        <div className="HomePageTop" key={user.username}>
			<div className="userDetails">
				<div className="profilepic">
					<div className="profile_img">
						<Link to={`/${user.username}`}>
							<div className="image">
								<img src={user.profileImageURL} alt="" />
							</div>
						</Link>
					</div>
				</div>
				<h3>
					{user.username}
					<br />
					<span>Follow them</span>
				</h3>
			</div>
			<div>
				<Button onClick={() => follow(currentUser?.username, user.username)} className="Follow">
					follow
				</Button>
			</div>
		</div>
    )
}

export default UserCard;