import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './assets/Profile.css';
import InstapostApi from './Api';
import Gallery from './Gallery';
import ProfileStats from './ProfileStats';
import NullPost from './NullPost';
import ProfileSettings from './ProfileSettings';
import ProfileBio from './ProfileBio';

const Profile = () => {
	const { username } = useParams();
	const { currentUser, newFollow, newLike } = useContext(CurrentUserContext);
	const [ userBeingViewed, setUserBeingViewed ] = useState(null); 
	
	document.body.style = 'background: black;';
	document.body.style.color = 'white';

	useEffect(
		() => {
            const getUserInfo = async (username) => {
                const user = await InstapostApi.getUser(username);
                setUserBeingViewed(user);
            }
            getUserInfo(username);
    }, [ newFollow, username, newLike ]);

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
						<ProfileSettings user={userBeingViewed} />

						<ProfileStats user={userBeingViewed?.username === currentUser?.username ? currentUser : userBeingViewed}/>

						<ProfileBio  user={userBeingViewed?.username === currentUser?.username ? currentUser : userBeingViewed}/>
					</div>
				</div>
			</header>
				<main>
					{(userBeingViewed?.posts?.length === 0 && userBeingViewed?.username !== currentUser?.username) ? 	
						<div className="ProfileContainer">
							<div className="gallery-item NullPosts" tabIndex="0">
								<span id="Camera" className="material-symbols-outlined">
									photo_camera
								</span>
								<p className='NoPostsYet'>No posts yet</p>
								<p className='NoPostsYet Statement'>When this user shares photos they'll be appearing here.</p>
							</div> 
						</div> :
						(userBeingViewed?.posts?.length === 0) ? 
						<div className="ProfileContainer">
							<div className="gallery-item NullPosts" tabIndex="0">
								<NullPost /> 
							</div>
						</div> :
						<div className="ProfileContainer">
							<Gallery userBeingViewed={userBeingViewed} />
						</div>
					}
				</main>
		</div>
	);
};

export default Profile;
