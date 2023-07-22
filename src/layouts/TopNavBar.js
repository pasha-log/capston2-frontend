import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import '../assets/BottomNavBar.css';
import { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

const TopNavBar = () => {
	const { storedValue, currentUser, toggleSettingsModal } = useContext(CurrentUserContext);

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
										fontSize: '2.5rem',
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
									style={{ fontSize: '2.5rem', marginTop: '.6rem', marginBottom: '0rem' }}
									className="material-symbols-outlined"
								>
									favorite
								</span>
							</Link>
							<span
								style={{
									fontSize: '2.5rem',
									marginTop: '.6rem',
									marginBottom: '0rem',
									cursor: 'pointer',
									color: 'white'
								}}
								className="material-symbols-outlined"
								onClick={toggleSettingsModal}
							>
								settings
							</span>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
};

export default TopNavBar;
