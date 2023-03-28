import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './BottomNavBar.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const TopNavBar = () => {
	const { storedValue, currentUser } = useContext(CurrentUserContext);

	return (
		<div className="NavBarContainer">
			{storedValue &&
			currentUser && (
				<div>
					<Row className="Nav fixed-top">
						<Col>
							<Link id="home" to="/">
								<span
									style={{
										fontSize: '2rem',
										marginTop: '.5rem',
										fontFamily: "'Grand Hotel', cursive"
									}}
								>
									Instapost
								</span>
							</Link>
						</Col>
						<Col>
							<Link id="notifications" to="/notifications">
								<span
									style={{ fontSize: '1.5rem', marginTop: '.5rem', marginBottom: '0rem' }}
									className="material-symbols-outlined"
								>
									favorite
								</span>
							</Link>
							<Link id="settings" to="/settings">
								<span
									style={{ fontSize: '1.5rem', marginTop: '.5rem', marginBottom: '0rem' }}
									className="material-symbols-outlined"
								>
									settings
								</span>
							</Link>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
};

export default TopNavBar;
