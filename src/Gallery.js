import './Profile.css';
import { Link } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

const Gallery = ({ userBeingViewed }) => {
	return (
		<div className="gallery">
			{userBeingViewed?.posts?.slice(0).reverse().map((post) => {
				return (
					<Link
						to={`/posts/${post.postId}`}
						key={post.postId}
						state={{
							imageURL: post.postURL,
							caption: post.caption,
							username: userBeingViewed?.username,
							profileImageURL: userBeingViewed?.profileImageURL,
							postId: post.postId,
							createdAt: post.createdAt,
							numLikes: post.numLikes
						}}
					>
						<div className="gallery-item" tabIndex="0">
							<img className="gallery-image" src={post.postURL} alt={post.id} />
							<div className="gallery-item-info">
								<ul>
									<li className="gallery-item-likes" key={`${post.postId}-gallery-item-likes`}>
										<Favorite style={{ color: 'white', fontSize: '2rem' }} />
										{post.numLikes}
									</li>
									<li className="gallery-item-comments" key={`${post.postId}-gallery-item-comments`}>
										<ModeCommentIcon style={{ color: 'white', fontSize: '2rem' }} />
										{post.numComments}
									</li>
								</ul>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Gallery;
