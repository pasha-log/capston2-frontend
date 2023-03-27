import { Link } from 'react-router-dom';
// import PostCard from './PostCard.js';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';
import InstapostApi from './Api';

// TODO: Make the gallery into a reusable component to lessen repeat code.
// Then, start the homepage from scratch. 

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
            (username !== currentUser?.username) ? getUserInfo(username) : console.log("Current user's page.");
    }, [ newFollow ]);

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
							{
								!userBeingViewed ?
								<img
									className='ProfilePhoto'
									src={currentUser?.profileImageURL}
									alt=""
								/> 
								:
								<img
									className='ProfilePhoto'
									src={userBeingViewed?.profileImageURL}
									alt=""
								/> 
							}
						</div>

						<div className="ProfileUserSettings">
							{
								!userBeingViewed ? 
								<h1 className="ProfileUsername">{currentUser?.username}</h1>
								:
								<h1 className="ProfileUsername">{userBeingViewed?.username}</h1>
							}

							{/* <button className="btn profile-edit-btn">Edit Profile</button> */}
							{
								username === currentUser?.username ? 
								<Button className="btn ProfileEditButton EditProfile">Edit Profile</Button>
								:
								<Button onClick={() => onClickFollow(currentUser?.username, username)} className="btn ProfileEditButton EditProfile">Follow</Button>
							}
							{/* <button className="btn profile-settings-btn" aria-label="profile settings">
								<i className="fas fa-cog" aria-hidden="true" />
							</button> */}
							<span className="material-symbols-outlined ProfileSettingsButton">
		 						settings
							</span>
						</div>

						<div className="ProfileStats">
							{
								!userBeingViewed ? 
								<ul>	
									<li key='PostNumber'>
										<span className="ProfileStatCount">{currentUser?.posts?.length}</span> posts
									</li>
									<li key='Followers'>
										<span className="ProfileStatCount">{currentUser?.followers?.length}</span> followers
									</li>
									<li key='Following'>
										<span className="ProfileStatCount">{currentUser?.following?.length}</span> following
									</li>
								</ul> 
								:
								<ul>
									<li key='PostNumber'>
										<span className="ProfileStatCount">{userBeingViewed?.posts?.length}</span> posts
									</li>
									<li key='Followers'>
										<span className="ProfileStatCount">{userBeingViewed?.followers?.length}</span> followers
									</li>
									<li key='Following'>
										<span className="ProfileStatCount">{userBeingViewed?.following?.length}</span> following
									</li>
								</ul>
							}
						</div>

						<div className="ProfileBio">
							{
								!userBeingViewed ? 
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
			
			{!userBeingViewed ? 		
				<main>
					{
						currentUser?.posts?.length === 0 ?
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
							{currentUser?.posts?.slice(0).reverse().map(post => {return (
							<Link to={`/posts/${post.postId}`} key={post.postId} state={{imageURL: post.postURL, caption: post.caption}}>
								<div className="gallery-item" tabIndex="0">
										<img className="gallery-image" src={post.postURL} alt={post.id}/>
										<div className="gallery-item-info">
										<ul>
											<li className="gallery-item-likes" key={`${post.postId}-gallery-item-likes`}>
												{/* <span id="visually-hidden">Likes:</span> */}
												<span className="material-symbols-outlined visually-hidden">
												favorite
												</span>
												 0
											</li>
											<li className="gallery-item-comments" key={`${post.postId}-gallery-item-comments`}>
												{/* <span id="visually-hidden">Comments:</span> */}
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
				:
				<main>
					{userBeingViewed?.posts?.length === 0 ?
						<div className='NullPosts'>
							<p>No posts yet</p>
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
												{/* <span id="visually-hidden">Likes:</span> */}
												<span className="material-symbols-outlined visually-hidden">
												favorite
												</span>
												 0
											</li>
											<li className="gallery-item-comments" key={`${post.postId}-gallery-item-comments`}>
												{/* <span id="visually-hidden">Comments:</span> */}
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
			}
		</div>
		// https://codepen.io/GeorgePark/pen/VXrwOP
	);
};

export default Profile;
