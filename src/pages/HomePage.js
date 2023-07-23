import '../assets/HomePage.css';
import { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import InstapostApi from '../Api';
import PostCard from '../features/post/components/PostCard';
import { useEffect, useState } from 'react';
import SuggestionsBox from '../layouts/SuggestionsBox.js';
import Footer from '../layouts/Footer';
import NoFollowers from '../layouts/NoFollowers';

const HomePage = () => {
	const { newFollow, storedValue, newLike, nprogress, setInnerCommentHTML } = useContext(CurrentUserContext);
	const [ followingPosts, setFollowingPosts ] = useState();
	setInnerCommentHTML();
	useEffect(
		() => {
			const getFollowingPosts = async (username) => {
				nprogress.start()
				let response = await InstapostApi.getFollowingPosts(username);
				setFollowingPosts(response);
				nprogress.done()
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
						{/* <div className='NoFollowerMessage'>No followers with posts yet</div> */}
						<NoFollowers />
					</div> : 
						followingPosts?.map((post) => {return (
						<PostCard post={post} key={post.postId} />
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
