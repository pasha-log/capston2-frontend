import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './NavBar.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const NavBar = () => {
	const { storedValue, currentUser } = useContext(CurrentUserContext);

	return (
		<div>
			{storedValue &&
			currentUser && (
				<div>
					<Row className="Nav fixed-bottom">
						<Col>
							<Link id="home" to="/home">
								<span
									style={{ fontSize: '2rem', marginTop: '.5rem' }}
									className="material-symbols-outlined"
								>
									home
								</span>
							</Link>
						</Col>
						<Col>
							<Link id="search" to="/search">
								<span
									style={{ fontSize: '2rem', marginTop: '.5rem' }}
									className="material-symbols-outlined"
								>
									search
								</span>
							</Link>
						</Col>
						<Col>
							<Link id="add_circle" to="/upload">
								{/* <Button id="add_circle" onClick={() => setShowModal(true)}> */}
								<span
									style={{ fontSize: '2rem', marginTop: '.5rem' }}
									className="material-symbols-outlined"
								>
									add_circle
								</span>
							</Link>
						</Col>
						<Col>
							<Link id="person" to={`/${currentUser.username}`}>
								{/* <span className="material-symbols-outlined">person</span> */}
								<img
									className="NavBarProfile"
									src={
										'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/46499ef0-8acb-4511-ba9e-a0cd13f233f0-20220812_195736.jpg'
									}
									alt=""
								/>
							</Link>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
};

export default NavBar;
