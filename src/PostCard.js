import './HomePage.css';
import { useEffect, useState } from 'react';
import InstapostApi from './Api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import PostHeart from './PostHeart';
import PostComment from './PostComment';
import PostSave from './PostSave';

const PostCard = ({ post }) => {

    const [postComments, setPostComments] = useState();
    const [newComment, setNewComment] = useState(0);

    useEffect(
		() => {
			const getPostComments = async (id) => {
				let response = await InstapostApi.getPostComments(id);
				setPostComments(response);
                console.log(response)
                console.log(postComments)
			};

			getPostComments(post?.postId);
		},
		[ newComment, post?.postId ]
	);

    return (
		<div className="card">
			<div className="HomePageTop">
				<div className="userDetails">
					<div className="profilepic">
						<Link to={`/${post?.username}`}>
							<div className="profile_img">
								<div className="image">
										<img
											src={post?.profileImageURL}
											alt=""
										/>
								</div>
							</div>
						</Link>
					</div>
					<h3>
						<span>{post?.username}</span>
					</h3>
				</div>
				<div>
					<span className="dot">
						<i className="fas fa-ellipsis-h" />
					</span>
				</div>
			</div>
			<div className="imgBx">
				<img
					src={post?.postURL}
					alt={post?.postId}
					className="cover"
				/>
			</div>
			<div className="bottom">
				<div className="actionBtns">
					<div className="left">
						<span className="heart">
							<span>
								<PostHeart />
							</span>
						</span>
						<PostComment />
					</div>
					<div className="right">
						<PostSave />
					</div>
				</div>
                <div>
					<p className="likes">Liked by 203 others</p>
                </div>
                <div>
					<p className="message">
						<b>{post?.username}</b>
                        {post?.caption}
					</p>
                </div>
                {!postComments ? null : postComments?.map((comment) => (<Comment comment={comment} />))}
				<div className="addComments">
					<div className="reaction">
						<h3>
							<i className="far fa-smile" />
						</h3>
					</div>
                    <CommentForm postId={post.postId} newComment={newComment} setNewComment={setNewComment} />
				</div>
			</div>
		</div>
    )
}

export default PostCard;
