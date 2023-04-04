import './static/HomePage.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import InstapostApi from './Api';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import SuggestionsBox from './SuggestionsBox.js';
import Footer from './Footer';

function useForceUpdate() {
	let [ newCommentReply, setNewCommentReply ] = useState(true);
	return () => setNewCommentReply(!newCommentReply);
}

const HomePage = () => {
	const forceUpdate = useForceUpdate();
	const { newFollow, storedValue, newLike } = useContext(CurrentUserContext);
	const [ followingPosts, setFollowingPosts ] = useState();
	useEffect(
		() => {
			const getFollowingPosts = async (username) => {
				let response = await InstapostApi.getFollowingPosts(username);
				setFollowingPosts(response);
			};

			getFollowingPosts(storedValue?.username);
		},
		[ newFollow, newLike ]
	);

	return (
		<main>
			<div className="container">
				<div className="Col-9">
					{followingPosts?.length === 0 ? 
					<div className='NoFollowerCard'>
						<div className='NoFollowerMessage'>No followers with posts yet</div>
					</div> : 
						followingPosts?.map((post) => {return (
						<PostCard forceUpdate={forceUpdate} post={post} key={post.postId} />
					)})
					}
				</div>
				<div className="col-3">
					<SuggestionsBox />
					<Footer />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
