import './HomePage.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import InstapostApi from './Api';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import SuggestionsBox from './SuggestionsBox.js';
import Footer from './Footer';

const HomePage = () => {
	const { currentUser, newFollow } = useContext(CurrentUserContext);
	const [ followingPosts, setFollowingPosts ] = useState();
	useEffect(
		() => {
			const getFollowingPosts = async (username) => {
				let response = await InstapostApi.getFollowingPosts(username);
				setFollowingPosts(response);
			};

			getFollowingPosts(currentUser?.username);
		},
		[ newFollow ]
	);

	return (
		<main>
			<div class="container">
				<div class="Col-9">
					{followingPosts?.map((post) => {return (
						<PostCard post={post} key={post.postId} />
					)})}
				</div>
				<div class="col-3">
					<SuggestionsBox />
					<Footer />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
