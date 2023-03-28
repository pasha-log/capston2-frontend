import './HomePage.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import InstapostApi from './Api';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import SuggestionsBox from './SuggestionsBox.js';

const HomePage = () => {
	const { currentUser } = useContext(CurrentUserContext);
	const [ followingPosts, setFollowingPosts ] = useState();
	useEffect(
		() => {
			const getFollowingPosts = async (username) => {
				let response = await InstapostApi.getFollowingPosts(username);
				setFollowingPosts(response);
	            console.log(response)
			};

			getFollowingPosts(currentUser?.username);
		},
		[ ]
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
					<div class="footer">
						<a class="footer-section" href="https://github.com/pasha-log">
							About
						</a>
						<small class="footer-section" href="">
							Help
						</small>
						<a class="footer-section" href="https://github.com/pasha-log/capstone2-backend">
							API
						</a>
						<small class="footer-section" href="">
							Jobs
						</small>
						<small class="footer-section" href="">
							Privacy
						</small>
						<small class="footer-section" href="">
							Terms
						</small>
						<small class="footer-section" href="">
							Locations
						</small>
						<br />
						<small class="footer-section" href="">
							Top Accounts
						</small>
						<small class="footer-section" href="">
							Hashtag
						</small>
						<small class="footer-section" href="">
							Language
						</small>
						<br />
						<br />
						<span class="footer-section">© 2023 INSTAPOST FROM PASHA LOGUINOV</span>
					</div>
				</div>
			</div>
		</main>
	);
};

export default HomePage;
