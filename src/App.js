import './assets/App.css';
import { BrowserRouter } from 'react-router-dom';
import InstapostRoutes from './Routes';
import InstapostApi from './Api';
import { useEffect, useState } from 'react';
import CurrentUserContext from './CurrentUserContext';
import useLocalStorage from './hooks/useLocalStorage';
import BottomNavBar from './BottomNavBar';
import TopNavBar from './TopNavBar';
import SettingsModal from './SettingsModal';
import nprogress from 'nprogress';

function App() {
	nprogress.configure({ showSpinner: false });
	nprogress.configure({
		template:
			"<div class='bar fixed-top' role='bar'><div class='peg'></div></div><div class='spinner' role='spinner'><div class='spinner-icon'></div></div>"
	});
	const [ currentUser, setCurrentUser ] = useState();
	const [ storedValue, setValue ] = useLocalStorage();
	const [ showNav, setShowNav ] = useState(true);
	const [ newPost, setNewPost ] = useState(-1);
	const [ newFollow, setNewFollow ] = useState(-1);
	const [ newLike, setNewLike ] = useState(-1);
	const [ modal, setModal ] = useState(false);
	const [ innerCommentHTML, setInnerCommentHTML ] = useState();
	// const [ newCommentReply, setNewCommentReply ] = useState(-1);

	const toggle = () => setModal(!modal);

	useEffect(
		() => {
			const getUserByUsername = async (username) => {
				InstapostApi.token = storedValue.token;
				let user = await InstapostApi.getUser(username);
				setCurrentUser(user);
			};

			storedValue ? getUserByUsername(storedValue.username) : console.log('Logged out');
		},
		[ storedValue, newPost, newFollow, newLike ]
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

	const logOutUser = () => {
		setValue(null);
		toggle();
	};

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

	const like = async (username, commentOrPostId, likeType) => {
		let likeData = { username: username, commentOrPostId: commentOrPostId, likeType: likeType };
		let response = await InstapostApi.like(likeData);
		console.log(response);
		setNewLike(newLike + 1);
	};

	const unlike = async (username, commentOrPostId, likeType) => {
		let likeData = { username: username, commentOrPostId: commentOrPostId, likeType: likeType };
		let response = await InstapostApi.unlike(likeData);
		console.log(response);
		setNewLike(newLike + 1);
	};

	const editProfileInfo = async (data) => {
		console.log(data);
		let response = await InstapostApi.patchUser(storedValue.username, data);
		if (response.user) {
			setValue({ token: storedValue.token, username: response.user.username });
			return true;
		} else {
			return response;
		}
	};

	const upload = async (data) => {
		let response = await InstapostApi.uploadPost(data);
		return response;
	};

	return (
		<div className="App">
			<CurrentUserContext.Provider
				value={{
					storedValue,
					currentUser,
					newPost,
					setNewPost,
					follow,
					newFollow,
					unfollow,
					like,
					unlike,
					editProfileInfo,
					toggle,
					modal,
					logOutUser,
					innerCommentHTML,
					setInnerCommentHTML,
					newLike,
					nprogress,
					upload
				}}
			>
				<SettingsModal />
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
