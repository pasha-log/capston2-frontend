import InstapostApi from "./Api"
import { useEffect, useState } from "react";
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './assets/Comment.css';
import { Link } from "react-router-dom";
import CommentHeart from "./CommentHeart";
import CommentReply from "./CommentReply";
import timeSincePosted from "./utils/timeSincePosted";

const Comment = ({ comment, focus, postId, date }) => {
    const [ user, setUser ] = useState(null);
    const { currentUser, setInnerCommentHTML, setNewReply, newReply } = useContext(CurrentUserContext);

    useEffect(
		() => {
            const getUserInfo = async (username) => {
                const user = await InstapostApi.getUser(username);
                setUser(user);
            }
            (comment?.username === currentUser?.username) ? setUser(null) : getUserInfo(comment?.username);
    }, []);

    const handleCommentReplyClick = (event) => {
        setInnerCommentHTML({username: `@${comment?.username}`, postId: postId, parentId: event.target.id})
        focus();
        setNewReply(newReply + 1);
    }

    return (
        <div>
            <div className="PostCommentItem">
                <div className="PostCommentRow FlexRow">
                    <div className="CommentLeftBody">
                        <Link to={user ? `/${user?.username}` : `/${currentUser?.username}`}>
                            <div>
                                <img className="CommentProfilePhoto" src={user ? user?.profileImageURL : currentUser?.profileImageURL} alt="" />
                            </div>
                        </Link>

                        <span className="CommentUsername"><p><strong className="UsernameInComment">{comment?.username}</strong>{comment?.message}</p></span>
                    </div>
                    <div className="CommentHeart">
                        <CommentHeart 
                            key={comment?.commentId ? comment?.commentId : comment?.comment_id} 
                            id={comment?.commentId ? comment?.commentId : comment?.comment_id} 
                            likeType={'comment'} 
                            />
                    </div>
                </div>
                <div className="PostCommentActions FlexRow">
                    <span className="CommentAction">{date ? date : timeSincePosted(comment?.createdAt)}</span>
                    <span>{comment?.numLikes === "1" ? '1 Like' : `${comment?.numLikes} Likes`}</span>
                    <span className="CommentAction" onClick={handleCommentReplyClick} id={comment?.commentId || comment?.comment_id} style={{cursor: "pointer"}}>Reply</span>
                </div>
            </div>
            <div className="PostCommentReplies">
                {comment?.children?.length === 0 ? null : comment?.children?.map((comment) => (<CommentReply postId={postId} focus={focus} comment={comment} key={comment.comment_id} />))}
            </div>
        </div>
    )
}

export default Comment;