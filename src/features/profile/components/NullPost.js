import '../assets/Profile.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import CurrentUserContext from '../../../context/CurrentUserContext';
import { useContext } from 'react';

const NullPost = () => {
	const { toggleUploadModal } = useContext(CurrentUserContext);

	return (
		<div>
			<div className="NullPostDiv">
				<span id="Camera" className="material-symbols-outlined">
					photo_camera
				</span>
				<h3 className="Share">Share Photos</h3>
				<p>You have no posts yet</p>
				<Link className="FirstShare" onClick={() => toggleUploadModal()}>
					<Button className="FirstShareButton">Share your first photo</Button>
				</Link>
			</div>
		</div>
	);
};

export default NullPost;
