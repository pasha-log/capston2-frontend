import './static/HomePage.css';
import { useState, useEffect } from 'react';
import InstapostApi from './Api';
import UserCard from './UserCard';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const SuggestionsBox = () => {
	const [ notFollowedUsers, setNotFollowedUsers ] = useState();
	const { newFollow } = useContext(CurrentUserContext);

	useEffect(() => {
		const getAllUsersNotFollowed = async () => {
			const users = await InstapostApi.findAllUsers();
			setNotFollowedUsers(users?.users?.slice(0, 5));
		};
		getAllUsersNotFollowed();
	}, [ newFollow ]);

	return (
		<div className="card">
			<h4>Suggestions For You</h4>
			{notFollowedUsers?.map((user) => {
				return (
					<UserCard user={user} key={user.username}/>
				);
			})}
		</div>
	);
};

export default SuggestionsBox;
