import './App.css';
import { BrowserRouter } from 'react-router-dom';
import InstapostRoutes from './Routes';
import InstapostApi from './Api';
import { useEffect, useState } from 'react';
import CurrentUserContext from './CurrentUserContext';
import useLocalStorage from './hooks/useLocalStorage';
import BottomNavBar from './BottomNavBar';
import TopNavBar from './TopNavBar';

function App() {
	const [ currentUser, setCurrentUser ] = useState();
	const [ storedValue, setValue ] = useLocalStorage();
	const [ showNav, setShowNav ] = useState(true);
	const [ newPost, setNewPost ] = useState(-1);
	const [ newFollow, setNewFollow ] = useState(-1);
	// const [ showModal, setShowModal ] = useState(false);

	useEffect(
		() => {
			const getUserByUsername = async (username) => {
				InstapostApi.token = storedValue.token;
				let user = await InstapostApi.getUser(username);
				// console.log(user);
				setCurrentUser(user);
			};

			storedValue ? getUserByUsername(storedValue.username) : console.log('Logged out');
		},
		[ storedValue, newPost, newFollow ]
	);

	const setTokenAfterRegister = async (data, username) => {
		let response = await InstapostApi.registerUser(data);
		if (response.token) {
			setShowNav(true);
			setValue({ token: response.token, username: username });
			InstapostApi.token = response.token;
			setCurrentUser(username);
			return true;
		} else {
			return response;
		}
	};

	const setTokenAfterLogin = async (data, username) => {
		let response = await InstapostApi.loginUser(data);
		if (response.token) {
			setShowNav(true);
			setValue({ token: response.token, username: username });
			InstapostApi.token = response.token;
			setCurrentUser(username);
			return true;
		} else {
			return response;
		}
	};

	// const logOutUser = () => {
	// 	setValue(null);
	// };

	const follow = async (usernameFollowing, usernameBeingFollowed) => {
		let userData = { usernameFollowing: usernameFollowing, usernameBeingFollowed: usernameBeingFollowed };
		let response = await InstapostApi.follow(userData);
		setNewFollow(newFollow + 1);
		console.log(response);
	};

	const unfollow = async (usernameUnfollowing, usernameBeingUnfollowed) => {
		let userData = { usernameUnfollowing: usernameUnfollowing, usernameBeingUnfollowed: usernameBeingUnfollowed };
		let response = await InstapostApi.unfollow(userData);
		setNewFollow(newFollow - 1);
		console.log(response);
	};

	return (
		<div className="App">
			<CurrentUserContext.Provider
				value={{ storedValue, currentUser, newPost, setNewPost, follow, newFollow, unfollow }}
			>
				<BrowserRouter>
					{showNav && <BottomNavBar />}
					{showNav && <TopNavBar />}
					<main>
						<InstapostRoutes
							setTokenAfterRegister={setTokenAfterRegister}
							setTokenAfterLogin={setTokenAfterLogin}
							setShowNav={setShowNav}
						/>
					</main>
				</BrowserRouter>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
