import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import '../assets/SideNavBar.css';
import { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import useMediaQuery from '../hooks/useMediaQuery';
import InstapostIcon from '../assets/instapost-logo.svg';

const SideNavBar = () => {
	const isAboveSmallScreens = useMediaQuery('(min-width: 1300px)');
	const { toggleUploadModal, storedValue, currentUser, nprogress } = useContext(CurrentUserContext);

	const navigate = useNavigate();
	const location = useLocation();
	const handleToggleModalEventSideBar = () => {
		if(location.pathname.substring(0, 7) === '/posts/') navigate(`/${currentUser?.username}`);
		toggleUploadModal();
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
								{isAboveSmallScreens ? 
								(<span
									style={{
										fontSize: '3rem',
										marginTop: '.5rem',
										fontFamily: "'Grand Hotel', cursive"
									}}
								>
									Instapost
								</span>) : 
								(<img src={InstapostIcon}  alt=""/>)
								}
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
                                <h2 id="SideBarLabel">Home</h2>
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
                                <h2 id="SideBarLabel">Search</h2>
							</Link>
						</Row>
						<Row className='SideNavRow'>
                            <Link id="messages" to="/messages">
								<span
									style={{ fontSize: '2.5rem', marginTop: '.6rem', marginBottom: '0rem' }}
									className="material-symbols-outlined"
								>
									chat_bubble
								</span>
                                <h2 id="SideBarLabel">Messages</h2>
							</Link>
                        </Row>
						{/* <Row className='SideNavRow'>
                            <Link id="notifications" to="/notifications">
								<span
									style={{ fontSize: '2.5rem', marginTop: '.6rem', marginBottom: '0rem' }}
									className="material-symbols-outlined"
								>
									favorite
								</span>
                                <h2>Notifications</h2>
							</Link>
                        </Row> */}
						<Row className='SideNavRow' onClick={() => handleToggleModalEventSideBar()}>
							<Link id="add_circle">
								<span
									style={{ fontSize: '3rem', marginTop: '.5rem' }}
									className="material-symbols-outlined"
								>
									add_circle
								</span>
                                <h2 id="SideBarLabel">Create</h2>
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
                                <h2 id="SideBarLabel">Profile</h2>
							</Link>
						</Row>
					</Col>
				</div>
			)}
		</div>
	);
};

export default SideNavBar;
