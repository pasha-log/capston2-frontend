import '../assets/HomePage.css';
import useMediaQuery from '../hooks/useMediaQuery';

const Footer = ({ isEditProfile }) => {
	const isAboveSmallScreens = useMediaQuery('(min-width: 1000px)');
	let EditProfileFooterStyles;
	isEditProfile && isAboveSmallScreens
		? (EditProfileFooterStyles = {
				marginLeft: '18.75rem',
				marginTop: '2rem',
				marginBottom: '2rem'
			})
		: (EditProfileFooterStyles = {
				marginTop: '2rem',
				marginBottom: '2rem'
			});
	return (
		<div className="footer" style={EditProfileFooterStyles}>
			<a className="footer-section" href="https://github.com/pasha-log">
				About
			</a>
			<small className="footer-section" href="">
				Help
			</small>
			<a className="footer-section" href="https://github.com/pasha-log/capstone2-backend">
				API
			</a>
			<small className="footer-section" href="">
				Jobs
			</small>
			<small className="footer-section" href="">
				Privacy
			</small>
			<small className="footer-section" href="">
				Terms
			</small>
			<small className="footer-section" href="">
				Locations
			</small>
			<br />
			<small className="footer-section" href="">
				Top Accounts
			</small>
			<small className="footer-section" href="">
				Hashtag
			</small>
			<small className="footer-section" href="">
				Language
			</small>
			<br />
			<br />
			<span className="footer-section">© 2023 INSTAPOST FROM PASHA LOGUINOV</span>
		</div>
	);
};

export default Footer;
