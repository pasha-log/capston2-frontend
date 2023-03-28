import { useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import './HomePage.css';

const PostDetail = () => {
	const { state } = useLocation();

	return (
		<div className="Col-9">
			<div className="PostDetail">
				<PostCard post={state} />
			</div>
		</div>
	);
};

export default PostDetail;
