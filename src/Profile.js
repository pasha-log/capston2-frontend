import { Link } from 'react-router-dom';
// import PostCard from './PostCard.js';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';
import InstapostApi from './Api';

const Profile = () => {
	const { username } = useParams();
	const [ userBeingViewed, setUserBeingViewed ] = useState(null); 
	const { currentUser } = useContext(CurrentUserContext);
	document.body.style = 'background: black;';
	document.body.style.color = 'white';

	useEffect(
		() => {
            const getUserInfo = async (username) => {
                const user = await InstapostApi.getUser(username);
                setUserBeingViewed(user);
            }
            (username !== currentUser?.username) ? getUserInfo(username) : console.log("Current user's page.");
    }, []);

	return (
		// https://codepen.io/GeorgePark/pen/VXrwOP
		<div>
			<header>
				<div className="container">
					<div className="profile">
						<div className="profile-image">
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

						<div className="profile-user-settings">
							{
								!userBeingViewed ? 
								<h1 className="profile-user-name">{currentUser?.username}</h1>
								:
								<h1 className="profile-user-name">{userBeingViewed?.username}</h1>
							}

							{/* <button className="btn profile-edit-btn">Edit Profile</button> */}
							{
								!userBeingViewed ? 
								<Button className="btn profile-edit-btn EditProfile">Edit Profile</Button>
								:
								<Button className="btn profile-edit-btn EditProfile">Follow</Button>
							}
							{/* <button className="btn profile-settings-btn" aria-label="profile settings">
								<i className="fas fa-cog" aria-hidden="true" />
							</button> */}
							<span className="material-symbols-outlined profile-settings-btn">
		 						settings
							</span>
						</div>

						<div className="profile-stats">
							{
								!userBeingViewed ? 
								<ul>	
									<li key='PostNumber'>
										<span className="profile-stat-count">{currentUser?.posts?.length}</span> posts
									</li>
									<li key='Followers'>
										<span className="profile-stat-count">{currentUser?.followers?.length}</span> followers
									</li>
									<li key='Following'>
										<span className="profile-stat-count">{currentUser?.following?.length}</span> following
									</li>
								</ul> 
								:
								<ul>
									<li key='PostNumber'>
										<span className="profile-stat-count">{userBeingViewed?.posts?.length}</span> posts
									</li>
									<li key='Followers'>
										<span className="profile-stat-count">{userBeingViewed?.followers?.length}</span> followers
									</li>
									<li key='Following'>
										<span className="profile-stat-count">{userBeingViewed?.following?.length}</span> following
									</li>
								</ul>
							}
						</div>

						<div className="profile-bio">
							{
								!userBeingViewed ? 
								<p>
									<span className="profile-real-name">{currentUser?.fullName}</span> {currentUser?.bio}
								</p>
								:
								<p>
									<span className="profile-real-name">{userBeingViewed?.fullName}</span> {userBeingViewed?.bio}
								</p>
							}
						</div>
					</div>
				</div>
			</header>
			
			{!userBeingViewed ? 		
				<main>
					{currentUser?.posts?.length === 0 ?
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
						<div className="container">
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
							<span id="Camera" className="material-symbols-outlined">
								photo_camera
							</span>
							<h3 className='Share'>Share Photos</h3>
							<p>You have no posts yet</p>
							<Link className='FirstShare' to="/upload">
								<Button className='FirstShareButton'>Share your first photo</Button>
							</Link>
						</div> :
						<div className="container">
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
