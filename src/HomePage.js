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
					<PostCard post={post} />
				)})}
				</div>
				<div class="col-3">
					<SuggestionsBox />
					<div class="footer">
						<a class="footer-section" href="https://github.com/pasha-log">
							About
						</a>
						<a class="footer-section" href="">
							Help
						</a>
						<a class="footer-section" href="https://github.com/pasha-log/capstone2-backend">
							API
						</a>
						<a class="footer-section" href="">
							Jobs
						</a>
						<a class="footer-section" href="">
							Privacy
						</a>
						<a class="footer-section" href="">
							Terms
						</a>
						<a class="footer-section" href="">
							Locations
						</a>
						<br />
						<a class="footer-section" href="">
							Top Accounts
						</a>
						<a class="footer-section" href="">
							Hashtag
						</a>
						<a class="footer-section" href="">
							Language
						</a>
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
