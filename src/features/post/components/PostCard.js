import '../assets/PostCard.css'
import { useEffect, useState } from 'react';
import InstapostApi from '../../../Api';
import Comment from '../../comment/components/Comment';
import CommentForm from '../../comment/components/CommentForm';
import { Link } from 'react-router-dom';
import PostHeart from './PostHeart';
import PostComment from './PostComment';
import PostSave from './PostSave';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import timeSincePosted from '../../../utils/timeSincePosted';
import { Button } from 'reactstrap';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const PostCard = ({ post }) => {
    const [ postComments, setPostComments ] = useState();
    const [ newComment, setNewComment ] = useState(0);
	const { newLike } = useContext(CurrentUserContext);
	const [ toggleComments, setToggleComments ] = useState(false);
	const totalAmountOfComments = postComments?.length + postComments?.reduce((accumulator, currentValue) => accumulator + currentValue?.children?.length, 0)

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
											loading='lazy'
										/>
								</div>
							</Link>
						</div>
					</div>
					<h3>
						<span>{post?.username}</span>
					</h3>
					<div className='DateDiv'>
						<FiberManualRecordIcon style={{fontSize: ".7rem", color: "rgb(88, 88, 88)"}} />
						<span className="Date">
							{dt}
						</span>
					</div>
				</div>
				<span style={{fontSize: "3rem"}} className="material-symbols-outlined PostSettings">more_horiz</span>
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
				{!toggleComments && postComments?.length > 0 && <Button className="ShowCommentsToggle" onClick={() => setToggleComments(true)}>{totalAmountOfComments > 1 ? `Show all ${totalAmountOfComments} comments` : "Show 1 comment"}</Button>}
                {!postComments ? null : toggleComments && postComments?.map((comment) => (<Comment postId={post?.postId} focus={handleCommentButtonClick} comment={comment} key={comment.commentId} />))}
				{toggleComments && postComments?.length > 0 && <Button className="ShowCommentsToggle" onClick={() => setToggleComments(false)}>Hide comments</Button>}
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
