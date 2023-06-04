import './assets/PostCard.css'
import { useEffect, useState } from 'react';
import InstapostApi from './Api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import PostHeart from './PostHeart';
import PostComment from './PostComment';
import PostSave from './PostSave';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import timeSincePosted from './utils/timeSincePosted';

const PostCard = ({ post }) => {
    const [ postComments, setPostComments ] = useState();
    const [ newComment, setNewComment ] = useState(0);
	const { newLike } = useContext(CurrentUserContext);

	const handleCommentButtonClick = () => {
		let i = document.getElementById(post?.postId)
	  	i.focus();
	};


    useEffect(
		() => {
			const getPostComments = async (id) => {
				let response = await InstapostApi.getPostComments(id);
				setPostComments(response);
			};

			getPostComments(post?.postId);
		},
		[ newComment, post?.postId, newLike ]
	);
	
	var dt = timeSincePosted(post?.createdAt);
		
    return (
		<div className="PostDetailCard">
			<div className="PostDetailTop">
				<div className="PostUserDetails">
					<div className="ProfilePicture">
						<div className="PostDetailImage">
							<Link to={`/${post?.username}`} >
								<div className="PostDetailProfileImage">
										<img
											src={post?.profileImageURL}
											alt=""
										/>
								</div>
							</Link>
						</div>
					</div>
					<h3>
						<span>{post?.username}</span>
					</h3>
				</div>
				<div>
					<span className="Date">
						{dt}
					</span>
				</div>
			</div>
			<div className="ImageBox">
				<img
					src={post?.postURL || post?.imageURL}
					alt={post?.postId}
					className="cover"
				/>
			</div>
			<div className="Bottom">
				<div className="ActionButtons">
					<div className="Left">
						<span className="Heart">
							<span>
								<PostHeart id={post?.postId} likeType={'post'} />
							</span>
						</span>
						<span onClick={handleCommentButtonClick}>
							<PostComment />
						</span>
					</div>
					<div className="Right">
						<PostSave />
					</div>
				</div>
				<div className='PostDetails'>
					<div>
						<p className="Likes">{ post?.numLikes === "1" ? 'Liked by 1 other' : `Liked by ${post?.numLikes} others`}</p>
					</div>
					<div>
						<p className="Caption">
							<b className='CaptionUsername'>{post?.username}</b>
							{post?.caption}
						</p>
					</div>
				</div>
                {!postComments ? null : postComments?.map((comment) => (<Comment postId={post?.postId} focus={handleCommentButtonClick} comment={comment} key={comment.commentId} />))}
				<div className="AddComments">
					<div className="Reaction">
						<h3>
							<i className="far fa-smile" />
						</h3>
					</div>
                    <CommentForm postId={post?.postId} newComment={newComment} setNewComment={setNewComment} />
				</div>
			</div>
		</div> 
	)
}

export default PostCard;
