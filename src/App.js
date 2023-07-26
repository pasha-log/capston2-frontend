import { BrowserRouter } from 'react-router-dom';
import InstapostRoutes from './Routes';
import InstapostApi from './Api';
import { useEffect, useState } from 'react';
import CurrentUserContext from './context/CurrentUserContext';
import useLocalStorage from './hooks/useLocalStorage';
import BottomNavBar from './layouts/BottomNavBar';
import TopNavBar from './layouts/TopNavBar';
import SettingsModal from './layouts/SettingsModal';
import UserPostSettingsModal from './features/post/components/UserPostSettingsModal';
import nprogress from 'nprogress';
import { SkeletonTheme } from 'react-loading-skeleton';
import useMediaQuery from './hooks/useMediaQuery';
import SideNavBar from './layouts/SidNavBar';
import AddNewPost from './features/post/components/AddNewPost';
import DiscardModal from './features/post/components/DiscardModal';

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

	const toggleSettingsModal = () => setSettingsModal(!settingsModal);
	const toggleUserPostSettingsModal = (event) => {
		let postDataArray = event.target.id.split(' ');
		setInnerPostHTML({ postId: postDataArray[0], postUsername: postDataArray[1], postKey: postDataArray[2] });
		setUserPostSettingsModal(!userPostSettingsModal);
	};
	const toggleUploadModal = () => setUploadModal(!uploadModal);
	const toggleDiscardModal = () => {
		setDiscardModal(!discardModal);
	};

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
						discardModal
					}}
				>
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
				</CurrentUserContext.Provider>
			</SkeletonTheme>
		</div>
	);
}

export default App;

/**
 * Next Steps:
 *  
 * Add modal with delete and edit button.
 * Add deletion functionality - this will need to get the post id number with e.target possibly, delete the post and all comments associated with it, and delete from the S3 as well. Return user to profile page.
 * The modal also needs to know whether the post creator username is the same as the current username.
 * 
 * Create new desktop post detail card. 
 * 
 * {
  postId: '22',
  postUsername: 'pashathecoder',
  postURL: 'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/5a504c6e-37ae-40f2-9757-0d243e430dd6-Screenshot%20%28152%29.png'
}
 * {
  postId: '21',
  postUsername: 'pashathecoder',
  postURL: 'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/2d7bafca-48ac-4628-a757-3ce5ad8219ce-fly_into_space%20%283%29.jpg'
}
 * {
  postId: '19',
  postUsername: 'pashathecoder',
  postURL: 'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/4e708a55-7d23-46d1-a23d-1bbe9c5a6589-unnamed2.jpg'
}
 * {
  postId: '6',
  postUsername: 'pashathecoder',
  postURL: 'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/749338d1-ad25-49c5-a8a8-807acee161bc-Pash+art_000003+%283%29_LI.jpg'
}
 * {
  postId: '5',
  postUsername: 'pashathecoder',
  postURL: 'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/53252005-1aaa-454d-bbef-e2f947edbd58-Screenshot%20%28128%29.png'
}
 * {
  postId: '4',
  postUsername: 'pashathecoder',
  postURL: 'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/99d8cbd9-975f-450f-8b0e-fd57a9e74caf-activation2.jpg'
}

{
  postId: '3',
  postUsername: 'pashathecoder',
  postURL: 'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/0c294c47-5c5b-4c34-8a16-f88c9f1ef948-20190101_1624462.jpg'
}

'uploads/1d9e68f2-72f0-4d43-b2b7-d7ec7ecf2bf0-20190527_1348562.jpg'
'uploads/1c65b07e-b0ce-44d6-b7ae-0faa9fbdf0ed-activation2.jpg'
 */
