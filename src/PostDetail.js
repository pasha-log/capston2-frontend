import { useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import './HomePage.css';

const PostDetail = () => {
	const { state } = useLocation();

	return (
		<div className="Col-9">
			<PostCard post={state} />
		</div>
	);
};

export default PostDetail;
