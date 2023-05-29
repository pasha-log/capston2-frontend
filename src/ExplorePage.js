import { useState, useEffect } from 'react';
import InstapostApi from './Api';
import SearchBar from './SearchBar';
import { Button } from 'reactstrap';
import UserCard from './UserCard';
import './assets/ExplorePage.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const ExplorePage = () => {
	const { nprogress, setInnerCommentHTML } = useContext(CurrentUserContext);
	const [ users, setUsers ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ noUsersFound, setNoUsersFound ] = useState(false);

	setInnerCommentHTML();

	useEffect(
		() => {
			async function getAllUsers(name) {
				nprogress.start();
				let users = await InstapostApi.findAllUsers(name);
                console.log(users)
				users.users.length !== 0 ? setUsers(users.users) : setNoUsersFound(true);
				nprogress.done();
			}
			getAllUsers(searchTerm);
		},
		[ searchTerm ]
	);

	const getSearchTerm = (data) => {
		setSearchTerm(data.searchTerm);
	};

	const resetSearch = () => {
		setSearchTerm('');
		setNoUsersFound(false);
	};

	return (
		<section>
			<div>
				<SearchBar getSearchTerm={getSearchTerm} />
				{searchTerm && <Button className='ResetSearch' onClick={resetSearch}>Reset Search</Button>}
				{noUsersFound && <h2>Sorry, there are no jobs that match.</h2>}
				<div className="ExplorePageCard">
					{users?.map((user) => {
						return <UserCard user={user} key={user.username} />;
					})}
				</div>
			</div>
		</section>
	);
};

export default ExplorePage;
