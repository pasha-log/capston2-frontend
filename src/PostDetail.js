import { useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import './assets/HomePage.css';

const PostDetail = () => {
	const { state } = useLocation();

	return (
		<div className="Col-9">
			<div className="PostDetail">
				<PostCard post={state} key={state.postId} />
			</div>
		</div>
	);
};

export default PostDetail;
