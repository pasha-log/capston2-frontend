import { BrowserRouter } from 'react-router-dom';
import InstapostRoutes from './Routes';
import InstapostApi from './Api';
import { useEffect, useState } from 'react';
import CurrentUserContext from './context/CurrentUserContext';
import useLocalStorage from './hooks/useLocalStorage';
import useLocalStorageMessaging from './hooks/useLocalStorageMessaging';
import BottomNavBar from './layouts/BottomNavBar';
import TopNavBar from './layouts/TopNavBar';
import SettingsModal from './layouts/SettingsModal';
import UserPostSettingsModal from './features/post/components/UserPostSettingsModal';
import nprogress from 'nprogress';
import { SkeletonTheme } from 'react-loading-skeleton';
import useMediaQuery from './hooks/useMediaQuery';
import SideNavBar from './layouts/SideNavBar';
import AddNewPost from './features/post/components/AddNewPost';
import DiscardModal from './features/post/components/DiscardModal';
import NewConvoModal from './features/messaging/components/NewConvoModal';
import { SocketProvider } from './context/SocketProvider';
import { ConversationsProvider } from './context/ConversationsProvider';
import { ContactsProvider } from './context/ContactsProvider';

function App() {
	const isAboveSmallScreens = useMediaQuery('(min-width: 1000px)');
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
	const [ settingsModal, setSettingsModal ] = useState(false);
	const [ innerCommentHTML, setInnerCommentHTML ] = useState();
	const [ newReply, setNewReply ] = useState(-1);
	const [ userPostSettingsModal, setUserPostSettingsModal ] = useState(false);
	const [ innerPostHTML, setInnerPostHTML ] = useState();

	const [ uploadModal, setUploadModal ] = useState(false);
	const [ fileUpload, setFileUpload ] = useState();
	const [ s3Response, setS3Response ] = useState();
	const [ fileUploadPhase, setFileUploadPhase ] = useState(true);
	const [ imageCropPhase, setImageCropPhase ] = useState(false);
	const [ captionPhase, setCaptionPhase ] = useState(false);
	const [ discardModal, setDiscardModal ] = useState(false);
	const [ outsideClickUploadForm, setOutsideClickUploadForm ] = useState(false);
	const [ newConvoModal, setNewConvoModal ] = useState(false);

	const [ potentialNewChatUser, setPotentialNewChatUser ] = useState(null);

	const [ users, setUsers ] = useState([]);

	const [username, setUsername] = useLocalStorageMessaging('username');

	const toggleSettingsModal = () => setSettingsModal(!settingsModal);
	const toggleUserPostSettingsModal = (event) => {
		let postDataArray = event.target.id.split(' ');
		setInnerPostHTML({ postId: postDataArray[0], postUsername: postDataArray[1], postKey: postDataArray[2] });
		setUserPostSettingsModal(!userPostSettingsModal);
	};
	const toggleUploadModal = () => {
		if (fileUploadPhase) {
			setUploadModal(!uploadModal);
		} else {
			setOutsideClickUploadForm(true);
			toggleDiscardModal();
		}
	};
	const toggleDiscardModal = () => {
		setDiscardModal(!discardModal);
	};
	const toggleNewConvoModal = () => {
		setPotentialNewChatUser(null);
		setNewConvoModal(!newConvoModal);
	};

	// const [ streamToken, setStreamToken ] = useState();

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
			setUsername(username);
			InstapostApi.token = response.token;
			setCurrentUser(username);
			return true;
		} else {
			return response;
		}
	};

	const logOutUser = () => {
		setValue(null);
		localStorage.clear();
		toggleSettingsModal();
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

	const deletePost = async (data) => {
		console.log(data);
		let response = await InstapostApi.deleteAPost(data);
		setNewPost(newPost - 1);
		return response;
	};

	const deleteS3File = async (key) => {
		console.log(key);
		const keyData = { key: key };
		let response = await InstapostApi.deleteFromS3File(keyData);
		return response;
	};

	return (
		<div className="App">
			<SkeletonTheme baseColor="#313131" highlightColor="#525252">
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
						toggleSettingsModal,
						settingsModal,
						logOutUser,
						innerCommentHTML,
						setInnerCommentHTML,
						newReply,
						setNewReply,
						newLike,
						nprogress,
						upload,
						toggleUserPostSettingsModal,
						userPostSettingsModal,
						innerPostHTML,
						setUserPostSettingsModal,
						deletePost,
						toggleUploadModal,
						uploadModal,
						setFileUpload,
						fileUpload,
						setS3Response,
						s3Response,
						setFileUploadPhase,
						setImageCropPhase,
						setCaptionPhase,
						captionPhase,
						toggleDiscardModal,
						discardModal,
						outsideClickUploadForm,
						setOutsideClickUploadForm,
						setUploadModal,
						toggleNewConvoModal,
						newConvoModal,
						potentialNewChatUser,
						setPotentialNewChatUser,
						users,
						setUsers
					}}
				>
					<SocketProvider username={storedValue?.username}>
						<ContactsProvider>
							<ConversationsProvider username={storedValue?.username}>
								<SettingsModal />
								<BrowserRouter>
									<UserPostSettingsModal />
									<AddNewPost
										fileUploadPhase={fileUploadPhase}
										imageCropPhase={imageCropPhase}
										captionPhase={captionPhase}
									/>
									<DiscardModal
										imageCropPhase={imageCropPhase}
										setImageCropPhase={setImageCropPhase}
										setFileUploadPhase={setFileUploadPhase}
										s3Response={s3Response}
										setCaptionPhase={setCaptionPhase}
										captionPhase={captionPhase}
										deleteS3File={deleteS3File}
									/>
									<NewConvoModal />
									{isAboveSmallScreens && showNav && <SideNavBar />}
									{!isAboveSmallScreens && showNav && <BottomNavBar />}
									{!isAboveSmallScreens && showNav && <TopNavBar />}
									<main>
										<InstapostRoutes
											setTokenAfterRegister={setTokenAfterRegister}
											setTokenAfterLogin={setTokenAfterLogin}
											setShowNav={setShowNav}
										/>
									</main>
								</BrowserRouter>
							</ConversationsProvider>
						</ContactsProvider>
					</SocketProvider>
				</CurrentUserContext.Provider>
			</SkeletonTheme>
		</div>
	);
}

export default App;
