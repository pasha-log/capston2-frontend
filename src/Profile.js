import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';
import InstapostApi from './Api';

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
		// https://codepen.io/GeorgePark/pen/VXrwOP
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

						<div className="ProfileStats">							
							<ul>	
								<li key='PostNumber'>
									<span className="ProfileStatCount">{userBeingViewed?.username === currentUser?.username ? currentUser?.posts?.length : userBeingViewed?.posts?.length}</span> posts
								</li>
								<li key='Followers'>
									<span className="ProfileStatCount">{userBeingViewed?.username === currentUser?.username ? currentUser?.followers?.length : userBeingViewed?.followers?.length}</span> followers
								</li>
								<li key='Following'>
									<span className="ProfileStatCount">{userBeingViewed?.username === currentUser?.username ? currentUser?.following?.length : userBeingViewed?.following?.length}</span> following
								</li>
							</ul> 						
						</div>

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
						<div className='NullPosts'>
							<span id="Camera" className="material-symbols-outlined">
								photo_camera
							</span>
							<h3 className='Share'>Share Photos</h3>
							<p>You have no posts yet</p>
							<Link className='FirstShare' to="/upload">
								<Button className='FirstShareButton'>Share your first photo</Button>
							</Link>
						</div> :
						<div className="ProfileContainer">
							<div className="gallery">
							{userBeingViewed?.posts?.slice(0).reverse().map(post => {return (
							<Link to={`/posts/${post.postId}`} key={post.postId} state={{imageURL: post.postURL, caption: post.caption}}>
								<div className="gallery-item" tabIndex="0">
										<img className="gallery-image" src={post.postURL} alt={post.id}/>
										<div className="gallery-item-info">
										<ul>
											<li className="gallery-item-likes" key={`${post.postId}-gallery-item-likes`}>
												<span className="material-symbols-outlined visually-hidden">
												favorite
												</span>
												 0
											</li>
											<li className="gallery-item-comments" key={`${post.postId}-gallery-item-comments`}>
												<span className="material-symbols-outlined visually-hidden">
												mode_comment
												</span>
												 0
											</li>
										</ul>
									</div>
								</div>
							</Link>
							)})}
							</div>
						</div>
					}
				</main>
		</div>
		// https://codepen.io/GeorgePark/pen/VXrwOP
	);
};

export default Profile;
