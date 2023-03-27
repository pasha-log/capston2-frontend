import './HomePage.css';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import InstapostApi from './Api';
import { Button } from 'reactstrap';

const SuggestionsBox = () => {
	const [ notFollowedUsers, setNotFollowedUsers ] = useState();
	const { currentUser, follow } = useContext(CurrentUserContext);

	useEffect(() => {
		const getAllUsersNotFollowed = async () => {
			const users = await InstapostApi.findAllUsers();
			setNotFollowedUsers(users?.users?.slice(0, 5));
		};
		getAllUsersNotFollowed();
	}, []);

	return (
		<div className="card">
			<h4>Suggestions For You</h4>
			{notFollowedUsers?.map((user) => {
				return (
					<div className="HomePageTop" key={user.username}>
						<div className="userDetails">
							<div className="profilepic">
								<div className="profile_img">
									<div className="image">
										<img src={user.profileImageURL} alt="" />
									</div>
								</div>
							</div>
							<h3>
								{user.username}
								<br />
								<span>Follow them</span>
							</h3>
						</div>
						<div>
							<Button onClick={() => follow(currentUser?.username, user.username)} className="follow">
								follow
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default SuggestionsBox;
