import '../assets/HomePage.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const NoFollowers = () => {
	return (
		<div className="NoFollowersDiv">
			<span style={{ fontSize: '5rem', marginTop: '.5rem' }} className="material-symbols-outlined">
				home
			</span>
			<h3 className="Welcome">Welcome to Instapost</h3>
			<p>When you follow people, you'll see the photos they post here.</p>
			<Link className="FollowPeople" to="/search">
				<Button className="FindPeople">Find People to Follow</Button>
			</Link>
		</div>
	);
};

export default NoFollowers;
