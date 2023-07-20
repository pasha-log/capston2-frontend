import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import '../assets/SideNavBar.css';
import { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

const SideNavBar = () => {
	const { storedValue, currentUser, nprogress } = useContext(CurrentUserContext);

	const onUploadClick = () => {
		nprogress.start();
	}
	
	return (
		<div className='NavBarContainer'>
			{storedValue &&
			currentUser && (
				<div>
					<Col className="SideNavContainer">
                        <Row className='' style={{marginLeft: "2rem"}}>
							<Link id="home" to="/">
								<span
									style={{
										fontSize: '3rem',
										marginTop: '.5rem',
										fontFamily: "'Grand Hotel', cursive"
									}}
								>
									Instapost
								</span>
							</Link>
						</Row>
						<Row className='SideNavRow'>
							<Link id="home" to="/">
								<span
									style={{ fontSize: '3rem', marginTop: '.5rem' }}
									className="material-symbols-outlined"
								>
									home
								</span>
                                <h2>Home</h2>
							</Link>
						</Row>
						<Row className='SideNavRow'>
							<Link id="search" to="/search">
								<span
									style={{ fontSize: '3rem', marginTop: '.5rem' }}
									className="material-symbols-outlined"
								>
									search
								</span>
                                <h2>Search</h2>
							</Link>
						</Row>
						<Row className='SideNavRow'>
                            <Link id="notifications" to="/notifications">
								<span
									style={{ fontSize: '2.5rem', marginTop: '.6rem', marginBottom: '0rem' }}
									className="material-symbols-outlined"
								>
									favorite
								</span>
                                <h2>Notifications</h2>
							</Link>
                        </Row>
						<Row className='SideNavRow'>
							<Link id="add_circle" to="/upload" onClick={onUploadClick}>
								<span
									style={{ fontSize: '3rem', marginTop: '.5rem' }}
									className="material-symbols-outlined"
								>
									add_circle
								</span>
                                <h2>Create</h2>
							</Link>
						</Row>
						<Row className='SideNavRow'>
							<Link id="person" to={`/${currentUser.username}`}>
								<img
									className="NavBarProfile"
									src={
										currentUser?.profileImageURL
									}
									alt=""
								/>
                                <h2>Profile</h2>
							</Link>
						</Row>
					</Col>
				</div>
			)}
		</div>
	);
};

export default SideNavBar;
