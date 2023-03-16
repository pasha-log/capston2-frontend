// import { useState, useEffect } from 'react';
// import InstagramApi from './Api';
// import { Link } from 'react-router-dom';
// import PostCard from './PostCard.js';
import { Button, Row, Col } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Profile.css';

/**npm i aws-sdk multer multer-s3*/
const Profile = () => {
	const { storedValue, currentUser } = useContext(CurrentUserContext);
	// const [ userData, setUserData ] = useState({});
	console.log(storedValue.token);
	console.log(currentUser);
	document.body.style = 'background: black;';
	document.body.style.color = 'white';

	return (
		<div>
			<Row>
				<Col className="Photo">
					<div>
						<img className="ProfilePhoto" alt="" />
					</div>
				</Col>
				<Col className="Username" sm="4" xs="6">
					<h2>
						{currentUser?.username}{' '}
						<span id="Settings" className="material-symbols-outlined">
							settings
						</span>
					</h2>
					<Button className="EditProfile">Edit Profile</Button>
				</Col>
			</Row>
			<Row>
				<Col className="Bio">
					<span>
						<b>{currentUser?.fullName}</b>
					</span>
					<h1 className="Info">
						{currentUser?.bio}
						<br />
						{currentUser?.email}
					</h1>
				</Col>
			</Row>
			<Row className="UserData">
				<Col className="Data">
					<span className="Number">
						<b>{currentUser?.posts?.length}</b>
					</span>
					<br />Posts
				</Col>
				<Col className="Data">
					<span className="Number">
						<b>{currentUser?.followers?.length}</b>
					</span>
					<br />Followers
				</Col>
				<Col className="Data">
					<span className="Number">
						<b>{currentUser?.following?.length}</b>
					</span>
					<br />Following
				</Col>
			</Row>
			<Row className="ContentButtons">
				<Col>
					<span id="Posts" className="material-symbols-outlined">
						grid_on
					</span>
				</Col>
				<Col>
					<span id="Tagged" className="material-symbols-outlined">
						person_add
					</span>
				</Col>
			</Row>
		</div>
	);
};

export default Profile;
