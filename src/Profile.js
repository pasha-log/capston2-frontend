import { Link } from 'react-router-dom';
// import PostCard from './PostCard.js';
import { Button } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';

const Profile = () => {
	const { currentUser } = useContext(CurrentUserContext);
	document.body.style = 'background: black;';
	document.body.style.color = 'white';

	return (
		// https://codepen.io/GeorgePark/pen/VXrwOP
		<div>
			<header>
				<div className="container">
					<div className="profile">
						<div className="profile-image">
							<img
								className='ProfilePhoto'
								src="https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/46499ef0-8acb-4511-ba9e-a0cd13f233f0-20220812_195736.jpg"
								alt=""
							/>
						</div>

						<div className="profile-user-settings">
							<h1 className="profile-user-name">{currentUser?.username}</h1>

							{/* <button className="btn profile-edit-btn">Edit Profile</button> */}
							<Button className="btn profile-edit-btn EditProfile">Edit Profile</Button>
							{/* <button className="btn profile-settings-btn" aria-label="profile settings">
								<i className="fas fa-cog" aria-hidden="true" />
							</button> */}
							<span className="material-symbols-outlined profile-settings-btn">
		 						settings
							</span>
						</div>

						<div className="profile-stats">
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
						</div>

						<div className="profile-bio">
							<p>
								<span className="profile-real-name">{currentUser?.fullName}</span> {currentUser?.bio}
							</p>
						</div>
					</div>
				</div>
			</header>

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
		</div>
		// https://codepen.io/GeorgePark/pen/VXrwOP
	);
};

export default Profile;
