import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './assets/BottomNavBar.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const BottomNavBar = () => {
	const { storedValue, currentUser } = useContext(CurrentUserContext);

	return (
		<div className='NavBarContainer'>
			{storedValue &&
			currentUser && (
				<div>
					<Row className="Nav fixed-bottom">
						<Col>
							<Link id="home" to="/">
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
										currentUser?.profileImageURL
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

export default BottomNavBar;
