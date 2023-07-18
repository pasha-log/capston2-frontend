import '../assets/Profile.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const NullPost = () => {
	return (
		<div>
			<span id="Camera" className="material-symbols-outlined">
				photo_camera
			</span>
			<h3 className="Share">Share Photos</h3>
			<p>You have no posts yet</p>
			<Link className="FirstShare" to="/upload">
				<Button className="FirstShareButton">Share your first photo</Button>
			</Link>
		</div>
	);
};

export default NullPost;
