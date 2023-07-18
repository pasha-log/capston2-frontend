import { useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import '../../../assets/HomePage.css';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';

const PostDetail = () => {
	const { nprogress } = useContext(CurrentUserContext);
	const { state } = useLocation();

	nprogress.done();

	return (
		<div className="Col-9">
			<div className="PostDetail">
				<PostCard post={state} key={state.postId} />
			</div>
		</div>
	);
};

export default PostDetail;
