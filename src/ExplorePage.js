import { useState, useEffect } from 'react';
import InstapostApi from './Api';
import SearchBar from './SearchBar';
import { Button } from 'reactstrap';
import UserCard from './UserCard';
import './assets/ExplorePage.css';

const ExplorePage = () => {
	const [ users, setUsers ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ noUsersFound, setNoUsersFound ] = useState(false);

	useEffect(
		() => {
			async function getAllUsers(name) {
				let users = await InstapostApi.findAllUsers(name);
                console.log(users)
				users.users.length !== 0 ? setUsers(users.users) : setNoUsersFound(true);
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
