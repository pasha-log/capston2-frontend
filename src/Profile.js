import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';
import InstapostApi from './Api';
import Gallery from './Gallery';
import ProfileStats from './ProfileStats';
import NullPost from './NullPost';

const Profile = () => {
	const { username } = useParams();
	const { currentUser, follow } = useContext(CurrentUserContext);
	const [ userBeingViewed, setUserBeingViewed ] = useState(null); 
	const [ newFollow, setNewFollow ] = useState(-1);
	
	document.body.style = 'background: black;';
	document.body.style.color = 'white';

	useEffect(
		() => {
            const getUserInfo = async (username) => {
                const user = await InstapostApi.getUser(username);
                setUserBeingViewed(user);
            }
            getUserInfo(username);
    }, [ newFollow, username ]);

	const onClickFollow = async (usernameFollowing, usernameBeingFollowed) => {
		let response = await follow(usernameFollowing, usernameBeingFollowed);
		if (response.data.status === 'success') {
			setNewFollow(newFollow + 1);
		}
	}

	return (
		<div>
			<header>
				<div className="ProfileContainer">
					<div className="Profile">
						<div className="ProfileImage">
							<img
								className='ProfilePhoto'
								src={userBeingViewed?.username === currentUser?.username ? currentUser?.profileImageURL : userBeingViewed?.profileImageURL}
								alt=""
							/> 
						</div>

						<div className="ProfileUserSettings">
							<h1 className="ProfileUsername">{userBeingViewed?.username === currentUser?.username ? currentUser?.username : userBeingViewed?.username}</h1>
							{
								userBeingViewed?.username === currentUser?.username ? 
								<Button className="btn ProfileEditButton EditProfile">Edit Profile</Button>
								:
								<Button onClick={() => onClickFollow(currentUser?.username, username)} className="btn ProfileEditButton EditProfile">Follow</Button>
							}
							<span className="material-symbols-outlined ProfileSettingsButton">
		 						settings
							</span>
						</div>

						<ProfileStats user={userBeingViewed?.username === currentUser?.username ? currentUser : userBeingViewed}/>

						<div className="ProfileBio">
							{
								userBeingViewed?.username === currentUser?.username ? 
								<p>
									<span className="ProfileRealName">{currentUser?.fullName}</span> {currentUser?.bio}
								</p>
								:
								<p>
									<span className="ProfileRealName">{userBeingViewed?.fullName}</span> {userBeingViewed?.bio}
								</p>
							}
						</div>
					</div>
				</div>
			</header>
				<main>
					{(userBeingViewed?.posts?.length === 0 && userBeingViewed?.username !== currentUser?.username) ? 	
						<div className='NullPosts'>
							<p className='NoPostsYet'>No posts yet</p>
						</div> :
						(userBeingViewed?.posts?.length === 0) ? 
						<NullPost /> :
						<div className="ProfileContainer">
							<Gallery userBeingViewed={userBeingViewed} />
						</div>
					}
				</main>
		</div>
	);
};

export default Profile;
